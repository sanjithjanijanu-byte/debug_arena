import { prisma } from '../config/prisma';

async function setTiebreakers() {
  const res = await prisma.question.updateMany({
    where: { points: { gte: 30 } },
    data: { isTiebreaker: true },
  });
  console.log(`Designated ${res.count} tie-breaker questions.`);
  await prisma.$disconnect();
}

setTiebreakers();
