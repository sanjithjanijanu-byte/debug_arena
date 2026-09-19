import { prisma } from '../config/prisma';
import { TeamStatus, RoundStatus } from '@prisma/client';
import { activeTeamSockets, broadcastToTeam, broadcastToAdmins } from '../socket';

export interface LiveTeamData {
  id: string;
  name: string;
  teamCode: string;
  language: string | null;
  status: TeamStatus;
  score: number;
  isOnline: boolean;
  activeRoundNumber?: number;
  timeRemainingSeconds?: number;
  solvedQuestionsCount: number;
  attemptedQuestionsCount: number;
  totalTestsPassed: number;
  lastActivityAt: string;
  violationCount: number;
  recentViolations: {
    id: string;
    type: string;
    details: string | null;
    occurredAt: string;
  }[];
  disqualifiedAt: string | null;
  reinstatedAt: string | null;
  participants: {
    id: string;
    name: string;
    rollNo: string;
  }[];
}

/**
 * Returns real-time monitoring metrics for all teams.
 */
export async function getLiveTeams(): Promise<{ teams: LiveTeamData[]; activeRound: any }> {
  const activeRound = await prisma.round.findFirst({
    where: { status: RoundStatus.ACTIVE },
  });

  const teams = await prisma.team.findMany({
    include: {
      participants: {
        select: { id: true, name: true, rollNo: true },
      },
      violations: {
        orderBy: { occurredAt: 'desc' },
        take: 5,
      },
      _count: {
        select: { violations: true, submissions: true, drafts: true },
      },
      submissions: {
        select: {
          id: true,
          questionId: true,
          verdict: true,
          pointsAwarded: true,
          testsPassed: true,
          testsTotal: true,
          submittedAt: true,
        },
        orderBy: { submittedAt: 'desc' },
      },
      drafts: {
        select: {
          questionId: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
    orderBy: [{ score: 'desc' }, { name: 'asc' }],
  });

  const now = Date.now();
  const timeRemainingSeconds =
    activeRound && activeRound.endsAt
      ? Math.max(0, Math.floor((activeRound.endsAt.getTime() - now) / 1000))
      : 0;

  const enrichedTeams: LiveTeamData[] = teams.map((team) => {
    const isOnline = activeTeamSockets.has(team.id) && (activeTeamSockets.get(team.id)?.size || 0) > 0;

    // Count distinct solved questions
    const solvedSet = new Set(
      team.submissions.filter((s) => s.verdict === 'ACCEPTED').map((s) => s.questionId)
    );

    // Count distinct attempted questions (either drafted or submitted)
    const attemptedSet = new Set([
      ...team.submissions.map((s) => s.questionId),
      ...team.drafts.map((d) => d.questionId),
    ]);

    // Sum best test cases passed per question
    const bestTestsPerQuestion = new Map<string, number>();
    team.submissions.forEach((s) => {
      const current = bestTestsPerQuestion.get(s.questionId) || 0;
      if (s.testsPassed > current) {
        bestTestsPerQuestion.set(s.questionId, s.testsPassed);
      }
    });
    let totalTestsPassed = 0;
    bestTestsPerQuestion.forEach((val) => {
      totalTestsPassed += val;
    });

    // Determine latest activity timestamp
    const dates: number[] = [team.createdAt.getTime()];
    if (team.submissions.length > 0) dates.push(team.submissions[0].submittedAt.getTime());
    if (team.drafts.length > 0) dates.push(team.drafts[0].updatedAt.getTime());
    const latestDate = new Date(Math.max(...dates));

    // Determine effective status
    let effectiveStatus = team.status;
    if (team.status === TeamStatus.DISQUALIFIED) {
      effectiveStatus = TeamStatus.DISQUALIFIED;
    } else if (team.status === TeamStatus.REINSTATED) {
      effectiveStatus = TeamStatus.REINSTATED;
    } else if (isOnline) {
      effectiveStatus = team.submissions.length > 0 ? TeamStatus.ACTIVE : TeamStatus.ACTIVE;
    } else {
      effectiveStatus = team.status === TeamStatus.NOT_LOGGED_IN ? TeamStatus.NOT_LOGGED_IN : TeamStatus.IDLE;
    }

    return {
      id: team.id,
      name: team.name,
      teamCode: team.teamCode,
      language: team.language,
      status: effectiveStatus,
      score: team.score,
      isOnline,
      activeRoundNumber: activeRound?.number,
      timeRemainingSeconds,
      solvedQuestionsCount: solvedSet.size,
      attemptedQuestionsCount: attemptedSet.size,
      totalTestsPassed,
      lastActivityAt: latestDate.toISOString(),
      violationCount: team._count.violations,
      recentViolations: team.violations.map((v) => ({
        id: v.id,
        type: v.type,
        details: v.details,
        occurredAt: v.occurredAt.toISOString(),
      })),
      disqualifiedAt: team.disqualifiedAt ? team.disqualifiedAt.toISOString() : null,
      reinstatedAt: team.reinstatedAt ? team.reinstatedAt.toISOString() : null,
      participants: team.participants,
    };
  });

  return {
    teams: enrichedTeams,
    activeRound: activeRound
      ? {
          id: activeRound.id,
          number: activeRound.number,
          name: activeRound.name,
          endsAt: activeRound.endsAt?.toISOString(),
        }
      : null,
  };
}

/**
 * Returns team's live draft code and submission history for live proctor inspection.
 */
export async function getTeamLiveCode(teamId: string) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { id: true, name: true, teamCode: true, language: true, status: true },
  });

  if (!team) throw new Error('Team not found');

  const drafts = await prisma.draft.findMany({
    where: { teamId },
    include: {
      question: {
        select: {
          id: true,
          title: true,
          statement: true,
          points: true,
          buggyCode: true,
          language: true,
          round: {
            select: { number: true, name: true },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  const submissions = await prisma.submission.findMany({
    where: { teamId },
    include: {
      question: {
        select: { id: true, title: true, points: true },
      },
    },
    orderBy: { submittedAt: 'desc' },
  });

  return {
    team,
    drafts: drafts.map((d) => ({
      questionId: d.questionId,
      questionTitle: d.question.title,
      roundNumber: d.question.round.number,
      points: d.question.points,
      code: d.code,
      buggyCode: d.question.buggyCode,
      statement: d.question.statement,
      updatedAt: d.updatedAt.toISOString(),
    })),
    submissions: submissions.map((s) => ({
      id: s.id,
      questionId: s.questionId,
      questionTitle: s.question.title,
      verdict: s.verdict,
      pointsAwarded: s.pointsAwarded,
      testsPassed: s.testsPassed,
      testsTotal: s.testsTotal,
      submittedAt: s.submittedAt.toISOString(),
      code: s.code,
    })),
  };
}

/**
 * Send custom or urgent warning message to a specific team.
 */
export async function sendWarningMessage(teamId: string, message: string, adminId: string) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  // Push WebSocket notification directly to team room
  broadcastToTeam(teamId, 'admin:message', {
    message,
    sentAt: new Date().toISOString(),
    sender: 'Event Organizer',
  });

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      actorType: 'ADMIN',
      actorId: adminId,
      action: 'SEND_WARNING',
      payload: { teamId, teamCode: team.teamCode, message },
    },
  });

  return { success: true, message: `Warning dispatched to ${team.teamCode}` };
}

/**
 * Disqualify a team, freeze timer, block submissions, and broadcast event.
 * Supports both manual admin disqualification and automated proctoring disqualification.
 */
export async function disqualifyTeam(teamId: string, reason: string, adminId?: string) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  if (team.status === TeamStatus.DISQUALIFIED) {
    return team;
  }

  let effectiveAdminId = adminId;
  if (!effectiveAdminId) {
    const defaultAdmin = await prisma.admin.findFirst();
    if (defaultAdmin) {
      effectiveAdminId = defaultAdmin.id;
    } else {
      const sysAdmin = await prisma.admin.create({
        data: {
          username: 'system_proctor',
          passwordHash: 'DISABLED',
        },
      });
      effectiveAdminId = sysAdmin.id;
    }
  }

  const activeRound = await prisma.round.findFirst({ where: { status: RoundStatus.ACTIVE } });
  let remainingTimeSnapshot: number | null = null;
  if (activeRound && activeRound.endsAt) {
    remainingTimeSnapshot = Math.max(0, Math.floor((activeRound.endsAt.getTime() - Date.now()) / 1000));
  }

  const updatedTeam = await prisma.team.update({
    where: { id: teamId },
    data: {
      status: TeamStatus.DISQUALIFIED,
      disqualifiedAt: new Date(),
    },
  });

  // Immutable Disqualification Log
  await prisma.disqualificationLog.create({
    data: {
      teamId,
      action: 'DISQUALIFY',
      reason,
      adminId: effectiveAdminId,
      remainingTimeSnapshot,
    },
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorType: adminId ? 'ADMIN' : 'SYSTEM',
      actorId: effectiveAdminId,
      action: 'DISQUALIFY_TEAM',
      payload: {
        teamId,
        teamCode: team.teamCode,
        reason,
        remainingTimeSnapshot,
        automated: !adminId,
      },
    },
  });

  // Real-time Push to Team
  broadcastToTeam(teamId, 'team:disqualified', {
    teamId,
    reason,
    disqualifiedAt: updatedTeam.disqualifiedAt?.toISOString(),
  });

  // Real-time Push to Admins
  broadcastToAdmins('team:status_changed', {
    teamId,
    teamCode: team.teamCode,
    status: TeamStatus.DISQUALIFIED,
    reason,
    timestamp: new Date().toISOString(),
  });

  broadcastToAdmins('team:violation', {
    id: `auto-dq-${Date.now()}`,
    teamId,
    teamCode: team.teamCode,
    type: 'DISQUALIFIED_BY_SYSTEM',
    details: reason,
    occurredAt: new Date().toISOString(),
  });

  return updatedTeam;
}

