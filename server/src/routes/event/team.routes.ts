import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authParticipant } from '../../middleware/authParticipant';
import { validateRequest } from '../../middleware/validateRequest';
import { prisma } from '../../config/prisma';
import { BadRequestError, NotFoundError } from '../../utils/errors';
import { Language } from '@prisma/client';
import { ensureTeamQuestionAssignments } from '../../services/questionAssignment.service';

const router = Router();
router.use(authParticipant);

const selectLanguageSchema = z.object({
  body: z.object({
    language: z.enum(['CPP', 'JAVA', 'PYTHON']),
  }),
});

// PUT /api/event/team/language
router.put(
  '/language',
  validateRequest(selectLanguageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamId = req.team!.teamId;
      const { language } = req.body as { language: Language };

      const team = await prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!team) {
        throw new NotFoundError('Team not found');
      }

      if (team.languageLockedAt) {
        throw new BadRequestError(
          `Language is already locked to ${team.language} and cannot be modified.`
        );
      }

      const updated = await prisma.team.update({
        where: { id: teamId },
        data: {
          language,
          languageLockedAt: new Date(),
        },
      });

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorType: 'SYSTEM',
          action: 'LANGUAGE_LOCKED',
          payload: { teamId, language },
        },
      });

      // If a round is currently active, assign this team their distinct question set immediately
      const activeRound = await prisma.round.findFirst({
        where: { status: 'ACTIVE' },
      });
      if (activeRound) {
        await ensureTeamQuestionAssignments(teamId, activeRound.id, language);
      }

      res.json({
        success: true,
        message: `Language successfully locked to ${language}`,
        team: {
          id: updated.id,
          name: updated.name,
          teamCode: updated.teamCode,
          language: updated.language,
          languageLockedAt: updated.languageLockedAt,
          status: updated.status,
          score: updated.score,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/event/team/status
router.get('/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamId = req.team!.teamId;
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        participants: true,
      },
    });

    if (!team) throw new NotFoundError('Team not found');

    const activeRound = await prisma.round.findFirst({
      where: { status: 'ACTIVE' },
    });

    const upcomingRound = activeRound || (await prisma.round.findFirst({
      where: { status: { in: ['LOCKED', 'ACTIVE'] } },
      orderBy: { number: 'asc' },
    })) || (await prisma.round.findFirst({
      orderBy: { number: 'asc' },
    }));

    const settings = await prisma.eventSettings.findFirst();

    res.json({
      success: true,
      team,
      activeRound,
      upcomingRound,
      eventStatus: settings?.eventStatus || 'NOT_STARTED',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
