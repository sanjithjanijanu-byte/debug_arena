import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import * as proctoringService from '../../services/proctoring.service';

const router = Router();
router.use(authAdmin);

// GET /api/admin/proctoring/teams
router.get('/teams', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await proctoringService.getLiveTeams();
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/proctoring/teams/:id/code
router.get('/teams/:id/code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await proctoringService.getTeamLiveCode(req.params.id);
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/proctoring/teams/:id/warning
router.post('/teams/:id/warning', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Warning message cannot be empty' } });
    }

    const adminId = req.admin!.adminId;
    const result = await proctoringService.sendWarningMessage(req.params.id, message, adminId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/proctoring/teams/:id/disqualify
router.post('/teams/:id/disqualify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reason } = req.body;
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Disqualification reason is required' } });
    }

    const adminId = req.admin!.adminId;
    const team = await proctoringService.disqualifyTeam(req.params.id, reason, adminId);
    res.json({ success: true, message: `Team ${team.teamCode} disqualified`, team });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/proctoring/teams/:id/reinstate
router.post('/teams/:id/reinstate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reason, compensationMinutes } = req.body;
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Reinstatement reason is required' } });
    }

    const adminId = req.admin!.adminId;
    const team = await proctoringService.reinstateTeam(
      req.params.id,
      reason,
      adminId,
      Number(compensationMinutes) || 0
    );
    res.json({ success: true, message: `Team ${team.teamCode} reinstated`, team });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/proctoring/teams/:id/extend
router.post('/teams/:id/extend', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const minutes = Number(req.body.extraMinutes) || 5;
    const adminId = req.admin!.adminId;
    const result = await proctoringService.extendTeamTime(req.params.id, minutes, adminId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