/**
 * Log a violation and immediately disqualify if violation is a tab switch, blur, or app change.
 */
export async function handleProctoringViolation(
  teamId: string,
  type: string,
  details?: string
): Promise<{ violation: any; disqualified: boolean }> {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  // 1. Record violation
  const violation = await prisma.violation.create({
    data: {
      teamId,
      type,
      details: details || null,
    },
  });

  // 2. Real-time push to admins
  broadcastToAdmins('team:violation', {
    id: violation.id,
    teamId,
    teamCode: team.teamCode,
    type: violation.type,
    details: violation.details,
    occurredAt: violation.occurredAt.toISOString(),
  });

  // 3. Determine if this triggers immediate disqualification
  const criticalTypes = ['TAB_SWITCH', 'WINDOW_BLUR', 'APP_SWITCH', 'FULLSCREEN_EXIT', 'DISQUALIFY'];
  const isCritical = criticalTypes.includes(type.toUpperCase());

  if (isCritical && team.status !== TeamStatus.DISQUALIFIED) {
    let reason = 'Violation of strict proctoring rules: Left active test window.';
    if (type.toUpperCase() === 'TAB_SWITCH') {
      reason = 'Disqualified: Tab switch or minimized browser window detected during active test.';
    } else if (type.toUpperCase() === 'WINDOW_BLUR') {
      reason = 'Disqualified: Lost window focus or opened external application during active test.';
    } else if (type.toUpperCase() === 'FULLSCREEN_EXIT') {
      reason = 'Disqualified: Exited mandatory fullscreen mode during active test.';
    } else if (details) {
      reason = `Disqualified: ${details}`;
    }

    await disqualifyTeam(teamId, reason);
    return { violation, disqualified: true };
  }

  return { violation, disqualified: team.status === TeamStatus.DISQUALIFIED };
}

