import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authAdmin } from '../../middleware/authAdmin';
import { validateRequest } from '../../middleware/validateRequest';
import * as questionService from '../../services/question.service';
import { Language, Difficulty } from '@prisma/client';

const router = Router();
router.use(authAdmin);

const createQuestionSchema = z.object({
  body: z.object({
    roundId: z.string().uuid(),
    language: z.enum(['CPP', 'JAVA', 'PYTHON']),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    statement: z.string().min(5, 'Statement is required'),
    buggyCode: z.string().min(1, 'Buggy code is required'),
    referenceSolution: z.string().min(1, 'Reference solution is required'),
    points: z.number().positive(),
    timeLimitMs: z.number().int().positive().optional(),
    memoryLimitMb: z.number().int().positive().optional(),
    isTiebreaker: z.boolean().optional(),
    testCases: z
      .array(
        z.object({
          stdin: z.string(),
          expectedStdout: z.string(),
          isHidden: z.boolean().optional(),
          weight: z.number().positive().optional(),
        })
      )
      .min(1, 'At least one testcase required'),
  }),
});

// GET /api/admin/questions
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId, language, difficulty, isTiebreaker } = req.query;

    const questions = await questionService.getAllQuestions({
      roundId: roundId as string,
      language: language as Language,
      difficulty: difficulty as Difficulty,
      isTiebreaker: isTiebreaker !== undefined ? isTiebreaker === 'true' : undefined,
    });

    res.json({ success: true, questions });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/questions/template
router.get('/template', (req: Request, res: Response) => {
  const sampleTemplate = [
    {
      title: 'Example Buggy Sum',
      roundNumber: 1,
      language: 'PYTHON',
      statement: 'Read integer N, then print the sum of integers from 1 to N.',
      buggyCode: 'import sys\nn = int(sys.stdin.read())\nprint(n * (n - 1) // 2)',
      referenceSolution: 'import sys\nn = int(sys.stdin.read())\nprint(n * (n + 1) // 2)',
      points: 10,
      timeLimitMs: 2000,
      memoryLimitMb: 128,
      isTiebreaker: false,
      testCases: [
        { stdin: '5', expectedStdout: '15', isHidden: false, weight: 1.0 },
        { stdin: '10', expectedStdout: '55', isHidden: true, weight: 2.0 },
      ],
    },
  ];

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="question_import_template.json"');
  res.send(JSON.stringify(sampleTemplate, null, 2));
});

// GET /api/admin/questions/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    res.json({ success: true, question });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/questions
router.post(
  '/',
  validateRequest(createQuestionSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const question = await questionService.createQuestion(req.body);
      res.status(201).json({
        success: true,
        message: 'Question created successfully',
        question,
      });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/admin/questions/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await questionService.updateQuestion(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Question updated successfully',
      question: updated,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/questions/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionService.deleteQuestion(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/questions/:id/validate
router.post('/:id/validate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = await questionService.validateQuestionSolution(req.params.id);
    res.json(validationResult);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/questions/import
router.post('/import', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questionsList = req.body;
    if (!Array.isArray(questionsList)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Expected a JSON array of questions.' },
      });
    }

    const result = await questionService.importQuestionsFromJSON(questionsList);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
