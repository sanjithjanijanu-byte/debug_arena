import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import { env } from '../config/env';
import { compareOutputs } from '../utils/outputComparator';
import { Language, Verdict } from '@prisma/client';

export interface ExecutionTestCase {
  id?: string;
  stdin: string;
  expectedStdout: string;
  weight?: number;
  isHidden?: boolean;
}

export interface TestCaseExecutionResult {
  testCaseId?: string;
  stdin: string;
  expectedStdout: string;
  actualStdout: string;
  isMatch: boolean;
  verdict: Verdict;
  execTimeMs: number;
  memoryKb?: number;
  stderr?: string;
  compileError?: string;
  isHidden?: boolean;
  weight?: number;
}

export interface BatchExecutionResponse {
  allPassed: boolean;
  testsPassed: number;
  testsTotal: number;
  results: TestCaseExecutionResult[];
  compileError?: string;
}

// Judge0 Language ID Mapping
const JUDGE0_LANGUAGE_IDS: Record<Language, number> = {
  CPP: 54,     // C++ (GCC 9.2.0 or higher)
  JAVA: 62,    // Java (OpenJDK 13.0.1 or higher)
  PYTHON: 71,  // Python (3.8.1 or higher)
};

/**
 * Executes source code against test cases.
 * Tries Judge0 CE first. If unavailable, falls back to local sandboxed runner.
 */
export async function executeCodeAgainstTestCases(
  code: string,
  language: Language,
  testCases: ExecutionTestCase[],
  timeLimitMs = 5000,
  memoryLimitMb = 256
): Promise<BatchExecutionResponse> {
  try {
    // Attempt Judge0 execution
    return await executeViaJudge0(code, language, testCases, timeLimitMs, memoryLimitMb);
  } catch (err: any) {
    // Fallback to local sandbox runner if Judge0 is unreachable
    console.warn(`[ExecutionService] Judge0 unavailable (${err.message}). Using local execution engine.`);
    return await executeViaLocalSandbox(code, language, testCases, timeLimitMs);
  }
}

/**
 * Judge0 Submission Implementation
 */
