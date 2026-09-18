import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Code2,
  LogOut,
} from 'lucide-react';

export const Instructions: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const team = useAuthStore((state) => state.team);
  const logoutParticipant = useAuthStore((state) => state.logoutParticipant);

  const handleProceed = () => {
    if (agreed) {
      // If language already chosen, skip to waiting room or round
      if (team?.languageLockedAt) {
        navigate('/event/waiting-room');
      } else {
        navigate('/event/language-select');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-[#0d111a] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            DA
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">DebugArena 2026</h1>
            <p className="text-xs text-slate-400">Technical Fest Debugging Championship</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Signed in as</span>
            <span className="text-sm font-semibold text-cyan-400 font-mono">
              {team?.name || 'Team Participant'} ({team?.teamCode})
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

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Event Briefing & Regulations
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Please carefully review the format, round structure, and anti-cheat policies before entering the arena.
          </p>
        </div>

        {/* Round Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Round 1
              </span>
              <span className="text-xs text-slate-400 font-mono">30 Min</span>
            </div>
            <h3 className="text-lg font-bold text-white">Bug Hunt</h3>
            <p className="text-xs text-slate-400 mt-1">
              4 Questions • 10 Pts each (40 pts max)
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Syntax issues, off-by-one errors, and common coding traps.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                Round 2
              </span>
              <span className="text-xs text-slate-400 font-mono">40 Min</span>
            </div>
            <h3 className="text-lg font-bold text-white">Logic Hunt</h3>
            <p className="text-xs text-slate-400 mt-1">
              4 Questions • 20 Pts each (80 pts max)
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Flawed algorithms, boundary conditions, and edge-case handling.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-rose-400 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                Round 3
              </span>
              <span className="text-xs text-slate-400 font-mono">40 Min</span>
            </div>
            <h3 className="text-lg font-bold text-white">Debugging Showdown</h3>
            <p className="text-xs text-slate-400 mt-1">
              4 Questions • 32.5 Pts each (130 pts max)
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Complex data structures, concurrency, recursion, and performance bottlenecks.
            </p>
          </div>
        </div>

        {/* Essential Rules Section */}
        <div className="glass-panel p-6 rounded-xl border border-slate-800 mb-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center">
            <Code2 className="w-5 h-5 text-brand-400 mr-2" />
            Core Competition Mechanics
          </h3>
          <ul className="text-sm text-slate-300 space-y-2.5 list-disc list-inside">
            <li>
              <strong className="text-white">Language Lock:</strong> In the next step, your team will choose <span className="text-cyan-400 font-semibold">C++, Java, or Python</span>. This choice is permanent for all 3 rounds.
            </li>
            <li>
              <strong className="text-white">Server Authoritative Timer:</strong> The countdown is controlled and synchronized by the central server.
            </li>
            <li>
              <strong className="text-white">Run vs. Submit:</strong> Use <em>Run Code</em> to test visible test cases without penalty. Use <em>Submit Code</em> to test against the full hidden evaluation suite.
            </li>
            <li>
              <strong className="text-white">Ranking Priority:</strong> (1) Total score &rarr; (2) Total test cases passed &rarr; (3) Earliest last-submission timestamp &rarr; (4) Tie-breaker question.
            </li>
          </ul>
        </div>

        {/* Anti-Cheat Warning Box */}
        <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30 text-slate-200 mb-8 space-y-4">
          <div className="flex items-center space-x-2 text-red-400">
            <ShieldAlert className="w-6 h-6 flex-shrink-0" />
            <h3 className="text-base font-bold">Strict Anti-Cheat Proctoring Rules</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            The workspace environment is actively monitored in real-time. Violations are logged and will trigger automatic disqualification:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start space-x-2 bg-slate-900/60 p-3 rounded-lg border border-red-500/10">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Tab Switching / Window Blur:</strong> Leaving the active browser tab will issue a strike and flag your team.</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-900/60 p-3 rounded-lg border border-red-500/10">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Fullscreen Mode:</strong> Fullscreen is mandatory during the round. Exiting without admin authorization is flagged.</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-900/60 p-3 rounded-lg border border-red-500/10">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Single Device Session:</strong> Simultaneous login on multiple computers will immediately invalidate the session.</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-900/60 p-3 rounded-lg border border-red-500/10">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>External Copy/Paste:</strong> External clipboard pasting into Monaco Editor is restricted.</span>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox & Action Button */}
        <div className="glass-panel p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <label className="flex items-center space-x-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-brand-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-200">
              I have read and agree to all rules, policies, and anti-cheat terms.
            </span>
          </label>

          <button
            onClick={handleProceed}
            disabled={!agreed}
            className="w-full md:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-brand-600/20 flex items-center justify-center cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Proceed to Language Selection
          </button>
        </div>
      </main>
    </div>
  );
};
