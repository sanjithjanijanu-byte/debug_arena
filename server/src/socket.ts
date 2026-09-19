import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from './config/env';
import { prisma } from './config/prisma';

let io: SocketIOServer | null = null;

// Track active connections
export const activeTeamSockets = new Map<string, Set<string>>(); // teamId -> Set of socketIds

export function initSocketServer(httpServer: HttpServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.use((socket: Socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      (socket.handshake.headers?.authorization?.replace('Bearer ', ''));

    if (!token) {
      // Allow anonymous connection for initial handshake, but restrict rooms
      return next();
    }

    try {
      // Try admin secret first
      try {
        const decoded = jwt.verify(token, env.JWT_ADMIN_SECRET) as any;
        if (decoded.audience === 'admin' || decoded.role === 'admin') {
          socket.data.isAdmin = true;
          socket.data.adminId = decoded.adminId || decoded.id;
          return next();
        }
      } catch {
        // Not an admin token
      }

      // Try participant secret
      const decoded = jwt.verify(token, env.JWT_PARTICIPANT_SECRET) as any;
      if (decoded.teamId) {
        socket.data.isParticipant = true;
        socket.data.teamId = decoded.teamId;
        socket.data.teamCode = decoded.teamCode;
        socket.data.sessionId = decoded.sessionId;
      }
      return next();
    } catch {
      // Token invalid, still allow connection but without auth role
      return next();
    }
  });

  io.on('connection', (socket: Socket) => {
    if (socket.data.isAdmin) {
      socket.join('admins');
      console.log(`🛡️ Admin socket connected: ${socket.id}`);
    } else if (socket.data.isParticipant && socket.data.teamId) {
      const teamId = socket.data.teamId;
      socket.join('participants');
      socket.join(`team:${teamId}`);

      if (!activeTeamSockets.has(teamId)) {
        activeTeamSockets.set(teamId, new Set());
      }
      activeTeamSockets.get(teamId)!.add(socket.id);

      console.log(`💻 Team socket connected: ${socket.data.teamCode} (${socket.id})`);

      // Broadcast team status change to admin
      io?.to('admins').emit('team:status_changed', {
        teamId,
        teamCode: socket.data.teamCode,
        status: 'ONLINE',
        socketCount: activeTeamSockets.get(teamId)?.size || 1,
        timestamp: new Date().toISOString(),
      });
    }

    // Projector / Public display room join
    socket.on('join:projector', () => {
      socket.join('projector');
      console.log(`📽️ Projector display joined room: ${socket.id}`);
    });

    // Heartbeat from participant client
    socket.on('heartbeat', async () => {
      if (socket.data.teamId) {
        // Can record heartbeat or update cached state
        socket.emit('heartbeat:ack', { timestamp: Date.now() });
      }
    });

    // Violation report from participant client
    socket.on('violation:report', async (payload: { type: string; details?: string }) => {
      if (!socket.data.teamId) return;

      try {
        const { handleProctoringViolation } = await import('./services/proctoring.service');
        await handleProctoringViolation(socket.data.teamId, payload.type, payload.details);
      } catch (err) {
        console.error('Failed to log violation:', err);
      }
    });

    // Immediate disqualification signal from participant proctoring
    socket.on('violation:disqualify', async (payload: { type?: string; details?: string }) => {
      if (!socket.data.teamId) return;

      try {
        const { handleProctoringViolation } = await import('./services/proctoring.service');
        await handleProctoringViolation(
          socket.data.teamId,
          payload.type || 'DISQUALIFY',
          payload.details || 'Participant left the active test window'
        );
      } catch (err) {
        console.error('Failed to process disqualification over socket:', err);
      }
    });

    // Draft autosave over socket
    socket.on('draft:autosave', async (payload: { questionId: string; code: string }) => {
      if (!socket.data.teamId || !payload.questionId) return;

      try {
        await prisma.draft.upsert({
          where: {
            teamId_questionId: {
              teamId: socket.data.teamId,
              questionId: payload.questionId,
            },
          },
          create: {
            teamId: socket.data.teamId,
            questionId: payload.questionId,
            code: payload.code,
          },
          update: {
            code: payload.code,
          },
        });

        socket.emit('draft:saved', {
          questionId: payload.questionId,
          timestamp: Date.now(),
        });
      } catch (err) {
        console.error('Failed to autosave draft:', err);
      }
    });

    socket.on('disconnect', () => {
      if (socket.data.teamId) {
        const teamId = socket.data.teamId;
        const set = activeTeamSockets.get(teamId);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) {
            activeTeamSockets.delete(teamId);
            io?.to('admins').emit('team:status_changed', {
              teamId,
              teamCode: socket.data.teamCode,
              status: 'OFFLINE',
              socketCount: 0,
              timestamp: new Date().toISOString(),
            });
          }
        }
      }
      console.log(`🔌 Disconnected socket: ${socket.id}`);
    });
  });

  return io;
}

export function getIo(): SocketIOServer | null {
  return io;
}

// Helper Broadcast Functions
export function broadcastTimerSync(payload: any) {
  io?.emit('timer:sync', payload);
}

export function broadcastRoundStarted(payload: any) {
  io?.emit('round:started', payload);
}

export function broadcastRoundEnded(payload: any) {
  io?.emit('round:ended', payload);
}

export function broadcastEventPaused(payload: any) {
  io?.emit('event:paused', payload);
}

export function broadcastEventResumed(payload: any) {
  io?.emit('event:resumed', payload);
}

export function broadcastToTeam(teamId: string, event: string, payload: any) {
  io?.to(`team:${teamId}`).emit(event, payload);
}

export function broadcastToAdmins(event: string, payload: any) {
  io?.to('admins').emit(event, payload);
}

export function broadcastToParticipants(event: string, payload: any) {
  io?.to('participants').emit(event, payload);
}