async function executeViaJudge0(
  code: string,
  language: Language,
  testCases: ExecutionTestCase[],
  timeLimitMs: number,
  memoryLimitMb: number
): Promise<BatchExecutionResponse> {
  const languageId = JUDGE0_LANGUAGE_IDS[language];
  const judge0Url = env.JUDGE0_API_URL;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (env.JUDGE0_AUTHN_TOKEN) {
    headers['X-Auth-Token'] = env.JUDGE0_AUTHN_TOKEN;
  }

  // Submit batch
  const submissions = testCases.map((tc) => ({
    source_code: Buffer.from(code).toString('base64'),
    language_id: languageId,
    stdin: Buffer.from(tc.stdin || '').toString('base64'),
    expected_output: Buffer.from(tc.expectedStdout || '').toString('base64'),
    cpu_time_limit: Math.max(1, Math.ceil(timeLimitMs / 1000)),
    memory_limit: memoryLimitMb * 1024,
  }));

  const postRes = await axios.post(
    `${judge0Url}/submissions/batch?base64_encoded=true`,
    { submissions },
    { headers, timeout: 5000 }
  );

  const tokens = postRes.data.map((item: any) => item.token);
  const tokenString = tokens.join(',');

  // Poll for results (max 10 attempts)
  let attempts = 0;
  let finished = false;
  let batchData: any[] = [];

  while (attempts < 10 && !finished) {
    await new Promise((r) => setTimeout(r, 1000));
    const getRes = await axios.get(
      `${judge0Url}/submissions/batch?tokens=${tokenString}&base64_encoded=true&fields=token,status,stdout,stderr,compile_output,time,memory`,
      { headers, timeout: 5000 }
    );

    batchData = getRes.data.submissions || [];
    const inProgress = batchData.some(
      (s: any) => s.status?.id === 1 || s.status?.id === 2 // In Queue or Processing
    );

    if (!inProgress) {
      finished = true;
    }
    attempts++;
  }

  const results: TestCaseExecutionResult[] = [];
  let passedCount = 0;
  let overallCompileError: string | undefined;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const sub = batchData[i] || {};

    const stdout = sub.stdout ? Buffer.from(sub.stdout, 'base64').toString('utf8') : '';
    const stderr = sub.stderr ? Buffer.from(sub.stderr, 'base64').toString('utf8') : '';
    const compileOutput = sub.compile_output
      ? Buffer.from(sub.compile_output, 'base64').toString('utf8')
      : '';

    if (compileOutput) {
      overallCompileError = compileOutput;
    }

    const comp = compareOutputs(stdout, tc.expectedStdout);
    let verdict: Verdict = Verdict.WRONG_ANSWER;

    if (sub.status?.id === 3 && comp.isMatch) {
      verdict = Verdict.ACCEPTED;
      passedCount++;
    } else if (sub.status?.id === 4 || !comp.isMatch) {
      verdict = Verdict.WRONG_ANSWER;
    } else if (sub.status?.id === 5) {
      verdict = Verdict.TIME_LIMIT_EXCEEDED;
    } else if (sub.status?.id === 6) {
      verdict = Verdict.COMPILATION_ERROR;
    } else if (sub.status?.id >= 7 && sub.status?.id <= 12) {
      verdict = Verdict.RUNTIME_ERROR;
    }

    results.push({
      testCaseId: tc.id,
      stdin: tc.stdin,
      expectedStdout: tc.expectedStdout,
      actualStdout: stdout,
      isMatch: comp.isMatch,
      verdict,
      execTimeMs: Math.round((parseFloat(sub.time) || 0) * 1000),
      memoryKb: sub.memory || undefined,
      stderr: stderr || undefined,
      compileError: compileOutput || undefined,
      isHidden: tc.isHidden,
      weight: tc.weight,
    });
  }

  return {
    allPassed: passedCount === testCases.length,
    testsPassed: passedCount,
    testsTotal: testCases.length,
    results,
    compileError: overallCompileError,
  };
}

