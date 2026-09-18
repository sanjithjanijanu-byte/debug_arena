import { prisma } from '../config/prisma';
import { Language } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export async function seedAllSetsQuestions() {
  console.log('📦 Checking and seeding all sets from complete_event_sets_import.json...');

  const searchPaths = [
    path.resolve(process.cwd(), 'complete_event_sets_import.json'),
    path.resolve(process.cwd(), 'server/complete_event_sets_import.json'),
    path.resolve(process.cwd(), '../complete_event_sets_import.json'),
    path.join(__dirname, 'complete_event_sets_import.json'),
    path.join(__dirname, '../complete_event_sets_import.json'),
    path.join(__dirname, '../../complete_event_sets_import.json'),
    path.join(__dirname, '../../../complete_event_sets_import.json'),
  ];

  let jsonPath = '';
  for (const p of searchPaths) {
    if (fs.existsSync(p)) {
      jsonPath = p;
      break;
    }
  }

  if (!jsonPath) {
    console.error('❌ complete_event_sets_import.json not found in search paths:', searchPaths);
    return;
  }

  console.log(`📄 Found questions file at: ${jsonPath}`);
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const questionsData = JSON.parse(rawData);

  // Ensure Round 1 and Round 2 exist
  let round1 = await prisma.round.findFirst({ where: { number: 1 } });
  if (!round1) {
    round1 = await prisma.round.create({
      data: { number: 1, name: 'Bug Hunt', durationMinutes: 15, difficulty: 'EASY', status: 'LOCKED' },
    });
  } else {
    await prisma.round.update({ where: { id: round1.id }, data: { durationMinutes: 15 } });
  }

  let round2 = await prisma.round.findFirst({ where: { number: 2 } });
  if (!round2) {
    round2 = await prisma.round.create({
      data: { number: 2, name: 'Debugging Showdown', durationMinutes: 30, difficulty: 'HARD', status: 'LOCKED' },
    });
  } else {
    await prisma.round.update({ where: { id: round2.id }, data: { durationMinutes: 30 } });
  }

  const roundMap = new Map<number, string>([
    [1, round1.id],
    [2, round2.id],
  ]);

  // Clean old questions, test cases, and stale assignments
  await prisma.assignment.deleteMany({});
  await prisma.testCase.deleteMany({});
  await prisma.question.deleteMany({});

  let createdCount = 0;
  for (const item of questionsData) {
    const roundId = roundMap.get(item.roundNumber);
    if (!roundId) {
      continue;
    }

    await prisma.question.create({
      data: {
        roundId,
        language: item.language as Language,
        title: item.title,
        statement: item.statement,
        buggyCode: item.buggyCode || '',
        referenceSolution: item.referenceSolution || '',
        points: item.points || (item.roundNumber === 1 ? 10 : 30),
        timeLimitMs: item.timeLimitMs || 2500,
        memoryLimitMb: item.memoryLimitMb || 256,
        isTiebreaker: false,
        testCases: {
          create: (item.testCases || []).map((tc: any) => ({
            stdin: tc.stdin || '',
            expectedStdout: tc.expectedStdout || '',
            isHidden: tc.isHidden ?? false,
            weight: tc.weight ?? 1.0,
          })),
        },
      },
    });
    createdCount++;
  }

  console.log(`✅ Successfully seeded ${createdCount} questions across all sets and rounds!`);
}
