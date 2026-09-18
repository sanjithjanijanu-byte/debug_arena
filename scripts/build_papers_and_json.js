const fs = require('fs');
const path = require('path');

// 1. Load data
const existing60 = JSON.parse(fs.readFileSync(path.join(__dirname, '../round1_mcqs_60.json'), 'utf8'));
const cppSets2to5 = require('./mcqs_cpp_sets2_to_5');
const javaSets2to5 = require('./mcqs_java_sets2_to_5');
const pythonSets2to5 = require('./mcqs_python_sets2_to_5');
// The Hard problems from former Round 3 now become Round 2 (5 Sets)
const hardProblems = require('./round3_hard').slice(0, 5); // 5 distinct Hard problem sets

// 2. Prepare Round 1 MCQs (5 sets x 20 questions x 3 languages = 300 MCQs)
const round1All = [];

// Partition existing 60 by language to form Set 1
const set1ByLang = { CPP: [], JAVA: [], PYTHON: [] };
for (const q of existing60) {
  set1ByLang[q.language].push(q);
}

for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
  const set1Questions = set1ByLang[lang];
  set1Questions.forEach((q, idx) => {
    round1All.push({
      roundNumber: 1,
      setNumber: 1,
      questionNumber: idx + 1,
      language: lang,
      title: `Set 1 - Q${idx + 1}: ${q.title.replace(/^Set 1 - Q\d+: |^Q\d+\.\s*/, '')}`,
      statement: q.statement,
      buggyCode: q.buggyCode,
      referenceSolution: q.referenceSolution,
      points: q.points || 10,
      timeLimitMs: q.timeLimitMs || 1000,
      memoryLimitMb: q.memoryLimitMb || 128,
      isTiebreaker: false,
      testCases: q.testCases || [{ stdin: q.referenceSolution, expectedStdout: q.referenceSolution, isHidden: false, weight: 1 }]
    });
  });
}

// Add Sets 2-5 (80 each per language)
round1All.push(...cppSets2to5);
round1All.push(...javaSets2to5);
round1All.push(...pythonSets2to5);

console.log(`Round 1 Total MCQs: ${round1All.length}`);

// 3. Prepare Round 2 Hard Debugging Questions (5 sets x 3 languages = 15 items)
// Replaced former Round 2 with former Round 3 Hard problems, keeping difficulty as Hard (30 pts)
const round2All = [];
for (const prob of hardProblems) {
  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    round2All.push({
      roundNumber: 2,
      setNumber: prob.setNumber,
      questionNumber: 1,
      language: lang,
      title: `Set ${prob.setNumber}: ${prob.title}`,
      statement: prob.statement,
      buggyCode: prob.implementations[lang].buggyCode,
      referenceSolution: prob.implementations[lang].referenceSolution,
      rootCause: prob.rootCause,
      fixDescription: prob.fixDescription,
      points: prob.points || 30,
      timeLimitMs: prob.timeLimitMs || 3000,
      memoryLimitMb: prob.memoryLimitMb || 256,
      isTiebreaker: false,
      testCases: prob.testCases
    });
  }
}
console.log(`Round 2 Total Implementations (Hard Debugging): ${round2All.length}`);

// 4. Generate complete import JSON (Rounds 1 and 2 only)
const completeImport = [...round1All, ...round2All];
fs.writeFileSync(
  path.join(__dirname, '../complete_event_sets_import.json'),
  JSON.stringify(completeImport, null, 2),
  'utf8'
);
console.log(`Wrote complete_event_sets_import.json (${completeImport.length} questions)`);

// 5. Generate Question Papers Folder
const qpDir = path.join(__dirname, '../question_papers');
if (!fs.existsSync(qpDir)) {
  fs.mkdirSync(qpDir, { recursive: true });
}

// Helpers for markdown formatting
function parseStmt(stmtStr) {
  try {
    return JSON.parse(stmtStr);
  } catch (e) {
    return { prompt: stmtStr, options: {}, explanation: '' };
  }
}

// Clean old files in question_papers
const existingFiles = fs.readdirSync(qpDir);
for (const f of existingFiles) {
  if (f.startsWith('Round2_Set6') || f.startsWith('Round2_Set7') || f.startsWith('Round3_') || f.startsWith('Round2_Medium')) {
    try { fs.unlinkSync(path.join(qpDir, f)); } catch (e) {}
  }
}

