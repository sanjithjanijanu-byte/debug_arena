export type Language = 'CPP' | 'JAVA' | 'PYTHON';

export type TeamStatus =
  | 'NOT_LOGGED_IN'
  | 'ACTIVE'
  | 'IDLE'
  | 'SUBMITTED'
  | 'DISQUALIFIED'
  | 'REINSTATED';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type RoundStatus = 'LOCKED' | 'ACTIVE' | 'ENDED';

export type Verdict =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'QUEUED'
  | 'RUNNING';

export interface Participant {
  id: string;
  name: string;
  rollNo: string;
  email?: string | null;
  phone?: string | null;
  teamId: string;
  createdAt: string;
  team?: {
    id: string;
    name: string;
    teamCode: string;
    status: TeamStatus;
  };
}

export interface Team {
  id: string;
  name: string;
  teamCode: string;
  initialPassword?: string | null;
  language: Language | null;
  languageLockedAt: string | null;
  status: TeamStatus;
  score: number;
  disqualifiedAt: string | null;
  reinstatedAt: string | null;
  createdAt: string;
  participants: Participant[];
  _count?: {
    submissions: number;
    violations: number;
  };
}

export interface Admin {
  id: string;
  username: string;
}

export interface Round {
  id: string;
  number: number;
  name: string;
  durationMinutes: number;
  difficulty: Difficulty;
  status: RoundStatus;
  startedAt: string | null;
  endsAt: string | null;
}

export interface TestCase {
  id: string;
  stdin: string;
  expectedStdout: string;
  isHidden: boolean;
  weight: number;
}

export interface Question {
  id: string;
  roundId: string;
  language: Language;
  title: string;
  statement: string;
  buggyCode: string;
  referenceSolution?: string;
  points: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  isTiebreaker: boolean;
  testCases?: TestCase[];
}
