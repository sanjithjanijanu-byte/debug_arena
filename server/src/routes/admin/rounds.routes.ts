import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import * as roundService from '../../services/round.service';

const router = Router();
router.use(authAdmin);

// GET /api/admin/rounds
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roundService.getEventAndRounds();
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/:id/start
router.post('/:id/start', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const round = await roundService.startRound(req.params.id);
    res.json({
      success: true,
      message: `Round ${round.number} started successfully`,
      round,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/:id/end
router.post('/:id/end', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const round = await roundService.endRound(req.params.id);
    res.json({
      success: true,
      message: `Round ${round.number} ended successfully`,
      round,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/:id/extend
router.post('/:id/extend', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const minutes = Number(req.body.additionalMinutes) || 5;
    const round = await roundService.extendRound(req.params.id, minutes);
    res.json({
      success: true,
      message: `Round ${round.number} extended by ${minutes} minutes`,
      round,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/event/start
router.post('/event/start', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await roundService.startEvent();
    res.json({ success: true, message: 'Event started', eventSettings: settings });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/event/pause
router.post('/event/pause', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reason } = req.body;
    const settings = await roundService.pauseEvent(reason);
    res.json({ success: true, message: 'Event paused', eventSettings: settings });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/event/resume
router.post('/event/resume', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await roundService.resumeEvent();
    res.json({ success: true, message: 'Event resumed', eventSettings: settings });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/event/end
router.post('/event/end', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await roundService.endEvent();
    res.json({ success: true, message: 'Event concluded', eventSettings: settings });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/rounds/event/reset
router.post('/event/reset', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await roundService.resetEvent();
    res.json({ success: true, message: 'Event reset successfully', eventSettings: settings });
  } catch (err) {
    next(err);
  }
});

export default router;
