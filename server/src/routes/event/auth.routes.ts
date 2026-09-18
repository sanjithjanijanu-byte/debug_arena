import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { validateRequest } from '../../middleware/validateRequest';
import { prisma } from '../../config/prisma';
import { verifyPassword, generateParticipantToken } from '../../services/auth.service';
import { UnauthorizedError, ForbiddenError } from '../../utils/errors';
import { authParticipant } from '../../middleware/authParticipant';

const router = Router();

const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, 'Team Code or Roll No. is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// POST /api/event/login
router.post(
  '/login',
  validateRequest(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { identifier, password } = req.body;
      const cleanIdentifier = identifier.trim();

      // Look up team by teamCode or through participant rollNo
      let team = await prisma.team.findFirst({
        where: {
          OR: [
            { teamCode: { equals: cleanIdentifier, mode: 'insensitive' } },
            {
              participants: {
                some: { rollNo: { equals: cleanIdentifier, mode: 'insensitive' } },
              },
            },
          ],
        },
        include: {
          participants: true,
        },
      });

      if (!team) {
        throw new UnauthorizedError('Invalid Team Code / Roll No. or password');
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, team.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid Team Code / Roll No. or password');
      }

      // Check if team is disqualified
      if (team.status === 'DISQUALIFIED') {
        throw new ForbiddenError(
          'Your team is currently disqualified. Please contact the event coordinator.'
        );
      }

      // Dual login / concurrent session policy
      const settings = await prisma.eventSettings.findFirst();
      const allowDual = settings?.dualLoginEnabled ?? true;

      if (!allowDual && team.activeSessionId) {
        // Log violation for secondary login attempt when single-session enforcement is active
        await prisma.violation.create({
          data: {
            teamId: team.id,
            type: 'DUAL_LOGIN_ATTEMPT',
            details: `Team logged in from a new session while prior session was active. Old session was terminated.`,
          },
        });
      }

      // If dual login is allowed, reuse existing activeSessionId so concurrent teammates remain authenticated
      const newSessionId = (allowDual && team.activeSessionId) ? team.activeSessionId : uuidv4();

      await prisma.team.update({
        where: { id: team.id },
        data: {
          activeSessionId: newSessionId,
          status: team.status === 'NOT_LOGGED_IN' ? 'ACTIVE' : team.status,
        },
      });

      const token = generateParticipantToken({
        teamId: team.id,
        teamCode: team.teamCode,
        sessionId: newSessionId,
      });

      res.json({
        success: true,
        message: 'Participant login successful',
        token,
        team: {
          id: team.id,
          name: team.name,
          teamCode: team.teamCode,
          language: team.language,
          languageLockedAt: team.languageLockedAt,
          status: team.status === 'NOT_LOGGED_IN' ? 'ACTIVE' : team.status,
          score: team.score,
          participants: team.participants.map((p) => ({
            id: p.id,
            name: p.name,
            rollNo: p.rollNo,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/event/me
router.get('/me', authParticipant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.team!.teamId },
      include: {
        participants: true,
      },
    });

    if (!team) {
      throw new UnauthorizedError('Team not found');
    }

    const activeRound = await prisma.round.findFirst({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        number: true,
        name: true,
        durationMinutes: true,
        startedAt: true,
        endsAt: true,
        status: true,
      },
    });

    const settings = await prisma.eventSettings.findFirst();

    res.json({
      success: true,
      team: {
        id: team.id,
        name: team.name,
        teamCode: team.teamCode,
        language: team.language,
        languageLockedAt: team.languageLockedAt,
        status: team.status,
        score: team.score,
        participants: team.participants,
      },
      activeRound,
      eventStatus: settings?.eventStatus || 'NOT_STARTED',
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/event/logout
router.post('/logout', authParticipant, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.team.update({
      where: { id: req.team!.teamId },
      data: {
        activeSessionId: null,
        status: req.team!.status === 'ACTIVE' ? 'IDLE' : req.team!.status,
      },
    });

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
