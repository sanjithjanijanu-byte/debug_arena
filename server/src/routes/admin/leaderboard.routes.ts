import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import {
  getLeaderboard,
  toggleLeaderboardFreeze,
  overrideScore,
  pushTieBreaker,
  generateLeaderboardCSV,
  getTiebreakerQuestions,
} from '../../services/scoring.service';

const router = Router();
router.use(authAdmin);

/**
 * GET /api/admin/leaderboard
 * Returns admin view of leaderboard (always live data + freeze state).
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getLeaderboard(true);
    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/leaderboard/freeze
 * Toggles or sets freeze state.
 */
router.post('/freeze', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { freeze } = req.body;
    const result = await toggleLeaderboardFreeze(freeze !== undefined ? Boolean(freeze) : undefined);
    res.json({
      success: true,
      ...result,
      message: result.isFrozen ? 'Leaderboard frozen' : 'Leaderboard revealed',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/leaderboard/override
 * Manual score override with mandatory audit reason.
 */
const overrideScoreSchema = z.object({
  teamId: z.string().uuid('Invalid team ID format'),
  newScore: z.number().min(0, 'Score cannot be negative'),
  reason: z.string().min(3, 'Audit reason is mandatory (minimum 3 characters)'),
});

router.post('/override', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamId, newScore, reason } = overrideScoreSchema.parse(req.body);
    const adminId = req.admin!.adminId;

    const result = await overrideScore(teamId, newScore, reason, adminId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/leaderboard/tie-breaker
 * Push designated tie-breaker question to tied teams.
 */
const tieBreakerSchema = z.object({
  teamIds: z.array(z.string().uuid()).min(1, 'At least one team must be selected'),
  questionId: z.string().uuid('Invalid question ID format'),
});

router.post('/tie-breaker', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamIds, questionId } = tieBreakerSchema.parse(req.body);
    const adminId = req.admin!.adminId;

    const result = await pushTieBreaker(teamIds, questionId, adminId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/leaderboard/tiebreaker-questions
 * List available tiebreaker questions for organizer selection.
 */
router.get('/tiebreaker-questions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await getTiebreakerQuestions();
    res.json({
      success: true,
      questions,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/leaderboard/export/csv
 * Generates and downloads leaderboard CSV.
 */
router.get('/export/csv', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const csvData = await generateLeaderboardCSV();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="debug_arena_leaderboard_${timestamp}.csv"`);
    res.status(200).send(csvData);
  } catch (err) {
    next(err);
  }
});

export default router;
