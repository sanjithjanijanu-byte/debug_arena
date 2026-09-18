import { PrismaClient, Language, Difficulty, TeamStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { seedRound1Questions } from './seedRound1_20Q';
import { seedMoreRound2And3Questions } from './seedMoreQuestions';
import { seedAllSetsQuestions } from './seedAllSets';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing records in reverse dependency order
  await prisma.submission.deleteMany({});
  await prisma.draft.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.testCase.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.violation.deleteMany({});
  await prisma.disqualificationLog.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.participant.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.round.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.eventSettings.deleteMany({});

  // 2. Seed Default Event Settings
  await prisma.eventSettings.create({
    data: {
      eventStatus: 'NOT_STARTED',
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
  console.log('✅ Event settings seeded');

  // 3. Seed Admin
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.create({
    data: {
      username: adminUsername,
      passwordHash: adminPasswordHash,
    },
  });
  console.log(`✅ Admin seeded: ${admin.username}`);

  // 4. Seed Rounds (2 Rounds: Round 1 MCQ & Round 2 Hard Debugging)
  const round1 = await prisma.round.create({
    data: {
      number: 1,
      name: 'Bug Hunt',
      durationMinutes: 30,
      difficulty: Difficulty.EASY,
      status: 'LOCKED',
    },
  });

  const round2 = await prisma.round.create({
    data: {
      number: 2,
      name: 'Debugging Showdown',
      durationMinutes: 45,
      difficulty: Difficulty.HARD,
      status: 'LOCKED',
    },
  });
  console.log('✅ Rounds 1 and 2 seeded');

  // 5. Seed Teams & Participants
  const defaultTeamPassHash = await bcrypt.hash('team123', 12);
  const sampleTeamsData = [
    { name: 'Team Alpha', code: 'TEAM-1001', participants: [{ name: 'Alice Smith', roll: 'CS202601' }, { name: 'Bob Jones', roll: 'CS202602' }] },
    { name: 'Team Beta', code: 'TEAM-1002', participants: [{ name: 'Charlie Brown', roll: 'CS202603' }, { name: 'Diana Prince', roll: 'CS202604' }] },
    { name: 'Team Gamma', code: 'TEAM-1003', participants: [{ name: 'Evan Wright', roll: 'CS202605' }, { name: 'Fiona Gallagher', roll: 'CS202606' }] },
    { name: 'Team Delta', code: 'TEAM-1004', participants: [{ name: 'George Clark', roll: 'CS202607' }, { name: 'Hannah Abbott', roll: 'CS202608' }] },
    { name: 'Team Epsilon', code: 'TEAM-1005', participants: [{ name: 'Ian Malcolm', roll: 'CS202609' }, { name: 'Julia Roberts', roll: 'CS202610' }] },
  ];

  for (const t of sampleTeamsData) {
    const team = await prisma.team.create({
      data: {
        name: t.name,
        teamCode: t.code,
        passwordHash: defaultTeamPassHash,
        initialPassword: 'team123',
        status: TeamStatus.NOT_LOGGED_IN,
        score: 0,
      },
    });

    for (const p of t.participants) {
      await prisma.participant.create({
        data: {
          name: p.name,
          rollNo: p.roll,
          email: `${p.name.toLowerCase().replace(' ', '.')}@college.edu`,
          phone: '+1 555-0199',
          teamId: team.id,
        },
      });
    }
  }
  console.log(`✅ 5 Demo Teams & 10 Participants seeded (Default password: team123)`);

  // 6. Seed Complete Sets across all rounds (Round 1: 5 Sets x 20 MCQs; Rounds 2 & 3: 7 Sets each)
  await seedAllSetsQuestions();

  console.log('🎉 Complete event sets seeding finished successfully (315 questions across 2 rounds and all languages)!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
