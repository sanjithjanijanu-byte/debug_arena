import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import { validateRequest } from '../../middleware/validateRequest';
import * as participantService from '../../services/participant.service';

const router = Router();
router.use(authAdmin);

const createParticipantSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    rollNo: z.string().min(2, 'Roll No is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
    teamId: z.string().uuid('Valid team ID is required'),
  }),
});

const updateParticipantSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    rollNo: z.string().min(2).optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    teamId: z.string().uuid().optional(),
  }),
});

// GET /api/admin/participants
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const participants = await participantService.getAllParticipants();
    res.json({ success: true, participants });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/participants
router.post(
  '/',
  validateRequest(createParticipantSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const participant = await participantService.createParticipant(req.body);
      res.status(201).json({
        success: true,
        message: 'Participant added successfully',
        participant,
      });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/admin/participants/:id
router.put(
  '/:id',
  validateRequest(updateParticipantSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await participantService.updateParticipant(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Participant updated successfully',
        participant: updated,
      });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/admin/participants/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await participantService.deleteParticipant(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
