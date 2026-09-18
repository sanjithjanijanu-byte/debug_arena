import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { AppError } from './utils/errors';
import { initSocketServer } from './socket';
import { startTimerService } from './services/timer.service';

// Route Imports
import adminAuthRoutes from './routes/admin/auth.routes';
import adminTeamsRoutes from './routes/admin/teams.routes';
import adminParticipantsRoutes from './routes/admin/participants.routes';
import adminQuestionsRoutes from './routes/admin/questions.routes';
import adminRoundsRoutes from './routes/admin/rounds.routes';
import adminProctoringRoutes from './routes/admin/proctoring.routes';
import adminLeaderboardRoutes from './routes/admin/leaderboard.routes';
import eventAuthRoutes from './routes/event/auth.routes';
import eventTeamRoutes from './routes/event/team.routes';
import eventWorkspaceRoutes from './routes/event/workspace.routes';
import { getLeaderboard } from './services/scoring.service';

const app = express();
const server = http.createServer(app);

// Socket.IO Server Initialization
export const io = initSocketServer(server);

// Middleware Stack
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible integration for local dev and sandboxed tools
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Quick DB check
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});

// API Routes Mounting
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/teams', adminTeamsRoutes);
app.use('/api/admin/participants', adminParticipantsRoutes);
app.use('/api/admin/questions', adminQuestionsRoutes);
app.use('/api/admin/rounds', adminRoundsRoutes);
app.use('/api/admin/proctoring', adminProctoringRoutes);
app.use('/api/admin/leaderboard', adminLeaderboardRoutes);
app.use('/api/event/auth', eventAuthRoutes);
app.use('/api/event/team', eventTeamRoutes);
app.use('/api/event/workspace', eventWorkspaceRoutes);

// Public Projector / Live Display Leaderboard (respects freeze)
app.get('/api/event/public/leaderboard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getLeaderboard(false);
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// Start Background Authoritative Timer Service
startTimerService();

// Production / Unified Deployment: Serve Frontend Static Assets
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`📦 Serving compiled client UI from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global Centralized Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    console.error('💥 Unhandled Exception:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

// Synchronize Round Durations and Question Sets on Startup (Round 1: 15m, Round 2: 30m, 5 Sets)
async function syncDatabaseOnStartup() {
  try {
    // 1. Durations
    await prisma.round.updateMany({
      where: { number: 1 },
      data: { durationMinutes: 15 },
    });
    await prisma.round.updateMany({
      where: { number: 2 },
      data: { durationMinutes: 30 },
    });
    const round3 = await prisma.round.findFirst({
      where: { number: 3 },
      include: { questions: true },
    });
    if (round3 && round3.questions.length === 0) {
      await prisma.round.delete({ where: { id: round3.id } }).catch(() => {});
    }
    console.log('⚡ Round durations auto-synced: Round 1 (15m), Round 2 (30m)');

    // 2. Auto-import 5 question sets if incomplete
    const qCount = await prisma.question.count();
    const set5Sample = await prisma.question.findFirst({
      where: { title: { contains: 'Set 5' } },
    });

    if (qCount < 315 || !set5Sample) {
      console.log(`📦 Question bank incomplete (${qCount} questions, Set 5 missing: ${!set5Sample}). Auto-seeding 5 sets...`);
      const { seedAllSetsQuestions } = await import('./services/seedQuestions.service');
      await seedAllSetsQuestions();
      await prisma.assignment.deleteMany({});
      console.log('✅ Question bank synchronized with 5 distinct sets!');
    } else {
      console.log(`✅ Question bank verified: ${qCount} questions active across 5 sets.`);
    }
  } catch (err) {
    console.warn('⚠️ syncDatabaseOnStartup error:', err);
  }
}

// Graceful Server Startup
server.listen(env.PORT, () => {
  console.log(`🚀 Debugging Event Platform Server running on port ${env.PORT}`);
  console.log(`📡 WebSocket ready on port ${env.PORT}`);
  console.log(`🎯 Client origin allowed: ${env.CLIENT_URL}`);
  syncDatabaseOnStartup();
});

// Process Signal Handling
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Closing HTTP server and database pool...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Server and database pool gracefully shut down.');
    process.exit(0);
  });
});

export default app;
