import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authParticipant } from '../../middleware/authParticipant';
import { prisma } from '../../config/prisma';
import { RoundStatus, Verdict, Language } from '@prisma/client';
import { executeCodeAgainstTestCases, ExecutionTestCase } from '../../services/execution.service';
import { broadcastToAdmins } from '../../socket';
import { getLeaderboard, broadcastLeaderboardUpdate } from '../../services/scoring.service';
import {
  ensureTeamQuestionAssignments,
  shuffleArray,
  getShuffledMcqOptions,
  resolveOriginalMcqAnswer,
} from '../../services/questionAssignment.service';

const router = Router();
router.use(authParticipant);

// In-memory rate limiting map: teamId -> timestamp
const lastRunTimestamps = new Map<string, number>();

/**
 * GET /api/event/workspace/status
 * Returns workspace health, active round, and team state.
 */
router.get('/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamId = req.team!.teamId;
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: {
        id: true,
        name: true,
        teamCode: true,
        language: true,
        status: true,
        score: true,
      },
    });

    const settings = await prisma.eventSettings.findFirst();
    const activeRound = await prisma.round.findFirst({
      where: { status: RoundStatus.ACTIVE },
    });

    res.json({
      success: true,
      team,
      eventStatus: settings?.eventStatus || 'NOT_STARTED',
      isPaused: settings?.eventStatus === 'PAUSED',
      activeRound: activeRound
        ? {
            id: activeRound.id,
            number: activeRound.number,
            name: activeRound.name,
            durationMinutes: activeRound.durationMinutes,
            startedAt: activeRound.startedAt,
            endsAt: activeRound.endsAt,
          }
        : null,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/event/workspace/leaderboard
 * Returns participant-facing leaderboard (respects freeze state).
 */
router.get('/leaderboard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getLeaderboard(false);
    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/event/workspace/questions
 * Returns questions for active round matching team language, with drafts and submission status.
 */
router.get('/questions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = req.team!;
    if (!team.language) {
      return res.status(400).json({
        success: false,
        error: { message: 'Language not selected yet. Select a language first.' },
      });
    }

    const activeRound = await prisma.round.findFirst({
      where: { status: RoundStatus.ACTIVE },
    });

    if (!activeRound) {
      return res.status(200).json({
        success: true,
        activeRound: null,
        questions: [],
        message: 'No round is currently active. Please wait in the waiting room.',
      });
    }

    // Ensure team has their assigned question set for this active round
    const assignedQuestionIds = await ensureTeamQuestionAssignments(
      team.teamId,
      activeRound.id,
      team.language as Language
    );

    // Fetch questions assigned to this team
    const questions = await prisma.question.findMany({
      where: {
        id: { in: assignedQuestionIds },
        roundId: activeRound.id,
        language: team.language as Language,
      },
      select: {
        id: true,
        title: true,
        statement: true,
        buggyCode: true,
        points: true,
        timeLimitMs: true,
        memoryLimitMb: true,
        isTiebreaker: true,
        testCases: {
          where: { isHidden: false }, // ONLY return visible test cases to participants
          select: {
            id: true,
            stdin: true,
            expectedStdout: true,
            weight: true,
          },
        },
      },
      orderBy: [{ points: 'asc' }, { createdAt: 'asc' }],
    });

    // Attach drafts and best submissions
    const questionIds = questions.map((q) => q.id);

    const drafts = await prisma.draft.findMany({
      where: {
        teamId: team.teamId,
        questionId: { in: questionIds },
      },
    });

    const submissions = await prisma.submission.findMany({
      where: {
        teamId: team.teamId,
        questionId: { in: questionIds },
      },
      orderBy: { pointsAwarded: 'desc' },
    });

    // Deterministically shuffle question order for this team in this active round
    const qOrderSeed = `${team.teamId}_round_${activeRound.id}_q_order_v2`;
    const orderedQuestions = shuffleArray(questions, qOrderSeed);

    const enrichedQuestions = orderedQuestions.map((q: any, index: number) => {
      const draft = drafts.find((d: any) => d.questionId === q.id);
      const teamSubs = submissions.filter((s: any) => s.questionId === q.id);
      const bestSub = teamSubs[0] || null;

      let isMcq = false;
      let mcqPrompt = q.statement;
      let mcqOptions: any = null;

      try {
        if (q.statement && q.statement.trim().startsWith('{')) {
          const parsed = JSON.parse(q.statement);
          if (parsed.type === 'MCQ' || parsed.options) {
            isMcq = true;
            mcqPrompt = parsed.prompt || parsed.text || q.statement;
            if (parsed.options) {
              const { shuffledOptions } = getShuffledMcqOptions(team.teamId, q.id, parsed.options);
              mcqOptions = shuffledOptions;
            }
          }
        }
      } catch (e) {}

      if (activeRound.number === 1) {
        isMcq = true;
      }

      // Re-number question title according to this team's personal question order
      const cleanTitle = q.title.replace(/^Q\d+\.\s*/, '');
      const displayTitle = `Q${index + 1}. ${cleanTitle}`;

      return {
        ...q,
        title: displayTitle,
        displayIndex: index + 1,
        isMcq,
        mcqPrompt,
        mcqOptions,
        codeSnippet: q.buggyCode,
        selectedOption: draft?.code || null,
        draftCode: draft?.code || (isMcq ? '' : q.buggyCode),
        hasDraft: !!draft,
        bestSubmission: bestSub
          ? {
              verdict: bestSub.verdict,
              pointsAwarded: bestSub.pointsAwarded,
              testsPassed: bestSub.testsPassed,
              testsTotal: bestSub.testsTotal,
              submittedAt: bestSub.submittedAt,
            }
          : null,
        submissionCount: teamSubs.length,
      };
    });

    res.json({
      success: true,
      activeRound: {
        id: activeRound.id,
        number: activeRound.number,
        name: activeRound.name,
        endsAt: activeRound.endsAt,
      },
      questions: enrichedQuestions,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/event/workspace/draft
 * Autosave draft code.
 */
router.post('/draft', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamId = req.team!.teamId;
    const { questionId, code } = req.body;

    if (!questionId || code === undefined) {
      return res.status(400).json({
        success: false,
        error: { message: 'questionId and code are required' },
      });
    }

    // If MCQ and already submitted, lock draft from being changed
    const existingSub = await prisma.submission.findFirst({
      where: { teamId, questionId, question: { round: { number: 1 } } },
    });
    if (existingSub) {
      return res.json({ success: true, message: 'Answer is already locked and submitted' });
    }

    const draft = await prisma.draft.upsert({
      where: {
        teamId_questionId: {
          teamId,
          questionId,
        },
      },
      create: {
        teamId,
        questionId,
        code,
      },
      update: {
        code,
      },
    });

    res.json({ success: true, updatedAt: draft.updatedAt });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/event/workspace/run
 * Run code against sample visible test cases + custom stdin.
 */
router.post('/run', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = req.team!;
    if (team.status === 'DISQUALIFIED') {
      return res.status(403).json({
        success: false,
        error: { message: 'Your team is disqualified and cannot execute code.' },
      });
    }

    // Rate Limiting (5s cooldown)
    const now = Date.now();
    const lastRun = lastRunTimestamps.get(team.teamId) || 0;
    const cooldownMs = 5000;
    if (now - lastRun < cooldownMs) {
      const waitSec = Math.ceil((cooldownMs - (now - lastRun)) / 1000);
      return res.status(429).json({
        success: false,
        error: { message: `Rate limited. Please wait ${waitSec}s before running again.` },
      });
    }
    lastRunTimestamps.set(team.teamId, now);

    const { questionId, code, customStdin } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({
        success: false,
        error: { message: 'questionId and code are required' },
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        testCases: {
          where: { isHidden: false },
        },
      },
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        error: { message: 'Question not found' },
      });
    }

    // Prepare execution test cases (visible only)
    const testCases: ExecutionTestCase[] = question.testCases.map((tc: any) => ({
      id: tc.id,
      stdin: tc.stdin,
      expectedStdout: tc.expectedStdout,
      weight: tc.weight,
      isHidden: false,
    }));

    // If custom stdin is provided, add as an evaluation case
    if (customStdin !== undefined && customStdin !== null && customStdin.trim() !== '') {
      testCases.push({
        id: 'custom_stdin',
        stdin: customStdin,
        expectedStdout: '',
        isHidden: false,
      });
    }

    const execResult = await executeCodeAgainstTestCases(
      code,
      question.language,
      testCases,
      question.timeLimitMs,
      question.memoryLimitMb
    );

    // Separate custom stdin result if present
    const sampleResults = execResult.results.filter((r) => r.testCaseId !== 'custom_stdin');
    const customResult = execResult.results.find((r) => r.testCaseId === 'custom_stdin');

    res.json({
      success: true,
      allPassed: execResult.allPassed,
      testsPassed: execResult.testsPassed,
      testsTotal: sampleResults.length,
      compileError: execResult.compileError,
      results: sampleResults.map((r) => ({
        testCaseId: r.testCaseId,
        stdin: r.stdin,
        expectedStdout: r.expectedStdout,
        actualStdout: r.actualStdout,
        isMatch: r.isMatch,
        verdict: r.verdict,
        execTimeMs: r.execTimeMs,
        stderr: r.stderr,
      })),
      customStdinResult: customResult
        ? {
            stdin: customResult.stdin,
            stdout: customResult.actualStdout,
            stderr: customResult.stderr,
            execTimeMs: customResult.execTimeMs,
            verdict: customResult.verdict,
          }
        : null,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/event/workspace/submit
 * Submit code against all test cases (both visible and hidden).
 */
router.post('/submit', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = req.team!;
    if (team.status === 'DISQUALIFIED') {
      return res.status(403).json({
        success: false,
        error: { message: 'Your team is disqualified and cannot submit.' },
      });
    }

    // Check active round
    const activeRound = await prisma.round.findFirst({
      where: { status: RoundStatus.ACTIVE },
    });

    if (!activeRound) {
      return res.status(400).json({
        success: false,
        error: { message: 'No active round. Submissions are closed.' },
      });
    }

    const settings = await prisma.eventSettings.findFirst();
    if (settings?.eventStatus === 'PAUSED') {
      return res.status(400).json({
        success: false,
        error: { message: 'Event is paused. Submissions are temporarily frozen.' },
      });
    }

    const { questionId, code } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({
        success: false,
        error: { message: 'questionId and code are required' },
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        testCases: true,
      },
    });

    if (!question || question.roundId !== activeRound.id) {
      return res.status(400).json({
        success: false,
        error: { message: 'Question does not belong to the currently active round.' },
      });
    }

    // Verify question is assigned to this team
    const assignment = await prisma.assignment.findFirst({
      where: {
        teamId: team.teamId,
        questionId: question.id,
      },
    });

    if (!assignment) {
      return res.status(403).json({
        success: false,
        error: { message: 'This question is not assigned to your team.' },
      });
    }

    // Check submission count limit if enabled
    if (settings?.maxSubmissionsPerQuestion) {
      const priorCount = await prisma.submission.count({
        where: { teamId: team.teamId, questionId },
      });
      if (priorCount >= settings.maxSubmissionsPerQuestion) {
        return res.status(400).json({
          success: false,
          error: { message: `Maximum submission limit of ${settings.maxSubmissionsPerQuestion} reached for this question.` },
        });
      }
    }

    // Handle MCQ Question Submission (e.g. Round 1)
    const isMcq = activeRound.number === 1 || question.statement.trim().startsWith('{"type":"MCQ"');
    if (isMcq) {
      // Enforce strictly ONE attempt per MCQ question
      const existingSub = await prisma.submission.findFirst({
        where: { teamId: team.teamId, questionId: question.id },
      });
      if (existingSub) {
        return res.status(400).json({
          success: false,
          error: { message: 'You have already submitted an answer for this question. Only one attempt is allowed.' },
        });
      }

      const selectedDisplayKey = (code || '').trim().toUpperCase();
      // Map team's scrambled display key back to canonical original option key
      const resolvedOriginalAnswer = resolveOriginalMcqAnswer(
        team.teamId,
        question.id,
        question.statement,
        selectedDisplayKey
      );

      const correct = question.referenceSolution.trim().toUpperCase();
      const isCorrect = resolvedOriginalAnswer === correct && resolvedOriginalAnswer.length > 0;

      const overallVerdict: Verdict = isCorrect ? Verdict.ACCEPTED : Verdict.WRONG_ANSWER;
      const pointsAwarded = isCorrect ? question.points : 0;
      const testsPassed = isCorrect ? 1 : 0;
      const testsTotal = 1;

      const submission = await prisma.submission.create({
        data: {
          teamId: team.teamId,
          questionId: question.id,
          code: selectedDisplayKey,
          language: question.language,
          verdict: overallVerdict,
          testsPassed,
          testsTotal,
          pointsAwarded,
          execTimeMs: 1,
        },
      });

      await prisma.draft.upsert({
        where: {
          teamId_questionId: {
            teamId: team.teamId,
            questionId: question.id,
          },
        },
        create: {
          teamId: team.teamId,
          questionId: question.id,
          code: selectedDisplayKey,
        },
        update: {
          code: selectedDisplayKey,
        },
      });

      // Update team score if this submission sets a new personal best on this question
      const priorBest = await prisma.submission.findFirst({
        where: {
          teamId: team.teamId,
          questionId: question.id,
          id: { not: submission.id },
        },
        orderBy: { pointsAwarded: 'desc' },
      });

      const priorBestPoints = priorBest?.pointsAwarded || 0;
      if (pointsAwarded > priorBestPoints) {
        const delta = pointsAwarded - priorBestPoints;
        await prisma.team.update({
          where: { id: team.teamId },
          data: {
            score: { increment: delta },
          },
        });
      }

      broadcastToAdmins('submission:received', {
        submissionId: submission.id,
        teamId: team.teamId,
        teamCode: team.teamCode,
        questionId: question.id,
        questionTitle: question.title,
        verdict: overallVerdict,
        pointsAwarded,
        testsPassed,
        testsTotal,
        submittedAt: submission.submittedAt.toISOString(),
      });

      broadcastLeaderboardUpdate().catch((e) => console.error('Leaderboard broadcast failed:', e));

      return res.json({
        success: true,
        submission: {
          id: submission.id,
          verdict: submission.verdict,
          pointsAwarded: submission.pointsAwarded,
          testsPassed: submission.testsPassed,
          testsTotal: submission.testsTotal,
          submittedAt: submission.submittedAt,
        },
      });
    }

    // Execute against ALL test cases (both visible and hidden)
    const testCases: ExecutionTestCase[] = question.testCases.map((tc: any) => ({
      id: tc.id,
      stdin: tc.stdin,
      expectedStdout: tc.expectedStdout,
      weight: tc.weight,
      isHidden: tc.isHidden,
    }));

    const execResult = await executeCodeAgainstTestCases(
      code,
      question.language,
      testCases,
      question.timeLimitMs,
      question.memoryLimitMb
    );

    // Compute weighted score
    let totalWeight = 0;
    let passedWeight = 0;

    question.testCases.forEach((tc: any) => {
      totalWeight += tc.weight;
      const match = execResult.results.find((r) => r.testCaseId === tc.id && r.isMatch);
      if (match) {
        passedWeight += tc.weight;
      }
    });

    let pointsAwarded = 0;
    if (settings?.scoringMode === 'ALL_OR_NOTHING') {
      pointsAwarded = execResult.allPassed ? question.points : 0;
    } else {
      // Partial credit proportional to passed testcase weights
      pointsAwarded = totalWeight > 0 ? (passedWeight / totalWeight) * question.points : 0;
    }

    // Determine overall verdict
    let overallVerdict: Verdict = Verdict.WRONG_ANSWER;
    if (execResult.compileError) {
      overallVerdict = Verdict.COMPILATION_ERROR;
    } else if (execResult.allPassed) {
      overallVerdict = Verdict.ACCEPTED;
    } else {
      const errorResult = execResult.results.find((r) => r.verdict !== Verdict.ACCEPTED);
      overallVerdict = errorResult?.verdict || Verdict.WRONG_ANSWER;
    }

    // Save submission
    const submission = await prisma.submission.create({
      data: {
        teamId: team.teamId,
        questionId: question.id,
        code,
        language: question.language,
        verdict: overallVerdict,
        testsPassed: execResult.testsPassed,
        testsTotal: execResult.testsTotal,
        pointsAwarded,
        execTimeMs: execResult.results[0]?.execTimeMs || 0,
      },
    });

    // Also update draft to latest submitted code
    await prisma.draft.upsert({
      where: {
        teamId_questionId: {
          teamId: team.teamId,
          questionId: question.id,
        },
      },
      create: {
        teamId: team.teamId,
        questionId: question.id,
        code,
      },
      update: {
        code,
      },
    });

    // Update team score if this submission sets a new personal best on this question
    const priorBest = await prisma.submission.findFirst({
      where: {
        teamId: team.teamId,
        questionId: question.id,
        id: { not: submission.id },
      },
      orderBy: { pointsAwarded: 'desc' },
    });

    const priorBestPoints = priorBest?.pointsAwarded || 0;
    if (pointsAwarded > priorBestPoints) {
      const delta = pointsAwarded - priorBestPoints;
      await prisma.team.update({
        where: { id: team.teamId },
        data: {
          score: { increment: delta },
        },
      });
    }

    // Broadcast submission event to admin
    broadcastToAdmins('submission:received', {
      submissionId: submission.id,
      teamId: team.teamId,
      teamCode: team.teamCode,
      questionId: question.id,
      questionTitle: question.title,
      verdict: overallVerdict,
      pointsAwarded,
      testsPassed: execResult.testsPassed,
      testsTotal: execResult.testsTotal,
      submittedAt: submission.submittedAt.toISOString(),
    });

    // Broadcast live leaderboard recalculation
    broadcastLeaderboardUpdate().catch((e) => console.error('Leaderboard broadcast failed:', e));

    // Return sanitized results (do NOT leak hidden test case stdin / expectedStdout!)
    const sanitizedResults = execResult.results.map((r) => {
      const tc = question.testCases.find((t: any) => t.id === r.testCaseId);
      if (tc?.isHidden) {
        return {
          testCaseId: r.testCaseId,
          isHidden: true,
          isMatch: r.isMatch,
          verdict: r.verdict,
          execTimeMs: r.execTimeMs,
          weight: r.weight,
        };
      }
      return {
        testCaseId: r.testCaseId,
        isHidden: false,
        stdin: r.stdin,
        expectedStdout: r.expectedStdout,
        actualStdout: r.actualStdout,
        isMatch: r.isMatch,
        verdict: r.verdict,
        execTimeMs: r.execTimeMs,
        stderr: r.stderr,
        weight: r.weight,
      };
    });

    res.json({
      success: true,
      submissionId: submission.id,
      verdict: overallVerdict,
      pointsAwarded,
      testsPassed: execResult.testsPassed,
      testsTotal: execResult.testsTotal,
      allPassed: execResult.allPassed,
      compileError: execResult.compileError,
      results: sanitizedResults,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
