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
  isDisqualified: boolean;
  disqualificationReason: string | null;
  setParticipantAuth: (token: string, team: Partial<Team>) => void;
  updateTeam: (updates: Partial<Team>) => void;
  disqualifyParticipant: (reason: string) => void;
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
  isDisqualified: (() => {
    if (typeof window === 'undefined') return false;
    const rawTeam = sessionStorage.getItem('teamInfo') || localStorage.getItem('teamInfo');
    let teamStatus = '';
    if (rawTeam) {
      try {
        teamStatus = JSON.parse(rawTeam)?.status || '';
      } catch {}
    }
    return (
      teamStatus === 'DISQUALIFIED' ||
      sessionStorage.getItem('team_disqualified') === 'true' ||
      localStorage.getItem('team_disqualified') === 'true'
    );
  })(),
  disqualificationReason: (() => {
    if (typeof window === 'undefined') return null;
    return (
      sessionStorage.getItem('team_dq_reason') ||
      localStorage.getItem('team_dq_reason') ||
      null
    );
  })(),
  setParticipantAuth: (token, team) => {
    const isDQ =
      team.status === 'DISQUALIFIED' ||
      sessionStorage.getItem('team_disqualified') === 'true' ||
      localStorage.getItem('team_disqualified') === 'true' ||
      (team.id ? localStorage.getItem(`team_disqualified_${team.id}`) === 'true' : false) ||
      (team.id ? sessionStorage.getItem(`team_disqualified_${team.id}`) === 'true' : false);

    sessionStorage.setItem('participantToken', token);
    sessionStorage.setItem('teamInfo', JSON.stringify(team));
    localStorage.setItem('participantToken', token);
    localStorage.setItem('teamInfo', JSON.stringify(team));

    set({
      participantToken: token,
      team,
      isDisqualified: isDQ,
      disqualificationReason: isDQ
        ? sessionStorage.getItem('team_dq_reason') ||
          localStorage.getItem('team_dq_reason') ||
          'Team is disqualified'
        : null,
    });
  },
  updateTeam: (updates) => {
    set((state) => {
      const updated = { ...state.team, ...updates };
      sessionStorage.setItem('teamInfo', JSON.stringify(updated));
      localStorage.setItem('teamInfo', JSON.stringify(updated));
      return { team: updated };
    });
  },
  disqualifyParticipant: (reason: string) => {
    try {
      sessionStorage.setItem('team_disqualified', 'true');
      sessionStorage.setItem('team_dq_reason', reason);
      localStorage.setItem('team_disqualified', 'true');
      localStorage.setItem('team_dq_reason', reason);
    } catch {}

    set((state) => {
      const updatedTeam = state.team
        ? { ...state.team, status: 'DISQUALIFIED' as any }
        : ({ status: 'DISQUALIFIED' } as any);

      try {
        if (state.team?.id) {
          sessionStorage.setItem(`team_disqualified_${state.team.id}`, 'true');
          sessionStorage.setItem(`team_dq_reason_${state.team.id}`, reason);
          localStorage.setItem(`team_disqualified_${state.team.id}`, 'true');
          localStorage.setItem(`team_dq_reason_${state.team.id}`, reason);
        }
        sessionStorage.setItem('teamInfo', JSON.stringify(updatedTeam));
        localStorage.setItem('teamInfo', JSON.stringify(updatedTeam));
      } catch {}

      return {
        isDisqualified: true,
        disqualificationReason: reason,
        team: updatedTeam,
      };
    });
  },
  logoutParticipant: () => {
    sessionStorage.removeItem('participantToken');
    sessionStorage.removeItem('teamInfo');
    localStorage.removeItem('participantToken');
    localStorage.removeItem('teamInfo');
    // Note: Do NOT clear team_disqualified flags on logout to prevent bypassing DQ by re-logging!
    set({ participantToken: null, team: null });
  },
}));