function findGppExecutable(): string {
  const candidates = [
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft/WinGet/Packages/BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe/mingw64/bin/g++.exe'),
    'C:\\msys64\\mingw64\\bin\\g++.exe',
    'C:\\MinGW\\bin\\g++.exe',
    'g++',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return 'g++';
}

/**
 * Local Sandbox Fallback Runner
 */
async function executeViaLocalSandbox(
  code: string,
  language: Language,
  testCases: ExecutionTestCase[],
  timeLimitMs: number
): Promise<BatchExecutionResponse> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'debug_run_'));
  const results: TestCaseExecutionResult[] = [];
  let passedCount = 0;
  let overallCompileError: string | undefined;

  try {
    if (language === 'PYTHON') {
      const scriptPath = path.join(tmpDir, 'solution.py');
      fs.writeFileSync(scriptPath, code);

      for (const tc of testCases) {
        const res = await runProcess('python', [scriptPath], tc.stdin, timeLimitMs);
        const comp = compareOutputs(res.stdout, tc.expectedStdout);
        let verdict: Verdict = Verdict.WRONG_ANSWER;

        if (res.timedOut) {
          verdict = Verdict.TIME_LIMIT_EXCEEDED;
        } else if (res.code !== 0) {
          verdict = Verdict.RUNTIME_ERROR;
        } else if (comp.isMatch) {
          verdict = Verdict.ACCEPTED;
          passedCount++;
        }

        results.push({
          testCaseId: tc.id,
          stdin: tc.stdin,
          expectedStdout: tc.expectedStdout,
          actualStdout: res.stdout,
          isMatch: comp.isMatch,
          verdict,
          execTimeMs: res.execTimeMs,
          stderr: res.stderr || undefined,
          isHidden: tc.isHidden,
          weight: tc.weight,
        });
      }
    } else if (language === 'JAVA') {
      // Find class name or default to Main
      const classNameMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = classNameMatch ? classNameMatch[1] : 'Main';
      const javaFile = path.join(tmpDir, `${className}.java`);
      fs.writeFileSync(javaFile, code);

      // Compile Java
      const compileRes = await runProcess('javac', [javaFile], '', 10000);
      if (compileRes.code !== 0) {
        overallCompileError = compileRes.stderr || 'Java compilation failed';
        for (const tc of testCases) {
          results.push({
            testCaseId: tc.id,
            stdin: tc.stdin,
            expectedStdout: tc.expectedStdout,
            actualStdout: '',
            isMatch: false,
            verdict: Verdict.COMPILATION_ERROR,
            execTimeMs: 0,
            compileError: overallCompileError,
            isHidden: tc.isHidden,
            weight: tc.weight,
          });
        }
      } else {
        // Run compiled Java class
        for (const tc of testCases) {
          const runRes = await runProcess('java', ['-cp', tmpDir, className], tc.stdin, timeLimitMs);
          const comp = compareOutputs(runRes.stdout, tc.expectedStdout);
          let verdict: Verdict = Verdict.WRONG_ANSWER;

          if (runRes.timedOut) {
            verdict = Verdict.TIME_LIMIT_EXCEEDED;
          } else if (runRes.code !== 0) {
            verdict = Verdict.RUNTIME_ERROR;
          } else if (comp.isMatch) {
            verdict = Verdict.ACCEPTED;
            passedCount++;
          }

          results.push({
            testCaseId: tc.id,
            stdin: tc.stdin,
            expectedStdout: tc.expectedStdout,
            actualStdout: runRes.stdout,
            isMatch: comp.isMatch,
            verdict,
            execTimeMs: runRes.execTimeMs,
            stderr: runRes.stderr || undefined,
            isHidden: tc.isHidden,
            weight: tc.weight,
          });
        }
      }
    } else if (language === 'CPP') {
      const cppFile = path.join(tmpDir, 'solution.cpp');
      const exeFile = path.join(tmpDir, process.platform === 'win32' ? 'solution.exe' : 'solution');
      fs.writeFileSync(cppFile, code);

      const gppCmd = findGppExecutable();
      const compileRes = await runProcess(gppCmd, ['-std=c++17', '-static', cppFile, '-o', exeFile], '', 12000);
      if (compileRes.code !== 0) {
        // Fallback to Piston API for C++ if local g++ not found
        try {
          return await executeViaPiston(code, 'cpp', testCases, timeLimitMs);
        } catch {
          overallCompileError = compileRes.stderr || 'g++ compiler not found or compilation failed.';
          for (const tc of testCases) {
            results.push({
              testCaseId: tc.id,
              stdin: tc.stdin,
              expectedStdout: tc.expectedStdout,
              actualStdout: '',
              isMatch: false,
              verdict: Verdict.COMPILATION_ERROR,
              execTimeMs: 0,
              compileError: overallCompileError,
              isHidden: tc.isHidden,
              weight: tc.weight,
            });
          }
        }
      } else {
        for (const tc of testCases) {
          const runRes = await runProcess(exeFile, [], tc.stdin, timeLimitMs);
          const comp = compareOutputs(runRes.stdout, tc.expectedStdout);
          let verdict: Verdict = Verdict.WRONG_ANSWER;

          if (runRes.timedOut) {
            verdict = Verdict.TIME_LIMIT_EXCEEDED;
          } else if (runRes.code !== 0) {
            verdict = Verdict.RUNTIME_ERROR;
          } else if (comp.isMatch) {
            verdict = Verdict.ACCEPTED;
            passedCount++;
          }

          results.push({
            testCaseId: tc.id,
            stdin: tc.stdin,
            expectedStdout: tc.expectedStdout,
            actualStdout: runRes.stdout,
            isMatch: comp.isMatch,
            verdict,
            execTimeMs: runRes.execTimeMs,
            stderr: runRes.stderr || undefined,
            isHidden: tc.isHidden,
            weight: tc.weight,
          });
        }
      }
    }
  } finally {
    // Cleanup temporary files
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  return {
    allPassed: passedCount === testCases.length,
    testsPassed: passedCount,
    testsTotal: testCases.length,
    results,
    compileError: overallCompileError,
  };
}

