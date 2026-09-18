import { prisma } from '../config/prisma';
import { Verdict } from '@prisma/client';
import { broadcastToAdmins, broadcastToParticipants, broadcastToTeam, getIo } from '../socket';

export interface RankedTeam {
  rank: number;
  id: string;
  name: string;
  teamCode: string;
  language: string | null;
  status: string;
  score: number;
  solvedQuestionsCount: number;
  attemptedQuestionsCount: number;
  totalTestsPassed: number;
  lastSubmissionTime: string | null;
  tieBreakerPoints: number;
  participants: { name: string; rollNo: string }[];
}

// In-memory freeze state for projector & participant suspense
let isLeaderboardFrozen = false;
let frozenAt: Date | null = null;
let frozenStandings: RankedTeam[] | null = null;

/**
 * Computes live four-tier ranked standings from the database.
 */
export async function computeLiveLeaderboard(): Promise<RankedTeam[]> {
  const teams = await prisma.team.findMany({
    include: {
      participants: {
        select: { name: true, rollNo: true },
      },
      submissions: {
        include: {
          question: {
            select: { isTiebreaker: true },
          },
        },
        orderBy: { submittedAt: 'desc' },
      },
      drafts: {
        select: { questionId: true },
      },
    },
  });

  const teamsData = teams.map((team) => {
    // Distinct solved questions (verdict === ACCEPTED)
    const solvedQuestions = new Set(
      team.submissions.filter((s) => s.verdict === Verdict.ACCEPTED).map((s) => s.questionId)
    );

    // Distinct attempted questions (submissions or drafts)
    const attemptedQuestions = new Set([
      ...team.submissions.map((s) => s.questionId),
      ...team.drafts.map((d) => d.questionId),
    ]);

    // Maximum test cases passed per question
    const bestTestsPerQuestion = new Map<string, number>();
    let tieBreakerScore = 0;

    team.submissions.forEach((s) => {
      const currentBest = bestTestsPerQuestion.get(s.questionId) || 0;
      if (s.testsPassed > currentBest) {
        bestTestsPerQuestion.set(s.questionId, s.testsPassed);
      }
      if (s.question.isTiebreaker && s.pointsAwarded > tieBreakerScore) {
        tieBreakerScore = s.pointsAwarded;
      }
    });

    let totalTestsPassed = 0;
    bestTestsPerQuestion.forEach((val) => {
      totalTestsPassed += val;
    });

    // Earliest last-submission time
    const lastSubTime = team.submissions.length > 0 ? team.submissions[0].submittedAt.toISOString() : null;

    return {
      id: team.id,
      name: team.name,
      teamCode: team.teamCode,
      language: team.language,
      status: team.status,
      score: team.score,
      solvedQuestionsCount: solvedQuestions.size,
      attemptedQuestionsCount: attemptedQuestions.size,
      totalTestsPassed,
      lastSubmissionTime: lastSubTime,
      tieBreakerPoints: tieBreakerScore,
      participants: team.participants,
    };
  });

  // Four-Tier Ranking Algorithm:
  // 1. Total score (descending)
  // 2. Total test cases passed (descending)
  // 3. Earliest last-submission time (ascending - earlier submission ranks higher)
  // 4. Tie-breaker points (descending)
  const sorted = teamsData.sort((a, b) => {
    // Tier 1: Total score
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // Tier 2: Total test cases passed
    if (b.totalTestsPassed !== a.totalTestsPassed) {
      return b.totalTestsPassed - a.totalTestsPassed;
    }

    // Tier 3: Earliest last-submission time
    const aTime = a.lastSubmissionTime ? new Date(a.lastSubmissionTime).getTime() : Infinity;
    const bTime = b.lastSubmissionTime ? new Date(b.lastSubmissionTime).getTime() : Infinity;
    if (aTime !== bTime) {
      return aTime - bTime;
    }

    // Tier 4: Tie-breaker score
    if (b.tieBreakerPoints !== a.tieBreakerPoints) {
      return b.tieBreakerPoints - a.tieBreakerPoints;
    }

    // Tie-breaker fallback: alphabetical
    return a.name.localeCompare(b.name);
  });

  return sorted.map((team, idx) => ({
    ...team,
    rank: idx + 1,
  }));
}

/**
 * Returns leaderboard respecting the freeze state for participants.
 */
export async function getLeaderboard(isAdmin = false) {
  const liveStandings = await computeLiveLeaderboard();

  // If frozen and non-admin request, serve frozen snapshot
  if (!isAdmin && isLeaderboardFrozen && frozenStandings) {
    return {
      isFrozen: true,
      frozenAt: frozenAt?.toISOString() || null,
      standings: frozenStandings,
    };
  }

  return {
    isFrozen: isLeaderboardFrozen,
    frozenAt: frozenAt?.toISOString() || null,
    standings: liveStandings,
  };
}

/**
 * Toggle Freeze/Reveal for Leaderboard.
 */
