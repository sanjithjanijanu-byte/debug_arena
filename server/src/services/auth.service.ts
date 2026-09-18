import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

export interface AdminTokenPayload {
  adminId: string;
  username: string;
  role: 'admin';
}

export interface ParticipantTokenPayload {
  teamId: string;
  teamCode: string;
  sessionId: string;
  role: 'participant';
}

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 12);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

export function generateAdminToken(payload: Omit<AdminTokenPayload, 'role'>): string {
  return jwt.sign(
    { ...payload, role: 'admin' },
    env.JWT_ADMIN_SECRET,
    {
      audience: 'admin',
      expiresIn: '24h',
      issuer: 'debugging-event-platform',
    }
  );
}

export function generateParticipantToken(payload: Omit<ParticipantTokenPayload, 'role'>): string {
  return jwt.sign(
    { ...payload, role: 'participant' },
    env.JWT_PARTICIPANT_SECRET,
    {
      audience: 'participant',
      expiresIn: '8h',
      issuer: 'debugging-event-platform',
    }
  );
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_ADMIN_SECRET, {
      audience: 'admin',
      issuer: 'debugging-event-platform',
    }) as AdminTokenPayload;

    if (decoded.role !== 'admin') {
      throw new ForbiddenError('Access forbidden: Admin credentials required');
    }
    return decoded;
  } catch (err: any) {
    if (err instanceof ForbiddenError) throw err;
    throw new UnauthorizedError('Invalid or expired admin session token');
  }
}

export function verifyParticipantToken(token: string): ParticipantTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_PARTICIPANT_SECRET, {
      audience: 'participant',
      issuer: 'debugging-event-platform',
    }) as ParticipantTokenPayload;

    if (decoded.role !== 'participant') {
      throw new ForbiddenError('Access forbidden: Participant credentials required');
    }
    return decoded;
  } catch (err: any) {
    if (err instanceof ForbiddenError) throw err;
    throw new UnauthorizedError('Invalid or expired participant session token');
  }
}