/**
 * Piston execution helper for C++ online sandbox fallback
 */
async function executeViaPiston(
  code: string,
  language: string,
  testCases: ExecutionTestCase[],
  timeLimitMs: number
): Promise<BatchExecutionResponse> {
  const results: TestCaseExecutionResult[] = [];
  let passedCount = 0;
  let overallCompileError: string | undefined;

  for (const tc of testCases) {
    const startTime = Date.now();
    const res = await axios.post(
      'https://emkc.org/api/v2/piston/execute',
      {
        language: 'c++',
        version: '10.2.0',
        files: [{ content: code }],
        stdin: tc.stdin || '',
        run_timeout: timeLimitMs,
      },
      { timeout: 10000 }
    );

    const execTimeMs = Date.now() - startTime;
    const run = res.data.run || {};
    const compile = res.data.compile || {};

    if (compile.output && compile.code !== 0) {
      overallCompileError = compile.output;
      results.push({
        testCaseId: tc.id,
        stdin: tc.stdin,
        expectedStdout: tc.expectedStdout,
        actualStdout: '',
        isMatch: false,
        verdict: Verdict.COMPILATION_ERROR,
        execTimeMs,
        compileError: compile.output,
        isHidden: tc.isHidden,
        weight: tc.weight,
      });
      continue;
    }

    const stdout = run.stdout || '';
    const stderr = run.stderr || '';
    const comp = compareOutputs(stdout, tc.expectedStdout);
    let verdict: Verdict = Verdict.WRONG_ANSWER;

    if (run.signal === 'SIGKILL' || run.code === 137) {
      verdict = Verdict.TIME_LIMIT_EXCEEDED;
    } else if (run.code !== 0) {
      verdict = Verdict.RUNTIME_ERROR;
    } else if (comp.isMatch) {
      verdict = Verdict.ACCEPTED;
      passedCount++;
    }

    results.push({
      testCaseId: tc.id,
      stdin: tc.stdin,
      expectedStdout: tc.expectedStdout,
      actualStdout: stdout,
      isMatch: comp.isMatch,
      verdict,
      execTimeMs,
      stderr: stderr || undefined,
      isHidden: tc.isHidden,
      weight: tc.weight,
    });
  }

  return {
    allPassed: passedCount === testCases.length,
    testsPassed: passedCount,
    testsTotal: testCases.length,
    results,
    compileError: overallCompileError,
  };
}

/**
 * Process runner with hard timeout and stdin piping
 */
function runProcess(
  cmd: string,
  args: string[],
  stdin: string,
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; code: number | null; timedOut: boolean; execTimeMs: number }> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const mingwDir = path.join(process.env.LOCALAPPDATA || '', 'Microsoft/WinGet/Packages/BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe/mingw64/bin');
    const child = spawn(cmd, args, {
      shell: true,
      env: {
        ...process.env,
        PATH: `${mingwDir};${process.env.PATH || ''}`,
      },
    });

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        child.kill('SIGKILL');
      } catch {
        // ignore
      }
    }, timeoutMs);

    if (stdin) {
      try {
        child.stdin.write(stdin);
        child.stdin.end();
      } catch {
        // ignore
      }
    } else {
      child.stdin.end();
    }

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr: stderr || err.message,
        code: 1,
        timedOut: false,
        execTimeMs: Date.now() - startTime,
      });
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr,
        code,
        timedOut,
        execTimeMs: Date.now() - startTime,
      });
    });
  });
}
