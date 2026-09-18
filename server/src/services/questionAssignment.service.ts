import { prisma } from '../config/prisma';
import { Language } from '@prisma/client';

export interface SetAssignmentResult {
  teamId: string;
  teamCode: string;
  language: Language;
  setIndex: number;
  numSets: number;
  questionIds: string[];
}

/**
 * Computes a deterministic set index (0 to numSets - 1) for a given team.
 * Prioritizes numbers in teamCode (e.g. TEAM-1001 -> 1001 % numSets),
 * falling back to a stable hash of the team ID / code.
 */
export function getTeamSetIndex(
  team: { id: string; teamCode?: string | null },
  numSets: number
): number {
  if (numSets <= 1) return 0;

  // 1. If teamCode contains numbers (e.g. TEAM-1001, TEAM-1002, CS202601)
  if (team.teamCode) {
    const digitsMatch = team.teamCode.match(/(\d+)/g);
    if (digitsMatch && digitsMatch.length > 0) {
      const lastDigits = digitsMatch[digitsMatch.length - 1];
      const parsed = parseInt(lastDigits, 10);
      if (!isNaN(parsed)) {
        return parsed % numSets;
      }
    }
  }

  // 2. Stable DJB2 hash of team ID
  const key = team.id || team.teamCode || 'default';
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) + hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % numSets;
}

/**
 * Partitions available questions for a round and language into discrete sets
 * and assigns the selected set to the team.
 */
export async function assignQuestionsForTeam(
  teamId: string,
  roundId: string,
  language: Language
): Promise<string[]> {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { id: true, teamCode: true, name: true },
  });

  if (!team) {
    throw new Error(`Team not found: ${teamId}`);
  }

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    select: { id: true, number: true },
  });

  if (!round) {
    throw new Error(`Round not found: ${roundId}`);
  }

  // Fetch all candidate questions for this round and language (exclude tiebreakers)
  const availableQuestions = await prisma.question.findMany({
    where: {
      roundId,
      language,
      isTiebreaker: false,
    },
    select: { id: true, points: true, createdAt: true },
    orderBy: [
      { points: 'asc' },
      { createdAt: 'asc' },
      { id: 'asc' },
    ],
  });

  if (availableQuestions.length === 0) {
    return [];
  }

  // Determine target questions per team and number of sets
  // Round 1 (MCQ): typically 4 or 5 questions per set
  // Round 2/3 (Coding): typically 2 or 4 questions per set depending on pool size
  let targetPerTeam = 4;
  if (round.number === 1) {
    targetPerTeam = availableQuestions.length >= 20 ? 4 : (availableQuestions.length >= 10 ? 5 : availableQuestions.length);
  } else {
    // Round 2 or Round 3
    if (availableQuestions.length >= 8) {
      targetPerTeam = 4;
    } else if (availableQuestions.length >= 4) {
      targetPerTeam = 2;
    } else {
      targetPerTeam = availableQuestions.length;
    }
  }

  const numSets = Math.max(1, Math.floor(availableQuestions.length / targetPerTeam));
  const setIndex = getTeamSetIndex(team, numSets);

  // Chunked partition: Set 0 gets [0..target-1], Set 1 gets [target..2*target-1], etc.
  const startIndex = setIndex * targetPerTeam;
  let selected = availableQuestions.slice(startIndex, startIndex + targetPerTeam);

  // Fallback in case chunk is empty
  if (selected.length === 0) {
    selected = availableQuestions.slice(0, targetPerTeam);
  }

  const questionIds = selected.map((q) => q.id);

  // Persist assignments in database
  const assignmentsData = questionIds.map((qId) => ({
    teamId: team.id,
    questionId: qId,
  }));

  if (assignmentsData.length > 0) {
    await prisma.assignment.createMany({
      data: assignmentsData,
      skipDuplicates: true,
    });
  }

  return questionIds;
}

/**
 * Returns existing assigned question IDs for a team in a round.
 * If no assignments exist yet, generates and persists a distinct set.
 */
