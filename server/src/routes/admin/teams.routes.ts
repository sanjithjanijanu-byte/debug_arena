import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import { validateRequest } from '../../middleware/validateRequest';
import * as teamService from '../../services/team.service';
import { BadRequestError } from '../../utils/errors';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Protect all routes with authAdmin
router.use(authAdmin);

const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Team name must be at least 2 characters'),
    password: z.string().min(4, 'Password must be at least 4 characters').optional(),
  }),
});

const updateTeamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    resetPassword: z.boolean().optional(),
    newPassword: z.string().min(4).optional(),
  }),
});

// GET /api/admin/teams
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await teamService.getAllTeams();
    res.json({ success: true, teams });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/teams/export/credentials
router.get('/export/credentials', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const csvContent = await teamService.exportCredentialsCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="teams-credentials.csv"');
    res.send(csvContent);
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/teams/export/credentials/pdf
router.get('/export/credentials/pdf', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="teams-credentials.pdf"');
    await teamService.exportCredentialsPDF(res);
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/teams/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await teamService.getTeamById(req.params.id);
    res.json({ success: true, team });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/teams
router.post(
  '/',
  validateRequest(createTeamSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTeam = await teamService.createTeam(req.body);
      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        team: newTeam,
      });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/admin/teams/:id
router.put(
  '/:id',
  validateRequest(updateTeamSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await teamService.updateTeam(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Team updated successfully',
        team: updated,
      });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/admin/teams/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await teamService.deleteTeam(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/teams/import
router.post(
  '/import',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new BadRequestError('Please provide a CSV file to import');
      }

      const result = await teamService.importTeamsFromCSV(req.file.buffer);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
