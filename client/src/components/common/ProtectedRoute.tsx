import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../services/api';

export const AdminProtectedRoute: React.FC = () => {
  const adminToken = useAuthStore((state) => state.adminToken);

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export const ParticipantProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const participantToken = useAuthStore((state) => state.participantToken);
  const team = useAuthStore((state) => state.team);
  const isDisqualified = useAuthStore((state) => state.isDisqualified);
  const disqualificationReason = useAuthStore((state) => state.disqualificationReason);
  const disqualifyParticipant = useAuthStore((state) => state.disqualifyParticipant);

  const effectiveDisqualified =
    isDisqualified ||
    team?.status === 'DISQUALIFIED' ||
    sessionStorage.getItem('team_disqualified') === 'true' ||
    localStorage.getItem('team_disqualified') === 'true' ||
    (team?.id ? sessionStorage.getItem(`team_disqualified_${team.id}`) === 'true' : false) ||
    (team?.id ? localStorage.getItem(`team_disqualified_${team.id}`) === 'true' : false);

  // Real-time server sync & active round guard
  useEffect(() => {
    if (!participantToken || effectiveDisqualified) return;

    let isSubscribed = true;

    api
      .get('/event/team/status')
      .then((res) => {
        if (!isSubscribed) return;
        if (res.data?.team?.status === 'DISQUALIFIED') {
          disqualifyParticipant('Disqualified by event proctor.');
        } else if (res.data?.activeRound && res.data.activeRound.status === 'ACTIVE') {
          // If an active round is currently running, the participant MUST be in the workspace
          if (location.pathname !== '/event/round') {
            navigate('/event/round', { replace: true });
          }
        }
      })
      .catch((err) => {
        if (!isSubscribed) return;
        if (err.response?.status === 403) {
          disqualifyParticipant(
            err.response?.data?.error?.message ||
              'Your team has been disqualified from this competition.'
          );
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [participantToken, location.pathname, effectiveDisqualified, navigate, disqualifyParticipant]);

  if (!participantToken) {
    return <Navigate to="/login" replace />;
  }

  if (effectiveDisqualified) {
    const reason =
      disqualificationReason ||
      (team?.id ? sessionStorage.getItem(`team_dq_reason_${team.id}`) : null) ||
      sessionStorage.getItem('team_dq_reason') ||
      (team?.id ? localStorage.getItem(`team_dq_reason_${team.id}`) : null) ||
      localStorage.getItem('team_dq_reason') ||
      'Violation of event proctoring rules: Left active test window or switched applications.';

    return (
      <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center select-none text-white">
        <div className="w-24 h-24 rounded-3xl bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 mb-6 shadow-2xl shadow-rose-500/30 animate-bounce">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wide uppercase mb-3">
          <span>Proctoring Integrity Violation</span>
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight mb-3">Team Disqualified</h2>
        <p className="text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
          Your team has been disqualified for attempting to switch tabs, open an external application, or leave the active exam page. Submissions and code executions are frozen.
        </p>
        <div className="bg-rose-950/60 border border-rose-500/40 px-6 py-4 rounded-2xl max-w-lg text-left text-xs text-rose-200 mb-8 space-y-1.5 shadow-lg">
          <div className="font-bold text-rose-300">Violation Details:</div>
          <p className="font-mono text-[11px] text-slate-200 break-words">{reason}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 max-w-md">
          <p className="font-semibold text-slate-300 mb-1">What to do next:</p>
          <p>Please remain seated at your workstation and contact your lab coordinator or event proctor.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

