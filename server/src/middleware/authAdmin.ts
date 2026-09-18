import { Request, Response, NextFunction } from 'express';
import { verifyAdminToken, AdminTokenPayload } from '../services/auth.service';
import { UnauthorizedError } from '../utils/errors';
import { prisma } from '../config/prisma';

declare global {
  namespace Express {
    interface Request {
      admin?: AdminTokenPayload;
    }
  }
}

export async function authAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No authentication token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAdminToken(token);

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, username: true },
    });

    if (!admin) {
      throw new UnauthorizedError('Admin account no longer exists');
    }

    req.admin = decoded;
    next();
  } catch (err) {
    next(err);
  }
}
