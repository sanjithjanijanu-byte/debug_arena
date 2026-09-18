import { create } from 'zustand';
import { Admin, Team } from '../types';

interface AuthState {
  // Admin Portal State
  adminToken: string | null;
  admin: Admin | null;
  setAdminAuth: (token: string, admin: Admin) => void;
  logoutAdmin: () => void;

  // Participant Portal State
  participantToken: string | null;
  team: Partial<Team> | null;
  setParticipantAuth: (token: string, team: Partial<Team>) => void;
  updateTeam: (updates: Partial<Team>) => void;
  logoutParticipant: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  adminToken: sessionStorage.getItem('adminToken') || localStorage.getItem('adminToken'),
  admin: (sessionStorage.getItem('adminUser') || localStorage.getItem('adminUser'))
    ? JSON.parse((sessionStorage.getItem('adminUser') || localStorage.getItem('adminUser'))!)
    : null,
  setAdminAuth: (token, admin) => {
    sessionStorage.setItem('adminToken', token);
    sessionStorage.setItem('adminUser', JSON.stringify(admin));
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(admin));
    set({ adminToken: token, admin });
  },
  logoutAdmin: () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    set({ adminToken: null, admin: null });
  },

  // Participant auth isolated per-tab in sessionStorage to enable multiple simultaneous team logins
  participantToken: sessionStorage.getItem('participantToken') || localStorage.getItem('participantToken'),
  team: (() => {
    const raw = sessionStorage.getItem('teamInfo') || localStorage.getItem('teamInfo');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })(),
  setParticipantAuth: (token, team) => {
    sessionStorage.setItem('participantToken', token);
    sessionStorage.setItem('teamInfo', JSON.stringify(team));
    set({ participantToken: token, team });
  },
  updateTeam: (updates) => {
    set((state) => {
      const updated = { ...state.team, ...updates };
      sessionStorage.setItem('teamInfo', JSON.stringify(updated));
      return { team: updated };
    });
  },
  logoutParticipant: () => {
    sessionStorage.removeItem('participantToken');
    sessionStorage.removeItem('teamInfo');
    localStorage.removeItem('participantToken');
    localStorage.removeItem('teamInfo');
    set({ participantToken: null, team: null });
  },
}));