/**
 * Reinstate a disqualified team, restore state, and optionally grant compensation minutes.
 */
export async function reinstateTeam(
  teamId: string,
  reason: string,
  adminId: string,
  compensationMinutes = 0
) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  const updatedTeam = await prisma.team.update({
    where: { id: teamId },
    data: {
      status: TeamStatus.REINSTATED,
      reinstatedAt: new Date(),
    },
  });

  // Immutable Disqualification Log for reinstatement
  await prisma.disqualificationLog.create({
    data: {
      teamId,
      action: 'REINSTATE',
      reason,
      adminId,
    },
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorType: 'ADMIN',
      actorId: adminId,
      action: 'REINSTATE_TEAM',
      payload: { teamId, teamCode: team.teamCode, reason, compensationMinutes },
    },
  });

  // Real-time Push to Team
  broadcastToTeam(teamId, 'team:reinstated', {
    teamId,
    reason,
    compensationMinutes,
    reinstatedAt: updatedTeam.reinstatedAt?.toISOString(),
  });

  // Real-time Push to Admins
  broadcastToAdmins('team:status_changed', {
    teamId,
    teamCode: team.teamCode,
    status: TeamStatus.REINSTATED,
    timestamp: new Date().toISOString(),
  });

  return updatedTeam;
}

/**
 * Grant extra compensation time (+N minutes) to a single team.
 */
export async function extendTeamTime(teamId: string, extraMinutes: number, adminId: string) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error('Team not found');

  broadcastToTeam(teamId, 'team:time_extended', {
    extraMinutes,
    message: `Organizer granted +${extraMinutes} minutes compensation time.`,
  });

  await prisma.auditLog.create({
    data: {
      actorType: 'ADMIN',
      actorId: adminId,
      action: 'EXTEND_TEAM_TIME',
      payload: { teamId, teamCode: team.teamCode, extraMinutes },
    },
  });

  return { success: true, message: `Granted +${extraMinutes} minutes to ${team.teamCode}` };
}