export async function toggleLeaderboardFreeze(shouldFreeze?: boolean) {
  const newFreezeState = shouldFreeze !== undefined ? shouldFreeze : !isLeaderboardFrozen;
  isLeaderboardFrozen = newFreezeState;

  if (isLeaderboardFrozen) {
    frozenAt = new Date();
    frozenStandings = await computeLiveLeaderboard();
    const freezePayload = {
      isFrozen: true,
      frozenAt: frozenAt.toISOString(),
      standings: frozenStandings,
    };
    broadcastToParticipants('leaderboard:frozen', freezePayload);
    broadcastToAdmins('leaderboard:frozen', freezePayload);
    getIo()?.to('projector').emit('leaderboard:frozen', freezePayload);
  } else {
    frozenAt = null;
    frozenStandings = null;
    const liveStandings = await computeLiveLeaderboard();
    const revealPayload = {
      isFrozen: false,
      standings: liveStandings,
    };
    broadcastToParticipants('leaderboard:revealed', revealPayload);
    broadcastToAdmins('leaderboard:revealed', revealPayload);
    getIo()?.to('projector').emit('leaderboard:revealed', revealPayload);
  }

  return {
    isFrozen: isLeaderboardFrozen,
    frozenAt: frozenAt?.toISOString() || null,
  };
}

/**
 * Broadcast live leaderboard update to connected listeners.
 */
export async function broadcastLeaderboardUpdate() {
  const liveStandings = await computeLiveLeaderboard();
  broadcastToAdmins('leaderboard:updated', { standings: liveStandings });

  if (isLeaderboardFrozen && frozenStandings) {
    getIo()?.to('projector').emit('leaderboard:updated', {
      standings: frozenStandings,
      isFrozen: true,
      frozenAt: frozenAt?.toISOString(),
    });
  } else {
    broadcastToParticipants('leaderboard:updated', { standings: liveStandings });
    getIo()?.to('projector').emit('leaderboard:updated', {
      standings: liveStandings,
      isFrozen: false,
    });
  }
}

/**
 * Manual Score Override with mandatory reason.
 */
export async function overrideScore(
  teamId: string,
  newScore: number,
  reason: string,
  adminId: string
) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  const oldScore = team.score;

  const updatedTeam = await prisma.team.update({
    where: { id: teamId },
    data: { score: newScore },
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorType: 'ADMIN',
      actorId: adminId,
      action: 'MANUAL_SCORE_OVERRIDE',
      payload: {
        teamId,
        teamCode: team.teamCode,
        oldScore,
        newScore,
        reason,
      },
    },
  });

  // Update standings and notify
  await broadcastLeaderboardUpdate();

  return {
    success: true,
    team: updatedTeam,
    oldScore,
    newScore,
    reason,
  };
}

/**
 * Assign tie-breaker question to designated tied teams.
 */
export async function pushTieBreaker(teamIds: string[], questionId: string, adminId: string) {
  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question) throw new Error('Question not found');

  const assignments = teamIds.map((teamId) => ({
    teamId,
    questionId,
  }));

  await prisma.assignment.createMany({
    data: assignments,
    skipDuplicates: true,
  });

  // Notify each tied team
  teamIds.forEach((tId) => {
    broadcastToTeam(tId, 'tiebreaker:assigned', {
      questionId,
      questionTitle: question.title,
      points: question.points,
    });
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorType: 'ADMIN',
      actorId: adminId,
      action: 'PUSH_TIE_BREAKER',
      payload: { teamIds, questionId, questionTitle: question.title },
    },
  });

  return { success: true, count: teamIds.length };
}

/**
 * Generate CSV formatted string of current standings.
 */
export async function generateLeaderboardCSV(): Promise<string> {
  const standings = await computeLiveLeaderboard();

  const headers = [
    'Rank',
    'Team Code',
    'Team Name',
    'Language',
    'Score',
    'Solved Questions',
    'Attempted Questions',
    'Test Cases Passed',
    'Last Submission Time',
    'Status',
  ];

  const rows = standings.map((t) => [
    t.rank,
    `"${t.teamCode}"`,
    `"${t.name.replace(/"/g, '""')}"`,
    t.language || 'N/A',
    t.score,
    t.solvedQuestionsCount,
    t.attemptedQuestionsCount,
    t.totalTestsPassed,
    t.lastSubmissionTime || 'None',
    t.status,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Fetch available tiebreaker questions for selection.
 */
export async function getTiebreakerQuestions() {
  return prisma.question.findMany({
    where: { isTiebreaker: true },
    select: {
      id: true,
      title: true,
      language: true,
      points: true,
      round: {
        select: {
          number: true,
          name: true,
          difficulty: true,
        },
      },
    },
    orderBy: [{ language: 'asc' }, { points: 'asc' }],
  });
}

/**
 * Helper to check current freeze status.
 */
export function isLeaderboardFrozenStatus() {
  return {
    isFrozen: isLeaderboardFrozen,
    frozenAt: frozenAt?.toISOString() || null,
  };
}
