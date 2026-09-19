import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const adminToken = sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken');
    const participantToken = sessionStorage.getItem('participantToken') || localStorage.getItem('participantToken');
    const token = adminToken || participantToken || '';

    // Use window.location.origin so WebSocket connects to whatever host/port the app is running on
    const serverUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    socket = io(serverUrl, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 25,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('📡 Connected to DebugArena WebSocket:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from DebugArena WebSocket');
    });

    // Global listener for team disqualification
    socket.on('team:disqualified', (data: any) => {
      console.warn('🚨 Team disqualified notification received over WebSocket:', data);
      useAuthStore.getState().disqualifyParticipant(
        data?.reason || 'Team disqualified due to event proctoring violation.'
      );
    });
  }

  return socket;
}

export function resetSocket(): Socket {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  return getSocket();
}

