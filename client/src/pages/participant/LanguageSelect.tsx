import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { Language } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  Lock,
  Loader2,
  LogOut,
  Cpu,
  Coffee,
  Terminal,
} from 'lucide-react';

export const LanguageSelect: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const team = useAuthStore((state) => state.team);
  const updateTeam = useAuthStore((state) => state.updateTeam);
  const logoutParticipant = useAuthStore((state) => state.logoutParticipant);

  // If language is already locked, redirect to waiting room
  React.useEffect(() => {
    if (team?.languageLockedAt) {
      navigate('/event/waiting-room', { replace: true });
    }
  }, [team, navigate]);

  const languages: {
    id: Language;
    name: string;
    version: string;
    desc: string;
    icon: any;
    color: string;
    borderColor: string;
    bgHover: string;
  }[] = [
    {
      id: 'CPP',
      name: 'C++',
      version: 'GCC 13 • -std=c++17',
      desc: 'Raw speed, pointer manipulation, and standard template library execution.',
      icon: Cpu,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgHover: 'hover:border-cyan-500 hover:shadow-cyan-500/10',
    },
    {
      id: 'JAVA',
      name: 'Java',
      version: 'OpenJDK 17',
      desc: 'Object-oriented logic, strong typing, collections framework, and clean structure.',
      icon: Coffee,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgHover: 'hover:border-amber-500 hover:shadow-amber-500/10',
    },
    {
      id: 'PYTHON',
      name: 'Python',
      version: 'Python 3.11',
      desc: 'Expressive syntax, rapid debugging, built-in string slicing, and powerful standard modules.',
      icon: Terminal,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgHover: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
    },
  ];

  const handleConfirmLock = async () => {
    if (!selectedLanguage) return;

    setError(null);
    setLoading(true);

    try {
      const res = await api.put('/event/team/language', {
        language: selectedLanguage,
      });

      if (res.data.success) {
        updateTeam({
          language: res.data.team.language,
          languageLockedAt: res.data.team.languageLockedAt,
        });
        navigate('/event/waiting-room');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
          'Failed to lock language selection. Please check with an organizer.'
      );
      setShowConfirmModal(false);
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-xs text-slate-400">Step 2: Language Commitment</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Signed in as</span>
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

      {/* Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col justify-center">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Permanent Decision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Weapon
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Select the programming language your team will debug in across all 3 rounds.
            Once confirmed, this selection cannot be altered.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
              &times;
            </button>
          </div>
        )}

        {/* Language Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {languages.map((lang) => {
            const Icon = lang.icon;
            const isSelected = selectedLanguage === lang.id;

            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`glass-panel p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-lg relative ${
                  isSelected
                    ? `${lang.borderColor} ring-2 ring-brand-500/50 bg-slate-900/90 scale-102`
                    : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/40'
                } ${lang.bgHover}`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-brand-400">
                    <CheckCircle2 className="w-5 h-5 fill-brand-500/20" />
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4 ${lang.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white">{lang.name}</h3>
                <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                  {lang.version}
                </span>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {lang.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rounds 1, 2 & 3</span>
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                    {isSelected ? 'Selected' : 'Click to select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (selectedLanguage) {
                setShowConfirmModal(true);
              }
            }}
            disabled={!selectedLanguage}
            className="px-10 py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition duration-200 shadow-xl shadow-brand-600/25 flex items-center cursor-pointer"
          >
            <Lock className="w-4 h-4 mr-2" />
            Lock In {selectedLanguage || 'Language'}
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedLanguage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-md w-full border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-2">
              Confirm Language Lock
            </h3>

            <p className="text-xs text-slate-300 text-center leading-relaxed mb-6">
              You are selecting <strong className="text-white font-bold">{selectedLanguage}</strong> for your entire team.
              <br />
              <span className="text-amber-400 font-semibold mt-1 block">
                This choice is permanent and CANNOT be changed for any round.
              </span>
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Cancel & Review
              </button>

              <button
                onClick={handleConfirmLock}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center shadow-lg shadow-brand-600/25 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    Locking...
                  </>
                ) : (
                  'Yes, Lock In'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
