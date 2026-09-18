import { prisma } from '../config/prisma';
import { RoundStatus, Language, Verdict } from '@prisma/client';
import {
  broadcastRoundStarted,
  broadcastRoundEnded,
  broadcastEventPaused,
  broadcastEventResumed,
  broadcastTimerSync,
  broadcastToAdmins,
} from '../socket';
import { executeCodeAgainstTestCases } from './execution.service';
import { assignQuestionsForRound, resolveOriginalMcqAnswer } from './questionAssignment.service';

/**
 * Ensures a single row exists in EventSettings and returns it.
 */
export async function getOrCreateEventSettings() {
  let settings = await prisma.eventSettings.findFirst();
  if (!settings) {
    settings = await prisma.eventSettings.create({
      data: {
        eventStatus: 'NOT_STARTED',
        totalPausedDurationSecs: 0,
        tabSwitchEnabled: true,
        tabSwitchThreshold: 3,
        fullscreenExitEnabled: true,
        fullscreenExitThreshold: 3,
        tabCloseEnabled: true,
        tabCloseThreshold: 1,
        disconnectGraceSecs: 60,
        dualLoginEnabled: true,
        scoringMode: 'PARTIAL',
        runRateLimitSecs: 5,
      },
    });
  }
  return settings;
}

/**
 * Returns all rounds and current event settings.
 */
export async function getEventAndRounds() {
  const settings = await getOrCreateEventSettings();
  const rounds = await prisma.round.findMany({
    orderBy: { number: 'asc' },
    include: {
      _count: {
        select: { questions: true },
      },
    },
  });

  const activeRound = rounds.find((r: any) => r.status === RoundStatus.ACTIVE) || null;

  return {
    eventSettings: settings,
    rounds,
    activeRound,
  };
}

/**
 * Global Event: Start Event
 */
export async function startEvent() {
  const settings = await getOrCreateEventSettings();
  const updated = await prisma.eventSettings.update({
    where: { id: settings.id },
    data: {
      eventStatus: 'ACTIVE',
      eventStartedAt: settings.eventStartedAt || new Date(),
    },
  });

  broadcastToAdmins('event:status_changed', { eventStatus: 'ACTIVE' });
  return updated;
}

/**
 * Global Event: Pause Event
 */
export async function pauseEvent(reason?: string) {
  const settings = await getOrCreateEventSettings();
  if (settings.eventStatus === 'PAUSED') return settings;

  const updated = await prisma.eventSettings.update({
    where: { id: settings.id },
    data: {
      eventStatus: 'PAUSED',
      eventPausedAt: new Date(),
    },
  });

  broadcastEventPaused({
    reason: reason || 'Event paused by organizer',
    pausedAt: updated.eventPausedAt,
  });

  return updated;
}

/**
 * Global Event: Resume Event
 */
export async function resumeEvent() {
  const settings = await getOrCreateEventSettings();
  if (settings.eventStatus !== 'PAUSED') return settings;

  const pausedAt = settings.eventPausedAt || new Date();
  const pauseDurationMs = Math.max(0, Date.now() - pausedAt.getTime());
  const pauseDurationSecs = Math.floor(pauseDurationMs / 1000);

  // Extend active round endsAt by the pause duration
  const activeRound = await prisma.round.findFirst({
    where: { status: RoundStatus.ACTIVE },
  });

  if (activeRound && activeRound.endsAt) {
    const newEndsAt = new Date(activeRound.endsAt.getTime() + pauseDurationMs);
    await prisma.round.update({
      where: { id: activeRound.id },
      data: { endsAt: newEndsAt },
    });
  }

  const updated = await prisma.eventSettings.update({
    where: { id: settings.id },
    data: {
      eventStatus: 'ACTIVE',
      eventPausedAt: null,
      totalPausedDurationSecs: settings.totalPausedDurationSecs + pauseDurationSecs,
    },
  });

  broadcastEventResumed({
    resumedAt: new Date().toISOString(),
    pauseDurationSecs,
  });

  return updated;
}

/**
 * Global Event: End Event
 */
export async function endEvent() {
  const settings = await getOrCreateEventSettings();

  // End all active rounds
  await prisma.round.updateMany({
    where: { status: RoundStatus.ACTIVE },
    data: { status: RoundStatus.ENDED },
  });

  const updated = await prisma.eventSettings.update({
    where: { id: settings.id },
    data: {
      eventStatus: 'ENDED',
      eventPausedAt: null,
    },
  });

  broadcastRoundEnded({ message: 'Event concluded' });
  return updated;
}

/**
 * Global Event: Reset Event (Testing & Development)
 */
export async function resetEvent() {
  const settings = await getOrCreateEventSettings();

  await prisma.round.updateMany({
    data: {
      status: RoundStatus.LOCKED,
      startedAt: null,
      endsAt: null,
    },
  });

  const updated = await prisma.eventSettings.update({
    where: { id: settings.id },
    data: {
      eventStatus: 'NOT_STARTED',
      eventStartedAt: null,
      eventPausedAt: null,
      totalPausedDurationSecs: 0,
    },
  });

  return updated;
}

/**
 * Start a specific round
 */
