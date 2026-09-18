import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateRequest } from '../../middleware/validateRequest';
import { prisma } from '../../config/prisma';
import { verifyPassword, generateAdminToken } from '../../services/auth.service';
import { UnauthorizedError } from '../../utils/errors';
import { authAdmin } from '../../middleware/authAdmin';

const router = Router();

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// POST /api/admin/login
router.post(
  '/login',
  validateRequest(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const admin = await prisma.admin.findUnique({
        where: { username },
      });

      if (!admin) {
        throw new UnauthorizedError('Invalid admin username or password');
      }

      const isPasswordValid = await verifyPassword(password, admin.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid admin username or password');
      }

      const token = generateAdminToken({
        adminId: admin.id,
        username: admin.username,
      });

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorType: 'ADMIN',
          actorId: admin.id,
          action: 'ADMIN_LOGIN',
          payload: { username: admin.username },
        },
      });

      res.json({
        success: true,
        message: 'Admin authentication successful',
        token,
        admin: {
          id: admin.id,
          username: admin.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/admin/me
router.get('/me', authAdmin, async (req: Request, res: Response) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

export default router;
