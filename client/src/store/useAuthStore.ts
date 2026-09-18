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
  adminToken: localStorage.getItem('adminToken'),
  admin: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')!) : null,
  setAdminAuth: (token, admin) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(admin));
    set({ adminToken: token, admin });
  },
  logoutAdmin: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    set({ adminToken: null, admin: null });
  },

  participantToken: localStorage.getItem('participantToken'),
  team: localStorage.getItem('teamInfo') ? JSON.parse(localStorage.getItem('teamInfo')!) : null,
  setParticipantAuth: (token, team) => {
    localStorage.setItem('participantToken', token);
    localStorage.setItem('teamInfo', JSON.stringify(team));
    set({ participantToken: token, team });
  },
  updateTeam: (updates) => {
    set((state) => {
      const updated = { ...state.team, ...updates };
      localStorage.setItem('teamInfo', JSON.stringify(updated));
      return { team: updated };
    });
  },
  logoutParticipant: () => {
    localStorage.removeItem('participantToken');
    localStorage.removeItem('teamInfo');
    set({ participantToken: null, team: null });
  },
}));
