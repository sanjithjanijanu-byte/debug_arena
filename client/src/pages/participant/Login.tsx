import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { resetSocket } from '../../services/socket';
import { Terminal, Lock, KeyRound, AlertCircle, Loader2, Code2, Clock, Zap } from 'lucide-react';

export const ParticipantLogin: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setParticipantAuth = useAuthStore((state) => state.setParticipantAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/event/auth/login', {
        identifier: identifier.trim(),
        password,
      });

      if (response.data.success) {
        setParticipantAuth(response.data.token, response.data.team);
        resetSocket();
        navigate('/event/instructions');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
          'Login failed. Please verify your Team Code or Roll No. and Password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
        {/* Left Side: Event Feature Highlights */}
        <div className="hidden md:flex flex-col space-y-6 pr-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider w-fit">
            <Zap className="w-4 h-4" />
            <span>Tech Fest 2026 Live Championship</span>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
              DebugArena <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">2026</span>
            </h1>
            <p className="text-slate-400 text-base mt-2">
              Hunt bugs, rewrite faulty logic, and dominate the leaderboard in an intense 3-round battle.
            </p>
          </div>

          {/* Quick Specifications list */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white">C++, Java, or Python</span> — Select once, locked for the event
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white">120 Minutes Total</span> — 3 escalating rounds (Easy, Medium, Hard)
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white">Judge0 Live Execution</span> — Immediate feedback against test suites
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Participant Login Box */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-slate-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Participant Portal</h2>
            <p className="text-slate-400 text-sm mt-1">
              Enter the credentials issued by the event organizers to enter the arena.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start text-sm">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Team Code or Roll No.
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. TEAM-1001 or CS202601"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors uppercase font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Issued Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-brand-600/25 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Connecting to Arena...
                </>
              ) : (
                'Enter Debugging Arena'
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <span className="text-xs text-slate-500">
              Need assistance or lost your credentials? Visit the Event Control Desk.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