// Generate Round 1 Set Papers (Round1_Set1.md to Round1_Set5.md)
for (let setNum = 1; setNum <= 5; setNum++) {
  let md = `# Round 1 — MCQ Qualification Round (Set ${setNum})\n\n`;
  md += `**Instructions:**\n`;
  md += `- Time: 30 Minutes\n`;
  md += `- Total Questions: 20 Questions\n`;
  md += `- Marking: +10 Points for each correct answer. No negative marking.\n`;
  md += `- Answer all questions for your chosen programming language.\n\n`;
  md += `---\n\n`;

  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    const langLabel = lang === 'CPP' ? 'C++' : lang === 'JAVA' ? 'Java' : 'Python';
    md += `## Section: ${langLabel}\n\n`;

    const questions = round1All.filter(q => q.setNumber === setNum && q.language === lang);
    questions.forEach((q, idx) => {
      const parsed = parseStmt(q.statement);
      md += `### Q${idx + 1}. ${q.title.replace(/^Set \d+ - Q\d+: /, '')}\n\n`;
      md += `${parsed.prompt}\n\n`;

      if (q.buggyCode && q.buggyCode.trim().length > 0) {
        const langTag = lang === 'CPP' ? 'cpp' : lang === 'JAVA' ? 'java' : 'python';
        md += `\`\`\`${langTag}\n${q.buggyCode}\n\`\`\`\n\n`;
      }

      md += `**Options:**\n`;
      for (const optKey of ['A', 'B', 'C', 'D']) {
        if (parsed.options && parsed.options[optKey]) {
          md += `- **(${optKey})** ${parsed.options[optKey]}\n`;
        }
      }
      md += `\n---\n\n`;
    });
  }

  fs.writeFileSync(path.join(qpDir, `Round1_Set${setNum}.md`), md, 'utf8');
}
console.log('Wrote Round 1 Set Papers (Sets 1-5)');

// Generate Round 2 Set Papers (Round2_Set1.md to Round2_Set5.md - Hard Debugging)
for (let setNum = 1; setNum <= 5; setNum++) {
  const prob = hardProblems.find(p => p.setNumber === setNum);
  let md = `# Round 2 — Hard Debugging (Set ${setNum})\n\n`;
  md += `## Problem: ${prob.title}\n\n`;
  md += `**Points:** 30 Points | **Difficulty:** Hard | **Time Limit:** 3.0s | **Memory Limit:** 256MB\n\n`;
  md += `### Problem Statement\n\n${prob.statement}\n\n`;
  md += `---\n\n`;
  md += `### Buggy Code Templates\n\n`;

  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    const langLabel = lang === 'CPP' ? 'C++' : lang === 'JAVA' ? 'Java' : 'Python';
    const langTag = lang === 'CPP' ? 'cpp' : lang === 'JAVA' ? 'java' : 'python';
    md += `#### ${langLabel} Implementation\n\n`;
    md += `\`\`\`${langTag}\n${prob.implementations[lang].buggyCode}\n\`\`\`\n\n`;
  }

  fs.writeFileSync(path.join(qpDir, `Round2_Set${setNum}.md`), md, 'utf8');
}
console.log('Wrote Round 2 Set Papers (Sets 1-5, Hard Debugging)');

// 6. Generate Master Judge Sheet: questions_with_answers_and_solutions.md
let solMd = `# DEBUG ARENA — Official Judge & Solutions Manual\n\n`;
solMd += `> **CONFIDENTIAL**: For Judges, Faculty, and Event Coordinators Only.\n`;
solMd += `> Contains complete answer keys, root cause diagnostics, and reference solutions for all competition rounds and sets.\n\n`;
solMd += `---\n\n`;

solMd += `## Table of Contents\n`;
solMd += `1. [Round 1: MCQ Answer Keys & Explanations (Sets 1 - 5)](#round-1-mcq-solutions)\n`;
solMd += `2. [Round 2: Hard Debugging Solutions (Sets 1 - 5)](#round-2-hard-solutions)\n\n`;
solMd += `---\n\n`;

// Round 1 Solutions
solMd += `<a name="round-1-mcq-solutions"></a>\n# Round 1: MCQ Solutions (Sets 1 - 5)\n\n`;

for (let setNum = 1; setNum <= 5; setNum++) {
  solMd += `## Round 1 — Set ${setNum}\n\n`;

  solMd += `### Quick Answer Key (Set ${setNum})\n\n`;
  solMd += `| Q# | C++ Key | Java Key | Python Key |\n`;
  solMd += `|:---:|:---:|:---:|:---:||\n`;

  const cppQ = round1All.filter(q => q.setNumber === setNum && q.language === 'CPP');
  const javaQ = round1All.filter(q => q.setNumber === setNum && q.language === 'JAVA');
  const pyQ = round1All.filter(q => q.setNumber === setNum && q.language === 'PYTHON');

  for (let i = 0; i < 20; i++) {
    solMd += `| Q${i+1} | **${cppQ[i]?.referenceSolution || '-'}** | **${javaQ[i]?.referenceSolution || '-'}** | **${pyQ[i]?.referenceSolution || '-'}** |\n`;
  }
  solMd += `\n`;

  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    const langLabel = lang === 'CPP' ? 'C++' : lang === 'JAVA' ? 'Java' : 'Python';
    solMd += `### Set ${setNum} — ${langLabel} Explanations\n\n`;

    const questions = round1All.filter(q => q.setNumber === setNum && q.language === lang);
    questions.forEach((q, idx) => {
      const parsed = parseStmt(q.statement);
      solMd += `#### Q${idx + 1}. ${q.title.replace(/^Set \d+ - Q\d+: /, '')}\n`;
      solMd += `- **Correct Answer:** **(${q.referenceSolution})** ${parsed.options?.[q.referenceSolution] || ''}\n`;
      solMd += `- **Explanation:** ${parsed.explanation}\n\n`;
    });
  }
  solMd += `---\n\n`;
}

