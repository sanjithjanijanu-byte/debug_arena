import { prisma } from '../config/prisma';
import { hashPassword } from './auth.service';
import { generateTeamCode, generatePassword } from '../utils/codeGenerator';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import PDFDocument from 'pdfkit';
import { Response } from 'express';

export async function getAllTeams() {
  return prisma.team.findMany({
    include: {
      participants: true,
      _count: {
        select: {
          submissions: true,
          violations: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
}

export async function getTeamById(id: string) {
  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      participants: true,
      violations: {
        take: 5,
        orderBy: { occurredAt: 'desc' },
      },
      submissions: {
        orderBy: { submittedAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!team) {
    throw new NotFoundError('Team not found');
  }

  return team;
}

export async function createTeam(data: { name: string; password?: string }) {
  const existingTeam = await prisma.team.findUnique({
    where: { name: data.name },
  });

  if (existingTeam) {
    throw new BadRequestError(`A team with the name "${data.name}" already exists`);
  }

  const teamCount = await prisma.team.count();
  const teamCode = generateTeamCode(teamCount);
  const plainPassword = data.password || generatePassword(8);
  const passwordHash = await hashPassword(plainPassword);

  const team = await prisma.team.create({
    data: {
      name: data.name,
      teamCode,
      passwordHash,
      initialPassword: plainPassword,
    },
    include: {
      participants: true,
    },
  });

  return {
    ...team,
    generatedPassword: plainPassword,
  };
}

export async function updateTeam(id: string, data: { name?: string; resetPassword?: boolean; newPassword?: string }) {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) throw new NotFoundError('Team not found');

  const updatePayload: any = {};
  let generatedPassword: string | undefined;

  if (data.name && data.name !== team.name) {
    const existing = await prisma.team.findUnique({ where: { name: data.name } });
    if (existing) throw new BadRequestError(`Team name "${data.name}" is already taken`);
    updatePayload.name = data.name;
  }

  if (data.resetPassword) {
    generatedPassword = data.newPassword || generatePassword(8);
    updatePayload.passwordHash = await hashPassword(generatedPassword);
    updatePayload.initialPassword = generatedPassword;
    // Invalidate active session so team must re-login with new password
    updatePayload.activeSessionId = null;
  }

  const updated = await prisma.team.update({
    where: { id },
    data: updatePayload,
    include: { participants: true },
  });

  return {
    ...updated,
    generatedPassword,
  };
}

export async function deleteTeam(id: string) {
  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      _count: { select: { submissions: true } },
    },
  });

  if (!team) throw new NotFoundError('Team not found');

  if (team._count.submissions > 0) {
    throw new BadRequestError('Cannot delete team with active or past round submissions');
  }

  await prisma.team.delete({ where: { id } });
  return { success: true, message: `Team ${team.name} deleted successfully` };
}

export async function importTeamsFromCSV(fileBuffer: Buffer) {
  const records = parse(fileBuffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const importedTeams: any[] = [];
  let teamCount = await prisma.team.count();

  for (const row of records) {
    const teamName = row.teamName || row['Team Name'] || row.team_name;
    if (!teamName) continue;

    // Check if team already exists
    let team = await prisma.team.findUnique({ where: { name: teamName } });
    let plainPassword = row.password || row.Password || generatePassword(8);

    if (!team) {
      teamCount++;
      const teamCode = row.teamCode || row['Team Code'] || generateTeamCode(teamCount);
      const passwordHash = await hashPassword(plainPassword);

      team = await prisma.team.create({
        data: {
          name: teamName,
          teamCode,
          passwordHash,
          initialPassword: plainPassword,
        },
      });
    }

    // Process participants (supports up to 4 participants in columns: participant1Name, participant1Roll, ...)
    for (let i = 1; i <= 4; i++) {
      const pName = row[`participant${i}Name`] || row[`Participant ${i} Name`];
      const pRoll = row[`participant${i}Roll`] || row[`Participant ${i} Roll`];
      const pEmail = row[`participant${i}Email`] || row[`Participant ${i} Email`];
      const pPhone = row[`participant${i}Phone`] || row[`Participant ${i} Phone`];

      if (pName && pRoll) {
        // Upsert participant by rollNo
        await prisma.participant.upsert({
          where: { rollNo: pRoll },
          update: {
            name: pName,
            email: pEmail || undefined,
            phone: pPhone || undefined,
            teamId: team.id,
          },
          create: {
            name: pName,
            rollNo: pRoll,
            email: pEmail || undefined,
            phone: pPhone || undefined,
            teamId: team.id,
          },
        });
      }
    }

    importedTeams.push({
      teamId: team.id,
      teamName: team.name,
      teamCode: team.teamCode,
      initialPassword: plainPassword,
    });
  }

  return {
    success: true,
    count: importedTeams.length,
    teams: importedTeams,
  };
}

export async function exportCredentialsCSV(): Promise<string> {
  const teams = await prisma.team.findMany({
    include: { participants: true },
    orderBy: { name: 'asc' },
  });

  const rows = teams.map((team) => ({
    'Team Name': team.name,
    'Team Code': team.teamCode,
    'Password': team.initialPassword || '[Encrypted/Custom]',
    'Status': team.status,
    'Participants': team.participants.map((p) => `${p.name} (${p.rollNo})`).join(', '),
  }));

  return stringify(rows, { header: true });
}

export async function exportCredentialsPDF(res: Response): Promise<void> {
  const teams = await prisma.team.findMany({
    include: { participants: true },
    orderBy: { name: 'asc' },
  });

  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  doc.pipe(res);

  // Header
  doc.fontSize(20).font('Helvetica-Bold').text('Debugging Competition — Team Credentials', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica').fillColor('#555555').text(`Generated on ${new Date().toLocaleString()} | Total Teams: ${teams.length}`, { align: 'center' });
  doc.moveDown(1.5);

  doc.fillColor('#000000');

  // Print credential cards in 2-column or grid style
  teams.forEach((team, index) => {
    if (doc.y > 700) {
      doc.addPage();
    }

    doc.rect(30, doc.y, 535, 75).fillAndStroke('#f9fafb', '#d1d5db');
    doc.fillColor('#111827').font('Helvetica-Bold').fontSize(14).text(team.name, 45, doc.y - 65);
    
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#4b5563').text('Team Code:', 45, doc.y + 4);
    doc.font('Courier-Bold').fontSize(11).fillColor('#1d4ed8').text(team.teamCode, 115, doc.y - 12);

    doc.font('Helvetica-Bold').fontSize(10).fillColor('#4b5563').text('Password:', 250, doc.y - 12);
    doc.font('Courier-Bold').fontSize(11).fillColor('#b91c1c').text(team.initialPassword || '********', 315, doc.y - 12);

    const members = team.participants.map((p) => `${p.name} (${p.rollNo})`).join(' | ') || 'No participants registered';
    doc.font('Helvetica').fontSize(9).fillColor('#6b7280').text(`Members: ${members}`, 45, doc.y + 6);

    doc.y += 20;
    doc.moveDown(0.8);
  });

  doc.end();
}
