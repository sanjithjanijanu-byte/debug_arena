import { Request, Response, NextFunction } from 'express';
import { verifyParticipantToken, ParticipantTokenPayload } from '../services/auth.service';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { prisma } from '../config/prisma';
import { TeamStatus } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      team?: ParticipantTokenPayload & {
        name: string;
        language: string | null;
        status: TeamStatus;
      };
    }
  }
}

export async function authParticipant(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No participant token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyParticipantToken(token);

    // Fetch team from DB to verify session and status
    const team = await prisma.team.findUnique({
      where: { id: decoded.teamId },
      select: {
        id: true,
        name: true,
        teamCode: true,
        language: true,
        status: true,
        activeSessionId: true,
      },
    });

    if (!team) {
      throw new UnauthorizedError('Team no longer exists');
    }

    // Enforce single active session
    if (team.activeSessionId && team.activeSessionId !== decoded.sessionId) {
      throw new UnauthorizedError(
        'Session terminated: Your team has logged in from another device or browser.'
      );
    }

    // Check if team is disqualified
    if (team.status === 'DISQUALIFIED') {
      throw new ForbiddenError(
        'Your team is currently disqualified. Please contact the event coordinator.'
      );
    }

    req.team = {
      ...decoded,
      name: team.name,
      language: team.language,
      status: team.status,
    };

    next();
  } catch (err) {
    next(err);
  }
}
