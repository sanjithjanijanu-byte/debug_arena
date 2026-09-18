import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { getSocket } from '../../services/socket';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Clock,
  Code2,
  Users,
  LogOut,
  Radio,
  Loader2,
} from 'lucide-react';

export const WaitingRoom: React.FC = () => {
  const [activeRound, setActiveRound] = useState<any>(null);
  const [upcomingRound, setUpcomingRound] = useState<any>(null);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const team = useAuthStore((state) => state.team);
  const logoutParticipant = useAuthStore((state) => state.logoutParticipant);

  // Check event status and listen to real-time round:started socket event
  useEffect(() => {
    const socket = getSocket();

    const handleRoundStarted = () => {
      navigate('/event/round', { replace: true });
    };

    const handleTimerSync = (data: any) => {
      if (data.activeRound && data.activeRound.remainingSeconds > 0) {
        navigate('/event/round', { replace: true });
      }
    };

    socket.on('round:started', handleRoundStarted);
    socket.on('timer:sync', handleTimerSync);

    const checkRoundStatus = async () => {
      try {
        setChecking(true);
        const res = await api.get('/event/team/status');
        if (res.data.success) {
          if (res.data.activeRound && res.data.activeRound.status === 'ACTIVE') {
            navigate('/event/round', { replace: true });
          } else {
            setActiveRound(res.data.activeRound);
            setUpcomingRound(res.data.upcomingRound || res.data.activeRound);
          }
        }
      } catch (err) {
        console.warn('Waiting room status check error:', err);
      } finally {
        setChecking(false);
      }
    };

    checkRoundStatus();
    const interval = setInterval(checkRoundStatus, 3000);

    return () => {
      socket.off('round:started', handleRoundStarted);
      socket.off('timer:sync', handleTimerSync);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d111a] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            DA
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">DebugArena 2026</h1>
            <p className="text-xs text-slate-400">Waiting Room</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Team</span>
            <span className="text-sm font-semibold text-cyan-400 font-mono">
              {team?.name || 'Team'} ({team?.teamCode})
            </span>
          </div>
          <button
            onClick={() => {
              logoutParticipant();
              navigate('/login');
            }}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 flex flex-col justify-center items-center text-center">
        {/* Pulsing Status Orb */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center animate-pulse">
            <Radio className="w-10 h-10 text-brand-400 animate-bounce" />
          </div>
          <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-xl -z-10" />
        </div>

        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          You are Ready for the Arena
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Waiting for the event organizers to launch{' '}
          <span className="text-white font-medium">
            {upcomingRound 
              ? (upcomingRound.name.startsWith('Round') ? upcomingRound.name : `Round ${upcomingRound.number} (${upcomingRound.name})`) 
              : 'Round 1 (Bug Hunt)'}
          </span>
          . Your screen will automatically transition the moment the round begins.
        </p>

        {/* Team State Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 w-full max-w-lg mb-8 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
            <Users className="w-4 h-4 mr-2 text-brand-400" />
            Registered Team Profile
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Team Name</span>
              <span className="font-semibold text-white">{team?.name}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Team Code</span>
              <span className="font-mono text-cyan-400 font-semibold">{team?.teamCode}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
              <span className="text-slate-400">Selected Language</span>
              <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1" />
                {team?.language || 'CPP'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400">Next Upcoming Round</span>
              <span className="text-emerald-400 font-semibold flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {(() => {
                  const target = upcomingRound || activeRound;
                  if (!target) return 'Round 1: Bug Hunt (15 Min)';
                  const name = target.name?.startsWith('Round') ? target.name : `Round ${target.number}: ${target.name}`;
                  return `${name} (${target.durationMinutes || (target.number === 2 ? 30 : 15)} Min)`;
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Live sync heartbeat */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Central timer synchronized • Listening for round launch</span>
          {checking && <Loader2 className="w-3 h-3 animate-spin ml-1 text-slate-400" />}
        </div>
      </main>
    </div>
  );
};
