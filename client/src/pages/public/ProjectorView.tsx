import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { getSocket } from '../../services/socket';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Snowflake,
  Clock,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { RankedTeam } from '../admin/Leaderboard';
import { formatScore } from '../../utils/formatters';

export const ProjectorView: React.FC = () => {
  const [standings, setStandings] = useState<RankedTeam[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenAt, setFrozenAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchPublicLeaderboard = useCallback(async () => {
    try {
      const res = await api.get('/event/public/leaderboard');
      if (res.data.success) {
        setStandings(res.data.standings || []);
        setIsFrozen(res.data.isFrozen || false);
        setFrozenAt(res.data.frozenAt || null);
      }
    } catch (err) {
      console.error('Failed to load public leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicLeaderboard();

    const socket = getSocket();
    socket.emit('join:projector');

    const handleUpdated = (payload: { standings: RankedTeam[]; isFrozen?: boolean }) => {
      if (payload.standings) {
        setStandings(payload.standings);
      }
      if (payload.isFrozen !== undefined) {
        setIsFrozen(payload.isFrozen);
      }
    };

    const handleFrozen = (payload: { isFrozen: boolean; frozenAt: string; standings?: RankedTeam[] }) => {
      setIsFrozen(payload.isFrozen);
      setFrozenAt(payload.frozenAt);
      if (payload.standings) {
        setStandings(payload.standings);
      }
    };

    const handleRevealed = (payload: { isFrozen: boolean; standings: RankedTeam[] }) => {
      setIsFrozen(false);
      setFrozenAt(null);
      if (payload.standings) {
        setStandings(payload.standings);
      }

      // Celebratory Confetti Blast!
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 150,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 150,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
        });
      }, 400);
    };

    socket.on('leaderboard:updated', handleUpdated);
    socket.on('leaderboard:frozen', handleFrozen);
    socket.on('leaderboard:revealed', handleRevealed);

    return () => {
      socket.off('leaderboard:updated', handleUpdated);
      socket.off('leaderboard:frozen', handleFrozen);
      socket.off('leaderboard:revealed', handleRevealed);
    };
  }, [fetchPublicLeaderboard]);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const team1 = standings[0];
  const team2 = standings[1];
  const team3 = standings[2];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060810] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <Trophy className="w-12 h-12 text-brand-400 animate-pulse mx-auto" />
          <h2 className="text-xl font-bold tracking-tight">Initializing Projector Display...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070e] text-white flex flex-col p-6 sm:p-10 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-brand-500/25">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-black tracking-tight text-white">
                DEBUGGING ARENA CHAMPIONSHIP
              </h1>
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Official Leaderboard
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">
              Live Automated Evaluation • 4-Tier Tie-Breaking System
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          {/* Status Badge */}
          {isFrozen ? (
            <div className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm tracking-wider shadow-lg shadow-amber-950/40 animate-pulse">
              <Snowflake className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>LEADERBOARD FROZEN {frozenAt ? `(${new Date(frozenAt).toLocaleTimeString()})` : ''}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-sm tracking-wider shadow-lg shadow-emerald-950/40">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE BROADCAST</span>
            </div>
          )}

          {/* Clock */}
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-slate-300">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>{currentTime}</span>
          </div>

          {/* Fullscreen toggle button */}
          <button
            onClick={toggleBrowserFullscreen}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Toggle Browser Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Frozen Suspense Screen Overlay or Live Display */}
      {isFrozen && (
        <div className="my-6 p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-950 text-center">
          <span className="text-amber-300 font-bold text-sm uppercase tracking-widest flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Standings are locked for the dramatic final reveal ceremony!</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </span>
        </div>
      )}

      {/* Top 3 Championship Podium */}
      {standings.length > 0 && (
        <div className="my-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* 2nd Place Silver */}
            <div className="order-2 md:order-1 glass-panel border border-slate-600/60 bg-gradient-to-b from-slate-800/80 to-slate-950 p-6 rounded-3xl text-center shadow-2xl relative overflow-hidden">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-300 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">
                2
              </div>
              <div className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2 flex items-center justify-center space-x-1">
                <Medal className="w-4 h-4 text-slate-300" />
                <span>Silver Contender</span>
              </div>
              <div className="text-xl font-black text-white mt-2 truncate">{team2?.name || '—'}</div>
              <div className="text-xs font-mono text-slate-400">{team2?.teamCode || ''}</div>
              <div className="text-4xl sm:text-5xl font-black text-white mt-4 max-w-full truncate px-2">
                {formatScore(team2?.score)}
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1">TOTAL POINTS</div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-around text-xs text-slate-300 font-medium">
                <span>{team2?.solvedQuestionsCount ?? 0} Solved</span>
                <span>•</span>
                <span>{team2?.totalTestsPassed ?? 0} Tests</span>
              </div>
            </div>

            {/* 1st Place Champion Gold */}
            <div className="order-1 md:order-2 glass-panel border-2 border-amber-400/80 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-8 rounded-3xl text-center shadow-2xl shadow-amber-950/40 transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-xl shadow-amber-500/40 border-2 border-yellow-100">
                <Crown className="w-7 h-7 fill-slate-950 text-slate-950" />
              </div>
              <div className="text-amber-400 text-xs font-black uppercase tracking-widest mt-3 flex items-center justify-center space-x-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Grand Champion #1</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 truncate">{team1?.name || '—'}</div>
              <div className="text-xs font-mono text-amber-300/80">{team1?.teamCode || ''}</div>
              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mt-4 max-w-full truncate px-2">
                {formatScore(team1?.score)}
              </div>
              <div className="text-xs text-amber-300 font-black tracking-wider mt-1">TOTAL POINTS</div>
              <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-around text-xs text-slate-200 font-bold">
                <span className="text-emerald-400">{team1?.solvedQuestionsCount ?? 0} Solved</span>
                <span>•</span>
                <span>{team1?.totalTestsPassed ?? 0} Tests Passed</span>
              </div>
            </div>

            {/* 3rd Place Bronze */}
            <div className="order-3 glass-panel border border-amber-700/60 bg-gradient-to-b from-amber-950/30 to-slate-950 p-6 rounded-3xl text-center shadow-2xl relative overflow-hidden">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-amber-700 text-white font-black text-lg flex items-center justify-center shadow-lg">
                3
              </div>
              <div className="text-amber-600 text-xs font-bold uppercase tracking-widest mt-2 flex items-center justify-center space-x-1">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Bronze Contender</span>
              </div>
              <div className="text-xl font-black text-white mt-2 truncate">{team3?.name || '—'}</div>
              <div className="text-xs font-mono text-slate-400">{team3?.teamCode || ''}</div>
              <div className="text-4xl sm:text-5xl font-black text-amber-200 mt-4 max-w-full truncate px-2">
                {formatScore(team3?.score)}
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1">TOTAL POINTS</div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-around text-xs text-slate-300 font-medium">
                <span>{team3?.solvedQuestionsCount ?? 0} Solved</span>
                <span>•</span>
                <span>{team3?.totalTestsPassed ?? 0} Tests</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standings Table for Auditorium */}
      <div className="max-w-5xl mx-auto w-full glass-panel border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6 text-center w-20">Rank</th>
              <th className="py-4 px-6">Team Name</th>
              <th className="py-4 px-6">Language</th>
              <th className="py-4 px-6 text-right">Score</th>
              <th className="py-4 px-6 text-center">Solved</th>
              <th className="py-4 px-6 text-center">Tests Passed</th>
              <th className="py-4 px-6">Last Submission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {standings.map((team) => (
              <tr key={team.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-6 text-center font-mono font-bold text-base">
                  {team.rank === 1 && <span className="text-amber-400 font-black">#1 👑</span>}
                  {team.rank === 2 && <span className="text-slate-300 font-black">#2 🥈</span>}
                  {team.rank === 3 && <span className="text-amber-600 font-black">#3 🥉</span>}
                  {team.rank > 3 && <span className="text-slate-400">#{team.rank}</span>}
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-white text-base">{team.name}</div>
                  <div className="text-xs font-mono text-slate-400">{team.teamCode}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    {team.language || 'N/A'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-black text-xl text-white whitespace-nowrap">
                  {formatScore(team.score)} <span className="text-xs font-normal text-slate-400">pts</span>
                </td>
                <td className="py-4 px-6 text-center font-bold text-emerald-400">
                  {team.solvedQuestionsCount}
                </td>
                <td className="py-4 px-6 text-center text-slate-300 font-semibold">
                  {team.totalTestsPassed}
                </td>
                <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                  {team.lastSubmissionTime
                    ? new Date(team.lastSubmissionTime).toLocaleTimeString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
