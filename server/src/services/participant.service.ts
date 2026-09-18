import { prisma } from '../config/prisma';
import { BadRequestError, NotFoundError } from '../utils/errors';

export async function getAllParticipants() {
  return prisma.participant.findMany({
    include: {
      team: {
        select: {
          id: true,
          name: true,
          teamCode: true,
          status: true,
        },
      },
    },
    orderBy: { rollNo: 'asc' },
  });
}

export async function createParticipant(data: {
  name: string;
  rollNo: string;
  email?: string;
  phone?: string;
  teamId: string;
}) {
  const existing = await prisma.participant.findUnique({
    where: { rollNo: data.rollNo },
  });

  if (existing) {
    throw new BadRequestError(`Participant with Roll No. ${data.rollNo} is already registered`);
  }

  const team = await prisma.team.findUnique({
    where: { id: data.teamId },
    include: { _count: { select: { participants: true } } },
  });

  if (!team) {
    throw new NotFoundError('Team not found');
  }

  return prisma.participant.create({
    data: {
      name: data.name,
      rollNo: data.rollNo,
      email: data.email,
      phone: data.phone,
      teamId: data.teamId,
    },
    include: {
      team: true,
    },
  });
}

export async function updateParticipant(
  id: string,
  data: {
    name?: string;
    rollNo?: string;
    email?: string;
    phone?: string;
    teamId?: string;
  }
) {
  const participant = await prisma.participant.findUnique({
    where: { id },
    include: { team: true },
  });

  if (!participant) {
    throw new NotFoundError('Participant not found');
  }

  // Check event status if attempting to reassign team
  if (data.teamId && data.teamId !== participant.teamId) {
    const settings = await prisma.eventSettings.findFirst();
    if (settings && settings.eventStatus !== 'NOT_STARTED') {
      throw new BadRequestError('Participants cannot be reassigned to a different team after the event has started');
    }

    const targetTeam = await prisma.team.findUnique({ where: { id: data.teamId } });
    if (!targetTeam) throw new NotFoundError('Target team not found');
  }

  if (data.rollNo && data.rollNo !== participant.rollNo) {
    const duplicate = await prisma.participant.findUnique({ where: { rollNo: data.rollNo } });
    if (duplicate) throw new BadRequestError(`Roll No. ${data.rollNo} is already in use`);
  }

  return prisma.participant.update({
    where: { id },
    data,
    include: { team: true },
  });
}

export async function deleteParticipant(id: string) {
  const participant = await prisma.participant.findUnique({ where: { id } });
  if (!participant) throw new NotFoundError('Participant not found');

  const settings = await prisma.eventSettings.findFirst();
  if (settings && settings.eventStatus !== 'NOT_STARTED') {
    throw new BadRequestError('Cannot remove participants once the event is underway');
  }

  await prisma.participant.delete({ where: { id } });
  return { success: true, message: `Participant ${participant.name} removed successfully` };
}