export async function startRound(roundId: string) {
  // Ensure event is started
  await startEvent();

  // Check if any other round is active
  const existingActive = await prisma.round.findFirst({
    where: {
      status: RoundStatus.ACTIVE,
      id: { not: roundId },
    },
  });

  if (existingActive) {
    throw new Error(`Round ${existingActive.number} (${existingActive.name}) is currently active. End it before starting another.`);
  }

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: { questions: true },
  });

  if (!round) {
    throw new Error('Round not found');
  }

  const now = new Date();
  const endsAt = new Date(now.getTime() + round.durationMinutes * 60 * 1000);

  const updatedRound = await prisma.round.update({
    where: { id: roundId },
    data: {
      status: RoundStatus.ACTIVE,
      startedAt: now,
      endsAt,
    },
  });

  // Automatically assign distinct question sets to teams based on chosen language and team ID
  await assignQuestionsForRound(roundId);

  // Broadcast WebSocket notification
  broadcastRoundStarted({
    roundId: updatedRound.id,
    roundNumber: updatedRound.number,
    name: updatedRound.name,
    durationMinutes: updatedRound.durationMinutes,
    startedAt: updatedRound.startedAt?.toISOString(),
    endsAt: updatedRound.endsAt?.toISOString(),
  });

  return updatedRound;
}

/**
 * End a specific round
 */
export async function endRound(roundId: string) {
  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: {
      questions: {
        include: {
          testCases: true,
        },
      },
    },
  });

  if (!round) throw new Error('Round not found');

  const updatedRound = await prisma.round.update({
    where: { id: roundId },
    data: {
      status: RoundStatus.ENDED,
    },
  });

  // Auto-submit all in-progress drafts for this round
  try {
    const questionIds = round.questions.map((q: any) => q.id);
    const drafts = await prisma.draft.findMany({
      where: {
        questionId: { in: questionIds },
      },
      include: {
        team: true,
        question: {
          include: {
            testCases: true,
          },
        },
      },
    });

    for (const draft of drafts) {
      // Check if team already has an ACCEPTED or submission for this question
      const existingSub = await prisma.submission.findFirst({
        where: {
          teamId: draft.teamId,
          questionId: draft.questionId,
        },
        orderBy: { pointsAwarded: 'desc' },
      });

      if (!existingSub) {
        const isMcq = round.number === 1 || draft.question.statement.trim().startsWith('{"type":"MCQ"');
        let pointsAwarded = 0;
        let verdict: Verdict = Verdict.WRONG_ANSWER;
        let testsPassed = 0;
        let testsTotal = 1;
        let execTimeMs = 1;

        if (isMcq) {
          const resolved = resolveOriginalMcqAnswer(
            draft.teamId,
            draft.question.id,
            draft.question.statement,
            draft.code
          );
          const isCorrect = resolved === draft.question.referenceSolution.trim().toUpperCase() && resolved.length > 0;
          verdict = isCorrect ? Verdict.ACCEPTED : Verdict.WRONG_ANSWER;
          pointsAwarded = isCorrect ? draft.question.points : 0;
          testsPassed = isCorrect ? 1 : 0;
        } else {
          // Execute and score draft code
          const execRes = await executeCodeAgainstTestCases(
            draft.code,
            draft.question.language,
            draft.question.testCases
          );

          let totalWeight = 0;
          let passedWeight = 0;
          draft.question.testCases.forEach((tc: any) => {
            totalWeight += tc.weight;
            const result = execRes.results.find((r) => r.testCaseId === tc.id);
            if (result?.isMatch) {
              passedWeight += tc.weight;
            }
          });

          pointsAwarded = totalWeight > 0 ? (passedWeight / totalWeight) * draft.question.points : 0;
          if (execRes.allPassed) verdict = Verdict.ACCEPTED;
          else if (execRes.compileError) verdict = Verdict.COMPILATION_ERROR;
          testsPassed = execRes.testsPassed;
          testsTotal = execRes.testsTotal;
          execTimeMs = execRes.results[0]?.execTimeMs || 0;
        }

        await prisma.submission.create({
          data: {
            teamId: draft.teamId,
            questionId: draft.questionId,
            code: draft.code,
            language: draft.question.language,
            verdict,
            testsPassed,
            testsTotal,
            pointsAwarded,
            execTimeMs,
          },
        });

        // Update team score
        if (pointsAwarded > 0) {
          await prisma.team.update({
            where: { id: draft.teamId },
            data: { score: { increment: pointsAwarded } },
          });
        }
      }
    }
  } catch (err) {
    console.error('Auto-submission processing error on round end:', err);
  }

  broadcastRoundEnded({
    roundId: updatedRound.id,
    roundNumber: updatedRound.number,
    name: updatedRound.name,
  });

  return updatedRound;
}

/**
 * Extend an active round's time (+N minutes)
 */
export async function extendRound(roundId: string, additionalMinutes: number) {
  const round = await prisma.round.findUnique({
    where: { id: roundId },
  });

  if (!round) throw new Error('Round not found');
  if (round.status !== RoundStatus.ACTIVE || !round.endsAt) {
    throw new Error('Only active rounds can be extended');
  }

  const newDuration = round.durationMinutes + additionalMinutes;
  const newEndsAt = new Date(round.endsAt.getTime() + additionalMinutes * 60 * 1000);

  const updatedRound = await prisma.round.update({
    where: { id: roundId },
    data: {
      durationMinutes: newDuration,
      endsAt: newEndsAt,
    },
  });

  broadcastTimerSync({
    roundId: updatedRound.id,
    roundNumber: updatedRound.number,
    durationMinutes: updatedRound.durationMinutes,
    endsAt: updatedRound.endsAt?.toISOString(),
  });

  return updatedRound;
}
