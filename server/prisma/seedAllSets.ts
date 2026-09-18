import { PrismaClient, Language, Difficulty } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function seedAllSetsQuestions() {
  console.log('📦 Seeding all sets from complete_event_sets_import.json...');

  let jsonPath = path.join(__dirname, 'complete_event_sets_import.json');
  if (!fs.existsSync(jsonPath)) {
    jsonPath = path.join(__dirname, '../../complete_event_sets_import.json');
  }
  if (!fs.existsSync(jsonPath)) {
    jsonPath = path.join(__dirname, '../complete_event_sets_import.json');
  }

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ complete_event_sets_import.json not found at:', jsonPath);
    return;
  }

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const questionsData = JSON.parse(rawData);

  // Fetch rounds
  const rounds = await prisma.round.findMany();
  const roundMap = new Map<number, string>();
  for (const r of rounds) {
    roundMap.set(r.number, r.id);
  }

  let createdCount = 0;
  for (const item of questionsData) {
    const roundId = roundMap.get(item.roundNumber);
    if (!roundId) {
      console.warn(`Round ${item.roundNumber} not found, skipping question: ${item.title}`);
      continue;
    }

    // Determine difficulty
    const diff = item.roundNumber === 1
      ? Difficulty.EASY
      : item.roundNumber === 2
      ? Difficulty.MEDIUM
      : Difficulty.HARD;

    const created = await prisma.question.create({
      data: {
        roundId,
        language: item.language as Language,
        title: item.title,
        statement: item.statement,
        buggyCode: item.buggyCode || '',
        referenceSolution: item.referenceSolution || '',
        points: item.points || (item.roundNumber === 1 ? 10 : item.roundNumber === 2 ? 20 : 30),
        timeLimitMs: item.timeLimitMs || 2500,
        memoryLimitMb: item.memoryLimitMb || 256,
        difficulty: diff,
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

  console.log(`✅ Seeded ${createdCount} questions across all sets and rounds!`);
}

if (require.main === module) {
  seedAllSetsQuestions()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