// Round 2 Solutions (Hard Debugging)
solMd += `<a name="round-2-hard-solutions"></a>\n# Round 2: Hard Debugging Solutions (Sets 1 - 5)\n\n`;
for (const prob of hardProblems) {
  solMd += `## Set ${prob.setNumber}: ${prob.title}\n\n`;
  solMd += `**Points:** 30 | **Category:** Hard Debugging\n\n`;
  solMd += `### Problem Statement Summary\n${prob.statement.split('Input Format:')[0].trim()}\n\n`;
  solMd += `### Root Cause Analysis (Bug Diagnostic)\n${prob.rootCause}\n\n`;
  solMd += `### Fix Description\n${prob.fixDescription}\n\n`;

  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    const langLabel = lang === 'CPP' ? 'C++' : lang === 'JAVA' ? 'Java' : 'Python';
    const langTag = lang === 'CPP' ? 'cpp' : lang === 'JAVA' ? 'java' : 'python';
    solMd += `#### ${langLabel} Reference Solution\n\n`;
    solMd += `\`\`\`${langTag}\n${prob.implementations[lang].referenceSolution}\n\`\`\`\n\n`;
  }
  solMd += `---\n\n`;
}

fs.writeFileSync(path.join(__dirname, '../questions_with_answers_and_solutions.md'), solMd, 'utf8');
console.log('Wrote questions_with_answers_and_solutions.md');

// 7. Update master question_paper.md (Clean student paper for 2 rounds)
let paperMd = `# DEBUG ARENA — Official Student Question Paper\n\n`;
paperMd += `Welcome to **Debug Arena**. This paper contains all competition problem sets across **2 rounds**:\n`;
paperMd += `- **Round 1 (MCQ Qualification):** 5 Sets (20 Questions each for C++, Java, Python)\n`;
paperMd += `- **Round 2 (Hard Debugging):** 5 Sets (1 Problem each with C++, Java, Python templates)\n\n`;
paperMd += `> *Refer to your assigned Set Number given by the coordinator or system (Set 1 to Set 5).*\n\n`;
paperMd += `---\n\n`;

for (let s = 1; s <= 5; s++) {
  paperMd += `## Round 1 — Set ${s}\n\n`;
  paperMd += `*(See individual set file: \`question_papers/Round1_Set${s}.md\` for standalone printing)*\n\n`;
  for (const lang of ['CPP', 'JAVA', 'PYTHON']) {
    const langLabel = lang === 'CPP' ? 'C++' : lang === 'JAVA' ? 'Java' : 'Python';
    const questions = round1All.filter(q => q.setNumber === s && q.language === lang);
    paperMd += `### Set ${s} — ${langLabel}\n\n`;
    questions.forEach((q, idx) => {
      const parsed = parseStmt(q.statement);
      paperMd += `**Q${idx + 1}. ${q.title.replace(/^Set \d+ - Q\d+: /, '')}**\n\n`;
      paperMd += `${parsed.prompt}\n\n`;
      if (q.buggyCode && q.buggyCode.trim().length > 0) {
        const langTag = lang === 'CPP' ? 'cpp' : lang === 'JAVA' ? 'java' : 'python';
        paperMd += `\`\`\`${langTag}\n${q.buggyCode}\n\`\`\`\n\n`;
      }
      for (const optKey of ['A', 'B', 'C', 'D']) {
        if (parsed.options && parsed.options[optKey]) {
          paperMd += `- **(${optKey})** ${parsed.options[optKey]}\n`;
        }
      }
      paperMd += `\n`;
    });
  }
  paperMd += `---\n\n`;
}

for (let s = 1; s <= 5; s++) {
  const prob = hardProblems.find(p => p.setNumber === s);
  paperMd += `## Round 2 — Set ${s}: ${prob.title}\n\n`;
  paperMd += `${prob.statement}\n\n`;
  paperMd += `*(See \`question_papers/Round2_Set${s}.md\` for language templates)*\n\n`;
  paperMd += `---\n\n`;
}

fs.writeFileSync(path.join(__dirname, '../question_paper.md'), paperMd, 'utf8');
console.log('Wrote question_paper.md');

console.log('ALL ARTIFACTS GENERATED SUCCESSFULLY FOR 2-ROUND EVENT!');