export async function ensureTeamQuestionAssignments(
  teamId: string,
  roundId: string,
  language: Language
): Promise<string[]> {
  const existing = await prisma.assignment.findMany({
    where: {
      teamId,
      question: {
        roundId,
        language,
      },
    },
    select: { questionId: true },
  });

  if (existing.length > 0) {
    return existing.map((a) => a.questionId);
  }

  // No assignments exist yet: assign distinct set now
  return await assignQuestionsForTeam(teamId, roundId, language);
}

/**
 * Assigns distinct question sets to all enrolled teams for an active round.
 * Used when starting a round.
 */
export async function assignQuestionsForRound(roundId: string): Promise<void> {
  const teams = await prisma.team.findMany({
    where: { language: { not: null } },
    select: { id: true, language: true, teamCode: true },
  });

  for (const team of teams) {
    if (!team.language) continue;
    await ensureTeamQuestionAssignments(team.id, roundId, team.language as Language);
  }
}

/**
 * Re-partitions and re-assigns distinct question sets for all teams in a round.
 * Useful when an organizer updates the question bank or resets round assignments.
 */
export async function reassignAllTeamSetsForRound(roundId: string): Promise<void> {
  const questionIdsInRound = (
    await prisma.question.findMany({
      where: { roundId },
      select: { id: true },
    })
  ).map((q) => q.id);

  // Remove existing assignments for this round
  await prisma.assignment.deleteMany({
    where: {
      questionId: { in: questionIdsInRound },
    },
  });

  // Re-assign distinct sets
  await assignQuestionsForRound(roundId);
}

/**
 * Deterministic pseudo-random number generator based on FNV-1a and Mulberry32.
 */
export function createSeededRng(seedStr: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  let state = h;
  return function () {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministically shuffles an array using Fisher-Yates with a seeded RNG.
 */
export function shuffleArray<T>(array: T[], seedStr: string): T[] {
  const arr = [...array];
  const rng = createSeededRng(seedStr);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface ShuffledMcq {
  shuffledOptions: { [key: string]: string };
  displayToOriginalMap: { [displayKey: string]: string };
  originalToDisplayMap: { [origKey: string]: string };
}

/**
 * Shuffles MCQ options (A, B, C, D) deterministically for a specific team.
 */
export function getShuffledMcqOptions(
  teamId: string,
  questionId: string,
  originalOptions: { [key: string]: string }
): ShuffledMcq {
  const origKeys = Object.keys(originalOptions).sort(); // e.g. ['A', 'B', 'C', 'D']
  if (origKeys.length <= 1) {
    const idMap = origKeys.reduce((acc, k) => ({ ...acc, [k]: k }), {} as { [k: string]: string });
    return {
      shuffledOptions: originalOptions,
      displayToOriginalMap: idMap,
      originalToDisplayMap: idMap,
    };
  }

  const seed = `${teamId}_q_${questionId}_options_v2`;
  const shuffledOrigKeys = shuffleArray(origKeys, seed);

  const displayToOriginalMap: { [displayKey: string]: string } = {};
  const originalToDisplayMap: { [origKey: string]: string } = {};
  const shuffledOptions: { [displayKey: string]: string } = {};

  origKeys.forEach((displayKey, idx) => {
    const origKey = shuffledOrigKeys[idx];
    displayToOriginalMap[displayKey] = origKey;
    originalToDisplayMap[origKey] = displayKey;
    shuffledOptions[displayKey] = originalOptions[origKey];
  });

  return {
    shuffledOptions,
    displayToOriginalMap,
    originalToDisplayMap,
  };
}

/**
 * Maps a team's submitted display option (e.g. 'C') back to the original option key (e.g. 'A')
 * so that evaluation against referenceSolution is 100% accurate.
 */
export function resolveOriginalMcqAnswer(
  teamId: string,
  questionId: string,
  statementJson: string,
  submittedDisplayKey: string
): string {
  const cleanSubmitted = (submittedDisplayKey || '').trim().toUpperCase();
  try {
    if (statementJson && statementJson.trim().startsWith('{')) {
      const parsed = JSON.parse(statementJson);
      if (parsed.options) {
        const { displayToOriginalMap } = getShuffledMcqOptions(teamId, questionId, parsed.options);
        return displayToOriginalMap[cleanSubmitted] || cleanSubmitted;
      }
    }
  } catch (e) {}
  return cleanSubmitted;
}

