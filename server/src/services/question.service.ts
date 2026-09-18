import { prisma } from '../config/prisma';
import { executeCodeAgainstTestCases } from './execution.service';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { Language, Difficulty, Prisma } from '@prisma/client';

export interface CreateQuestionInput {
  roundId: string;
  language: Language;
  title: string;
  statement: string;
  buggyCode: string;
  referenceSolution: string;
  points: number;
  timeLimitMs?: number;
  memoryLimitMb?: number;
  isTiebreaker?: boolean;
  testCases: {
    stdin: string;
    expectedStdout: string;
    isHidden?: boolean;
    weight?: number;
  }[];
}

export async function getAllQuestions(filters?: {
  roundId?: string;
  language?: Language;
  difficulty?: Difficulty;
  isTiebreaker?: boolean;
}) {
  const where: Prisma.QuestionWhereInput = {};

  if (filters?.roundId) where.roundId = filters.roundId;
  if (filters?.language) where.language = filters.language;
  if (filters?.isTiebreaker !== undefined) where.isTiebreaker = filters.isTiebreaker;
  if (filters?.difficulty) {
    where.round = { difficulty: filters.difficulty };
  }

  return prisma.question.findMany({
    where,
    include: {
      round: true,
      testCases: {
        orderBy: { isHidden: 'asc' },
      },
      _count: {
        select: {
          submissions: true,
          assignments: true,
        },
      },
    },
    orderBy: [
      { round: { number: 'asc' } },
      { language: 'asc' },
      { points: 'asc' },
    ],
  });
}

export async function getQuestionById(id: string) {
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      round: true,
      testCases: {
        orderBy: { isHidden: 'asc' },
      },
      _count: {
        select: {
          submissions: true,
        },
      },
    },
  });

  if (!question) {
    throw new NotFoundError('Question not found');
  }

  return question;
}

export async function createQuestion(data: CreateQuestionInput) {
  if (!data.testCases || data.testCases.length === 0) {
    throw new BadRequestError('A question must have at least one test case.');
  }

  const round = await prisma.round.findUnique({
    where: { id: data.roundId },
  });

  if (!round) {
    throw new NotFoundError('Target competition round not found.');
  }

  return prisma.question.create({
    data: {
      roundId: data.roundId,
      language: data.language,
      title: data.title,
      statement: data.statement,
      buggyCode: data.buggyCode,
      referenceSolution: data.referenceSolution,
      points: data.points,
      timeLimitMs: data.timeLimitMs || 5000,
      memoryLimitMb: data.memoryLimitMb || 256,
      isTiebreaker: data.isTiebreaker || false,
      testCases: {
        create: data.testCases.map((tc) => ({
          stdin: tc.stdin || '',
          expectedStdout: tc.expectedStdout || '',
          isHidden: tc.isHidden || false,
          weight: tc.weight || 1.0,
        })),
      },
    },
    include: {
      round: true,
      testCases: true,
    },
  });
}

export async function updateQuestion(id: string, data: Partial<CreateQuestionInput>) {
  const existing = await prisma.question.findUnique({
    where: { id },
    include: { testCases: true },
  });

  if (!existing) {
    throw new NotFoundError('Question not found');
  }

  // If new testCases are provided, delete old and recreate
  const updateData: Prisma.QuestionUpdateInput = {
    title: data.title,
    statement: data.statement,
    buggyCode: data.buggyCode,
    referenceSolution: data.referenceSolution,
    points: data.points,
    timeLimitMs: data.timeLimitMs,
    memoryLimitMb: data.memoryLimitMb,
    isTiebreaker: data.isTiebreaker,
  };

  if (data.roundId) {
    updateData.round = { connect: { id: data.roundId } };
  }
  if (data.language) {
    updateData.language = data.language;
  }

  if (data.testCases) {
    await prisma.testCase.deleteMany({ where: { questionId: id } });
    updateData.testCases = {
      create: data.testCases.map((tc) => ({
        stdin: tc.stdin || '',
        expectedStdout: tc.expectedStdout || '',
        isHidden: tc.isHidden || false,
        weight: tc.weight || 1.0,
      })),
    };
  }

  return prisma.question.update({
    where: { id },
    data: updateData,
    include: {
      round: true,
      testCases: true,
    },
  });
}

export async function deleteQuestion(id: string) {
  const existing = await prisma.question.findUnique({
    where: { id },
    include: { _count: { select: { submissions: true } } },
  });

  if (!existing) throw new NotFoundError('Question not found');

  if (existing._count.submissions > 0) {
    throw new BadRequestError('Cannot delete a question that already has participant submissions.');
  }

  await prisma.question.delete({ where: { id } });
  return { success: true, message: `Question "${existing.title}" deleted successfully.` };
}

/**
 * Validate Question Action:
 * Runs the reference solution against all test cases to verify that
 * its own solution passes before participants receive it.
 */
export async function validateQuestionSolution(questionId: string) {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      testCases: {
        orderBy: { isHidden: 'asc' },
      },
    },
  });

  if (!question) {
    throw new NotFoundError('Question not found');
  }

  if (!question.referenceSolution) {
    throw new BadRequestError('No reference solution defined for this question.');
  }

  if (question.testCases.length === 0) {
    throw new BadRequestError('Question has no test cases to validate against.');
  }

  // Execute reference solution
  const startTime = Date.now();
  const execution = await executeCodeAgainstTestCases(
    question.referenceSolution,
    question.language,
    question.testCases.map((tc) => ({
      id: tc.id,
      stdin: tc.stdin,
      expectedStdout: tc.expectedStdout,
      weight: tc.weight,
      isHidden: tc.isHidden,
    })),
    question.timeLimitMs,
    question.memoryLimitMb
  );
  const totalDurationMs = Date.now() - startTime;

  return {
    success: true,
    questionId: question.id,
    title: question.title,
    language: question.language,
    allPassed: execution.allPassed,
    testsPassed: execution.testsPassed,
    testsTotal: execution.testsTotal,
    totalDurationMs,
    compileError: execution.compileError,
    testResults: execution.results,
  };
}

/**
 * Bulk JSON import for questions
 */
export async function importQuestionsFromJSON(questionsList: any[]) {
  const rounds = await prisma.round.findMany();
  const roundMapByNumber = new Map<number, string>();
  rounds.forEach((r) => roundMapByNumber.set(r.number, r.id));

  const imported: any[] = [];

  for (const item of questionsList) {
    const roundNumber = item.roundNumber || item.round || 1;
    const roundId = roundMapByNumber.get(roundNumber) || rounds[0].id;

    const language: Language = item.language ? item.language.toUpperCase() : 'PYTHON';

    const q = await createQuestion({
      roundId,
      language,
      title: item.title,
      statement: item.statement || item.description || '',
      buggyCode: item.buggyCode || item.starterCode || '',
      referenceSolution: item.referenceSolution || item.solution || '',
      points: item.points || (roundNumber === 1 ? 10 : roundNumber === 2 ? 20 : 32.5),
      timeLimitMs: item.timeLimitMs || 5000,
      memoryLimitMb: item.memoryLimitMb || 256,
      isTiebreaker: Boolean(item.isTiebreaker),
      testCases: item.testCases || [
        { stdin: item.stdin || '', expectedStdout: item.expectedStdout || '', isHidden: false, weight: 1.0 },
      ],
    });

    imported.push(q);
  }

  return {
    success: true,
    count: imported.length,
    questions: imported,
  };
}
