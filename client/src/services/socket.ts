import { io, Socket } from 'socket.io-client';

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
