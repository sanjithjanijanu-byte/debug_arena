import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { getSocket } from '../../services/socket';
import {
  PauseCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Radio,
  Loader2,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface Round {
  id: string;
  number: number;
  name: string;
  durationMinutes: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'LOCKED' | 'ACTIVE' | 'ENDED';
  startedAt: string | null;
  endsAt: string | null;
  _count?: {
    questions: number;
  };
}

interface EventSettings {
  id: string;
  eventStatus: string;
  eventStartedAt: string | null;
  eventPausedAt: string | null;
  totalPausedDurationSecs: number;
}

export const RoundControl: React.FC = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [eventSettings, setEventSettings] = useState<EventSettings | null>(null);
  const [activeRound, setActiveRound] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Pause Modal
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseReason, setPauseReason] = useState('Technical checkpoint / Organizer announcement');

  // Confirmation Modals
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    targetId?: string;
    title: string;
    message: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchRoundsData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/rounds');
      if (res.data.success) {
        setRounds(res.data.rounds);
        setEventSettings(res.data.eventSettings);
        setActiveRound(res.data.activeRound);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch round data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoundsData();

    const socket = getSocket();

    // Listen to real-time timer sync
    const handleTimerSync = (data: any) => {
      if (data.activeRound) {
        setActiveRound((prev: any) => ({
          ...(prev || {}),
          ...data.activeRound,
        }));
      } else {
        setActiveRound(null);
      }
      if (data.eventStatus) {
        setEventSettings((prev: any) => (prev ? { ...prev, eventStatus: data.eventStatus } : prev));
      }
    };

    const handleRoundStarted = () => {
      fetchRoundsData();
      showToast('🚀 Round started successfully!');
    };

    const handleRoundEnded = () => {
      fetchRoundsData();
      showToast('🏁 Round concluded.');
    };

    const handleEventPaused = () => {
      fetchRoundsData();
      showToast('⏸️ Event paused by organizer.');
    };

    const handleEventResumed = () => {
      fetchRoundsData();
      showToast('▶️ Event resumed.');
    };

    socket.on('timer:sync', handleTimerSync);
    socket.on('round:started', handleRoundStarted);
    socket.on('round:ended', handleRoundEnded);
    socket.on('event:paused', handleEventPaused);
    socket.on('event:resumed', handleEventResumed);

    return () => {
      socket.off('timer:sync', handleTimerSync);
      socket.off('round:started', handleRoundStarted);
      socket.off('round:ended', handleRoundEnded);
      socket.off('event:paused', handleEventPaused);
      socket.off('event:resumed', handleEventResumed);
    };
  }, [fetchRoundsData]);

  // Actions
  const handleStartRound = async (roundId: string) => {
    try {
      setActionLoading(roundId);
      const res = await api.post(`/admin/rounds/${roundId}/start`);
      if (res.data.success) {
        showToast(res.data.message);
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to start round');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEndRound = async (roundId: string) => {
    try {
      setActionLoading(roundId);
      const res = await api.post(`/admin/rounds/${roundId}/end`);
      if (res.data.success) {
        showToast(res.data.message);
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to end round');
    } finally {
      setActionLoading(null);
      setConfirmAction(null);
    }
  };

  const handleExtendRound = async (roundId: string, additionalMinutes: number) => {
    try {
      setActionLoading(`extend_${roundId}_${additionalMinutes}`);
      const res = await api.post(`/admin/rounds/${roundId}/extend`, { additionalMinutes });
      if (res.data.success) {
        showToast(`Added +${additionalMinutes}m to Round!`);
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to extend round');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePauseEvent = async () => {
    try {
      setActionLoading('pause');
      const res = await api.post('/admin/rounds/event/pause', { reason: pauseReason });
      if (res.data.success) {
        showToast('Event paused.');
        setShowPauseModal(false);
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to pause event');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResumeEvent = async () => {
    try {
      setActionLoading('resume');
      const res = await api.post('/admin/rounds/event/resume');
      if (res.data.success) {
        showToast('Event resumed.');
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to resume event');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetEvent = async () => {
    try {
      setActionLoading('reset');
      const res = await api.post('/admin/rounds/event/reset');
      if (res.data.success) {
        showToast('All rounds & event state reset to default.');
        await fetchRoundsData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to reset event');
    } finally {
      setActionLoading(null);
      setConfirmAction(null);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isEventPaused = eventSettings?.eventStatus === 'PAUSED';
  const isEventStarted = eventSettings?.eventStatus === 'ACTIVE';

  if (loading && rounds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-400" />
        <p className="text-xs font-mono">Loading round engine status...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-brand-400/30 animate-in fade-in slide-in-from-bottom-5">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-sm">{notification}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Round Engine & Live Timers</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              <Radio className="w-3 h-3 text-emerald-400 mr-1.5 animate-pulse" />
              Real-time Sync
            </span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Server-authoritative state machine: LOCKED → ACTIVE → ENDED with automatic question distribution and draft submission.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center space-x-3">
          {isEventPaused ? (
            <button
              onClick={handleResumeEvent}
              disabled={actionLoading === 'resume'}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              {actionLoading === 'resume' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>Resume Event</span>
            </button>
          ) : (
            <button
              onClick={() => setShowPauseModal(true)}
              disabled={actionLoading === 'pause' || !isEventStarted}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                isEventStarted
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <PauseCircle className="w-4 h-4 text-amber-400" />
              <span>Pause Event</span>
            </button>
          )}

          <button
            onClick={() =>
              setConfirmAction({
                type: 'RESET',
                title: 'Reset Entire Event State?',
                message: 'This will lock all 3 rounds and reset timers to initial setup. Submissions will be preserved.',
              })
            }
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition border border-slate-700 flex items-center space-x-1.5"
            title="Reset Event"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live Status Hero Card */}
      <div className={`glass-panel p-6 rounded-2xl border transition-all duration-300 ${
        isEventPaused
          ? 'border-amber-500/40 bg-amber-950/10'
          : activeRound
          ? 'border-brand-500/40 bg-brand-950/10'
          : 'border-slate-800 bg-[#0d111a]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Active Round Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                isEventPaused
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                  : activeRound
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {isEventPaused ? 'PAUSED' : activeRound ? 'LIVE ROUND ACTIVE' : 'NO ROUND RUNNING'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Status: {eventSettings?.eventStatus || 'NOT_STARTED'}
              </span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              {activeRound ? `Round ${activeRound.number}: ${activeRound.name}` : 'Waiting for Round Initiation'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {activeRound
                ? `Participants are actively writing and submitting solutions. Timer is authoritative on the server.`
                : 'Select a round below and click "Start Round" to open the workspace for all participants.'}
            </p>
          </div>

          {/* Large Countdown Clock */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center space-x-1.5">
              <span>Authoritative Countdown</span>
              {isEventPaused && <span className="text-amber-400">(FROZEN)</span>}
            </div>
            <div className={`font-mono text-5xl font-black tracking-tight flex items-baseline space-x-1 ${
              isEventPaused
                ? 'text-amber-400'
                : activeRound && activeRound.remainingSeconds < 60
                ? 'text-rose-500 animate-pulse'
                : activeRound && activeRound.remainingSeconds < 300
                ? 'text-yellow-400'
                : activeRound
                ? 'text-white'
                : 'text-slate-600'
            }`}>
              <span>{activeRound ? formatTime(activeRound.remainingSeconds) : '00:00'}</span>
              <span className="text-xs font-normal text-slate-500">remaining</span>
            </div>

            {/* Quick Extension Pills while Live */}
            {activeRound && (
              <div className="flex items-center space-x-1.5 mt-3">
                <span className="text-[11px] text-slate-400 mr-1">Extend:</span>
                {[1, 5, 10, 15].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleExtendRound(activeRound.id, mins)}
                    disabled={actionLoading === `extend_${activeRound.id}_${mins}`}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white rounded text-[11px] font-mono font-bold transition border border-slate-700"
                  >
                    +{mins}m
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rounds.map((round) => {
          const isCurrentActive = round.status === 'ACTIVE';
          const isEnded = round.status === 'ENDED';
          const isLocked = round.status === 'LOCKED';
          const hasAnyActive = rounds.some((r) => r.status === 'ACTIVE');

          return (
            <div
              key={round.id}
              className={`glass-panel rounded-2xl border transition-all flex flex-col justify-between ${
                isCurrentActive
                  ? 'border-brand-500/50 bg-[#0f1422] ring-1 ring-brand-500/30 shadow-xl shadow-brand-500/10'
                  : isEnded
                  ? 'border-slate-800/80 bg-[#0b0e14] opacity-80'
                  : 'border-slate-800 bg-[#0d111a] hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ROUND {round.number}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCurrentActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : isEnded
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {round.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{round.name}</h3>

                <div className="flex items-center space-x-3 mt-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1 font-mono">
                    <span className="text-slate-200 font-bold">{round.durationMinutes}</span>
                    <span>minutes</span>
                  </span>
                  <span>•</span>
                  <span
                    className={`font-semibold ${
                      round.difficulty === 'EASY'
                        ? 'text-emerald-400'
                        : round.difficulty === 'MEDIUM'
                        ? 'text-yellow-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {round.difficulty}
                  </span>
                  <span>•</span>
                  <span>{round._count?.questions || 12} Questions</span>
                </div>
              </div>

              {/* Card Body / Real-time Status */}
              <div className="p-6 space-y-4">
                {isCurrentActive && activeRound ? (
                  <div className="space-y-3 bg-brand-950/20 p-4 rounded-xl border border-brand-500/20">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Time Left:</span>
                      <span className="text-emerald-400 font-bold text-sm">
                        {formatTime(activeRound.remainingSeconds)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-500 h-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(
                              100,
                              (activeRound.remainingSeconds / (round.durationMinutes * 60)) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : isEnded ? (
                  <div className="p-4 rounded-xl bg-purple-950/10 border border-purple-500/20 flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Round Concluded</p>
                      <p className="text-[11px] text-slate-400">Drafts evaluated and auto-submitted.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center space-x-3 text-slate-400 text-xs">
                    <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Workspace locked until initiated by organizer.</span>
                  </div>
                )}

                {/* Card Controls */}
                <div className="pt-2">
                  {isCurrentActive ? (
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: 'END_ROUND',
                          targetId: round.id,
                          title: `End Round ${round.number} Now?`,
                          message:
                            'This will immediately close submissions, auto-evaluate all remaining participant drafts, and lock the workspace.',
                        })
                      }
                      disabled={actionLoading === round.id}
                      className="w-full py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/10"
                    >
                      {actionLoading === round.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>End Round {round.number}</span>
                    </button>
                  ) : isLocked ? (
                    <button
                      onClick={() => handleStartRound(round.id)}
                      disabled={hasAnyActive || actionLoading === round.id}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                        hasAnyActive
                          ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                      }`}
                    >
                      {actionLoading === round.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>Start Round {round.number}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 bg-slate-800/40 text-slate-500 border border-slate-800 rounded-xl text-xs font-medium cursor-not-allowed"
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pause Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/40 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-amber-400">
              <PauseCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Pause Entire Event</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Freezes all participant countdown timers and displays a full-screen pause notice across all participant machines. Submissions will be blocked until resumed.
            </p>
            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-300">Reason / Notice to Display:</label>
              <input
                type="text"
                value={pauseReason}
                onChange={(e) => setPauseReason(e.target.value)}
                placeholder="e.g., Technical inspection / Organizer announcement"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowPauseModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePauseEvent}
                disabled={actionLoading === 'pause'}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2"
              >
                {actionLoading === 'pause' ? <Loader2 className="w-4 h-4 animate-spin" /> : <PauseCircle className="w-4 h-4" />}
                <span>Confirm Pause</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-700 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">{confirmAction.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">{confirmAction.message}</p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction.type === 'END_ROUND' && confirmAction.targetId) {
                    handleEndRound(confirmAction.targetId);
                  } else if (confirmAction.type === 'RESET') {
                    handleResetEvent();
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-rose-600/20"
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundControl;
