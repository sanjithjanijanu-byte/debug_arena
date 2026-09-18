import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { getSocket } from '../../services/socket';
import {
  Play,
  Send,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Terminal,
  FileCode,
  Loader2,
  Maximize2,
  Minimize2,
  PauseCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface TestCase {
  id: string;
  stdin: string;
  expectedStdout: string;
  weight: number;
}

interface QuestionItem {
  id: string;
  title: string;
  statement: string;
  buggyCode: string;
  points: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  isTiebreaker: boolean;
  testCases: TestCase[];
  draftCode: string;
  hasDraft: boolean;
  isMcq?: boolean;
  mcqPrompt?: string;
  mcqOptions?: { [key: string]: string } | null;
  codeSnippet?: string;
  selectedOption?: string | null;
  bestSubmission?: {
    verdict: string;
    pointsAwarded: number;
    testsPassed: number;
    testsTotal: number;
    submittedAt: string;
  } | null;
  submissionCount: number;
}

interface RunResult {
  testCaseId?: string;
  stdin: string;
  expectedStdout: string;
  actualStdout: string;
  isMatch: boolean;
  verdict: string;
  execTimeMs: number;
  stderr?: string;
}

export const RoundWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const team = useAuthStore((state) => state.team);

  // Workspace Data
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeRound, setActiveRound] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editor State
  const [code, setCode] = useState<string>('');
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer & Event Status
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState('Event paused by organizer');
  const [roundEnded, setRoundEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Proctoring & Moderation State
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationReason, setDisqualificationReason] = useState<string | null>(null);
  const [proctorNotice, setProctorNotice] = useState<string | null>(null);

  // Execution & Output State
  const [bottomTab, setBottomTab] = useState<'sample' | 'custom' | 'submissions'>('sample');
  const [customStdin, setCustomStdin] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runCooldown, setRunCooldown] = useState(0);
  const [sampleResults, setSampleResults] = useState<RunResult[] | null>(null);
  const [customOutput, setCustomOutput] = useState<{ stdout: string; stderr?: string; execTimeMs: number } | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<any | null>(null);

  const activeQuestion = questions[activeQuestionIndex] || null;

  // Format language for Monaco Editor
  const getEditorLanguage = (lang?: string | null) => {
    if (!lang) return 'python';
    if (lang === 'CPP') return 'cpp';
    if (lang === 'JAVA') return 'java';
    if (lang === 'PYTHON') return 'python';
    return lang.toLowerCase();
  };

  const isMcqRound = activeRound?.number === 1 || activeQuestion?.isMcq;

  const getMcqOptions = (q: QuestionItem | null): { [key: string]: string } | null => {
    if (!q) return null;
    if (q.mcqOptions) return q.mcqOptions;
    try {
      if (q.statement && q.statement.trim().startsWith('{')) {
        const parsed = JSON.parse(q.statement);
        if (parsed.options) return parsed.options;
      }
    } catch (e) {}
    return null;
  };

  const getMcqPrompt = (q: QuestionItem | null): string => {
    if (!q) return '';
    if (q.mcqPrompt) return q.mcqPrompt;
    try {
      if (q.statement && q.statement.trim().startsWith('{')) {
        const parsed = JSON.parse(q.statement);
        if (parsed.prompt || parsed.text) return parsed.prompt || parsed.text;
      }
    } catch (e) {}
    return q.statement;
  };

  const getMcqCodeSnippet = (q: QuestionItem | null): string => {
    if (!q) return '';
    return q.codeSnippet || q.buggyCode || '';
  };

  const fetchWorkspaceData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/event/workspace/questions');
      if (res.data.success) {
        if (!res.data.activeRound) {
          // No active round, redirect to waiting room
          navigate('/event/waiting-room', { replace: true });
          return;
        }

        setQuestions(res.data.questions);
        setActiveRound(res.data.activeRound);

        if (res.data.questions.length > 0) {
          const initialQ = res.data.questions[0];
          setCode(initialQ.selectedOption || initialQ.draftCode || (initialQ.isMcq ? '' : initialQ.buggyCode));
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load round questions');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWorkspaceData();

    const socket = getSocket();

    // Socket Timer Synchronization
    const handleTimerSync = (data: any) => {
      setIsPaused(data.isPaused);
      if (data.activeRound) {
        setRemainingSeconds(data.activeRound.remainingSeconds);
        if (data.activeRound.remainingSeconds <= 0 && !data.isPaused) {
          setRoundEnded(true);
        }
      } else {
        setRoundEnded(true);
      }
    };

    const handleEventPaused = (data: any) => {
      setIsPaused(true);
      setPauseReason(data.reason || 'Event paused by organizer');
    };

    const handleEventResumed = () => {
      setIsPaused(false);
    };

    const handleRoundEnded = () => {
      setRoundEnded(true);
    };

    const handleAdminMessage = (data: any) => {
      setAdminMessage(data.message);
    };

    const handleTeamDisqualified = (data: any) => {
      setIsDisqualified(true);
      setDisqualificationReason(data.reason || 'Violation of event rules');
    };

    const handleTeamReinstated = (data: any) => {
      setIsDisqualified(false);
      setDisqualificationReason(null);
      setProctorNotice(`Team Reinstated by Organizer! ${data.compensationMinutes ? `(+${data.compensationMinutes}m granted)` : ''}`);
      setTimeout(() => setProctorNotice(null), 8000);
    };

    const handleTimeExtended = (data: any) => {
      setProctorNotice(`+${data.extraMinutes} minutes compensation time added by organizer!`);
      setTimeout(() => setProctorNotice(null), 8000);
    };

    socket.on('timer:sync', handleTimerSync);
    socket.on('event:paused', handleEventPaused);
    socket.on('event:resumed', handleEventResumed);
    socket.on('round:ended', handleRoundEnded);
    socket.on('admin:message', handleAdminMessage);
    socket.on('team:disqualified', handleTeamDisqualified);
    socket.on('team:reinstated', handleTeamReinstated);
    socket.on('team:time_extended', handleTimeExtended);

    return () => {
      socket.off('timer:sync', handleTimerSync);
      socket.off('event:paused', handleEventPaused);
      socket.off('event:resumed', handleEventResumed);
      socket.off('round:ended', handleRoundEnded);
      socket.off('admin:message', handleAdminMessage);
      socket.off('team:disqualified', handleTeamDisqualified);
      socket.off('team:reinstated', handleTeamReinstated);
      socket.off('team:time_extended', handleTimeExtended);
    };
  }, [fetchWorkspaceData]);

  // Local 1-second countdown tick for smooth visual display between socket syncs
  useEffect(() => {
    if (isPaused || remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, remainingSeconds]);

  // Run Cooldown Timer
  useEffect(() => {
    if (runCooldown <= 0) return;
    const interval = setInterval(() => {
      setRunCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [runCooldown]);

  // Autosave Draft Function (Keystroke debounce + 10s auto timer)
  const saveDraft = useCallback(
    async (codeToSave: string, qId: string) => {
      if (!qId || !codeToSave) return;
      try {
        setAutosaveStatus('saving');
        await api.post('/event/workspace/draft', {
          questionId: qId,
          code: codeToSave,
        });
        setAutosaveStatus('saved');
        setLastSavedAt(new Date());
      } catch (err) {
        console.warn('Autosave failed:', err);
        setAutosaveStatus('idle');
      }
    },
    []
  );

  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || '';
    setCode(val);

    // Debounced autosave
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }
    autosaveTimerRef.current = setTimeout(() => {
      if (activeQuestion) {
        saveDraft(val, activeQuestion.id);
      }
    }, 1500);
  };

  // Switch Question
  const handleSelectQuestion = (index: number) => {
    if (index === activeQuestionIndex) return;

    // Save current before switching
    if (activeQuestion && !isMcqRound) {
      saveDraft(code, activeQuestion.id);
    }

    setActiveQuestionIndex(index);
    const targetQ = questions[index];
    setCode(targetQ.selectedOption || targetQ.draftCode || (targetQ.isMcq ? '' : targetQ.buggyCode));
    setSampleResults(null);
    setCustomOutput(null);
    setSubmissionFeedback(null);
  };

  const isQuestionLocked = (q: QuestionItem | null) => {
    if (!q) return false;
    return isMcqRound && (!!q.bestSubmission || (q.submissionCount || 0) > 0);
  };

  const handleSelectOption = async (optionKey: string) => {
    if (!activeQuestion) return;
    if (isQuestionLocked(activeQuestion)) {
      return; // Locked after submission
    }
    const updated = [...questions];
    updated[activeQuestionIndex] = {
      ...updated[activeQuestionIndex],
      selectedOption: optionKey,
      draftCode: optionKey,
    };
    setQuestions(updated);
    setCode(optionKey);

    await saveDraft(optionKey, activeQuestion.id);
  };

  const handleSubmitMCQ = async (optionKey?: string) => {
    if (!activeQuestion) return;
    if (isQuestionLocked(activeQuestion)) {
      alert('You have already submitted an answer for this question. Only one attempt is allowed.');
      return;
    }
    const opt = optionKey || activeQuestion.selectedOption || code;
    if (!opt) {
      alert('Please select an option before submitting.');
      return;
    }

    if (!window.confirm(`Lock in Option ${opt} as your final answer? You can only submit once.`)) {
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/event/workspace/submit', {
        questionId: activeQuestion.id,
        code: opt,
      });

      if (res.data.success) {
        const sub = res.data.submission;
        setSubmissionFeedback(sub);

        if (sub.verdict === 'ACCEPTED') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        const updated = [...questions];
        updated[activeQuestionIndex] = {
          ...updated[activeQuestionIndex],
          bestSubmission: sub,
          submissionCount: (updated[activeQuestionIndex].submissionCount || 0) + 1,
          selectedOption: opt,
          draftCode: opt,
        };
        setQuestions(updated);
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to submit MCQ answer');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset to original buggy code
  const handleResetToBuggy = () => {
    if (!activeQuestion) return;
    if (window.confirm('Reset code back to original buggy template? Your current edits will be replaced.')) {
      setCode(activeQuestion.buggyCode);
      saveDraft(activeQuestion.buggyCode, activeQuestion.id);
    }
  };

  // Execute Code (Sample Test Cases)
  const handleRunCode = async () => {
    if (!activeQuestion || running || runCooldown > 0) return;

    try {
      setRunning(true);
      setBottomTab('sample');
      setRunCooldown(5); // 5s rate limit cooldown

      const res = await api.post('/event/workspace/run', {
        questionId: activeQuestion.id,
        code,
        customStdin: customStdin.trim() !== '' ? customStdin : undefined,
      });

      if (res.data.success) {
        setSampleResults(res.data.results);
        if (res.data.customStdinResult) {
          setCustomOutput(res.data.customStdinResult);
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Execution error');
    } finally {
      setRunning(false);
    }
  };

  // Submit Solution (Hidden & Visible Test Cases)
  const handleSubmitSolution = async () => {
    if (!activeQuestion || submitting) return;

    if (!window.confirm(`Submit final solution for "${activeQuestion.title}"? Your code will be evaluated against all test cases.`)) {
      return;
    }

    try {
      setSubmitting(true);
      setBottomTab('submissions');

      const res = await api.post('/event/workspace/submit', {
        questionId: activeQuestion.id,
        code,
      });

      if (res.data.success) {
        setSubmissionFeedback(res.data);

        // Update question status in local state
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === activeQuestion.id
              ? {
                  ...q,
                  draftCode: code,
                  submissionCount: q.submissionCount + 1,
                  bestSubmission: {
                    verdict: res.data.verdict,
                    pointsAwarded: res.data.pointsAwarded,
                    testsPassed: res.data.testsPassed,
                    testsTotal: res.data.testsTotal,
                    submittedAt: new Date().toISOString(),
                  },
                }
              : q
          )
        );

        if (res.data.allPassed) {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center space-y-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-brand-400" />
        <p className="text-xs font-mono">Initializing Secure Workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-rose-300 max-w-md text-xs">
          <p className="font-bold mb-1">Workspace Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/event/waiting-room', { replace: true })}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
        >
          Return to Waiting Room
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0d14] text-slate-100 flex flex-col overflow-hidden select-none">
      {/* PAUSE OVERLAY */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-2xl shadow-amber-500/20 animate-pulse">
            <PauseCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Event Paused by Organizer</h2>
          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            {pauseReason}
          </p>
          <div className="px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>All Timers & Submissions Are Frozen Server-Side</span>
          </div>
        </div>
      )}

      {/* ROUND CONCLUDED OVERLAY */}
      {roundEnded && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-20 h-20 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-2xl shadow-purple-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Round {activeRound?.number || 1} Concluded!</h2>
          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            Time has expired for this round. All in-progress drafts have been automatically collected and evaluated server-side.
          </p>
          <button
            onClick={() => navigate('/event/waiting-room', { replace: true })}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-600/30 flex items-center space-x-2"
          >
            <span>Proceed to Waiting Room</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DISQUALIFIED OVERLAY */}
      {isDisqualified && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-6 shadow-2xl shadow-rose-500/20 animate-bounce">
            <XCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Team Disqualified</h2>
          <p className="text-sm text-slate-300 max-w-md mb-4 leading-relaxed">
            Your team has been disqualified by the event proctors. Submissions and code executions are frozen.
          </p>
          <div className="bg-rose-950/40 border border-rose-500/30 px-5 py-3 rounded-xl max-w-md text-xs text-rose-300 mb-6">
            <strong>Reason:</strong> {disqualificationReason || 'Violation of technical fest code of conduct'}
          </div>
          <p className="text-xs text-slate-500">Please remain at your desk and contact your lab coordinator.</p>
        </div>
      )}

      {/* URGENT ADMIN MESSAGE BANNER */}
      {adminMessage && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 flex items-center justify-between text-xs font-bold shadow-lg z-40 animate-in slide-in-from-top flex-shrink-0">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-slate-950 flex-shrink-0" />
            <span>URGENT ORGANIZER NOTICE: {adminMessage}</span>
          </div>
          <button
            onClick={() => setAdminMessage(null)}
            className="px-2.5 py-0.5 bg-slate-950 text-amber-400 hover:bg-slate-900 rounded text-[11px] font-semibold transition"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* REINSTATEMENT / EXTRA TIME TOAST */}
      {proctorNotice && (
        <div className="fixed top-14 right-6 z-40 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl border border-emerald-400/30 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4" />
          <span>{proctorNotice}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="h-12 border-b border-slate-800 bg-[#0d111a] px-4 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              DA
            </div>
            <span className="font-black text-sm text-white tracking-tight hidden sm:inline">DebugArena</span>
          </div>

          <span className="h-4 w-[1px] bg-slate-800 hidden sm:inline" />

          {/* Team Info */}
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase bg-brand-500/10 text-brand-400 border border-brand-500/30">
              {team?.language || 'PYTHON'}
            </span>
            <span className="text-xs font-semibold text-slate-300 hidden md:inline">
              {team?.name} <span className="text-slate-500 font-mono">({team?.teamCode})</span>
            </span>
          </div>

          <span className="h-4 w-[1px] bg-slate-800 hidden md:inline" />

          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 hidden lg:inline">
            Round {activeRound?.number}: {activeRound?.name}
          </span>
        </div>

        {/* Center/Right: Timers & Controls */}
        <div className="flex items-center space-x-4">
          {/* Autosave Status Indicator */}
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {autosaveStatus === 'saving'
              ? 'Saving draft...'
              : lastSavedAt
              ? `Saved ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
              : 'Autosave active'}
          </span>

          {/* Authoritative Countdown Clock */}
          <div className={`px-3 py-1 rounded-lg border font-mono text-sm font-bold flex items-center space-x-1.5 transition-colors ${
            remainingSeconds < 60
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
              : remainingSeconds < 300
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-slate-800/80 text-white border-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>{formatTimer(remainingSeconds)}</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout: Conditionally renders MCQ Workspace for Round 1, or Code Debugging Workspace for Rounds 2 & 3 */}
      {isMcqRound ? (
        <div className="flex-1 flex overflow-hidden bg-[#0a0d14]">
          {/* Left Column: MCQ Navigation & Progress */}
          <div className="w-72 md:w-80 border-r border-slate-800 flex flex-col bg-[#0b0e14] flex-shrink-0">
            {/* Header: Score and Progress */}
            <div className="p-4 border-b border-slate-800 bg-[#0d111a]/90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>MCQ Qualification</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  {questions.filter(q => q.bestSubmission?.verdict === 'ACCEPTED').length * 10} / {questions.length * 10} Pts
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-brand-500 to-emerald-500 h-full transition-all duration-300"
                  style={{
                    width: `${(questions.filter(q => q.selectedOption || q.bestSubmission).length / Math.max(1, questions.length)) * 100}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                <span>{questions.filter(q => q.selectedOption || q.bestSubmission).length} of {questions.length} answered</span>
                <span>{questions.length - questions.filter(q => q.selectedOption || q.bestSubmission).length} left</span>
              </div>
            </div>

            {/* Question Selector List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
              {questions.map((q, idx) => {
                const isSelected = idx === activeQuestionIndex;
                const isSolved = q.bestSubmission?.verdict === 'ACCEPTED';
                const isWrong = q.bestSubmission && !isSolved;
                const hasSelected = !!(q.selectedOption || q.draftCode);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-brand-600/15 border-brand-500 text-white shadow-md shadow-brand-500/10'
                        : isSolved
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30'
                        : isWrong
                        ? 'bg-rose-950/20 border-rose-500/30 text-rose-300 hover:bg-rose-900/20'
                        : hasSelected
                        ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/20'
                        : 'bg-slate-900/40 border-slate-800/70 text-slate-400 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : isSolved
                          ? 'bg-emerald-600 text-white'
                          : isWrong
                          ? 'bg-rose-600 text-white'
                          : hasSelected
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-semibold truncate text-slate-200">{q.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {q.points} Pts {q.selectedOption ? `• [${q.selectedOption}]` : ''}
                        </div>
                      </div>
                    </div>

                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                    ) : isWrong ? (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                    ) : hasSelected ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 ml-2" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Question Card & Options */}
          {activeQuestion && (
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Question Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-400">
                        Question {activeQuestionIndex + 1} of {questions.length} • Single Choice
                      </span>
                      <h1 className="text-xl font-bold text-white mt-1">
                        {activeQuestion.title}
                      </h1>
                    </div>
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 font-mono">
                      {activeQuestion.points} Points
                    </span>
                  </div>

                  {/* Problem Prompt */}
                  <div className="text-sm md:text-base text-slate-200 font-medium leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    {getMcqPrompt(activeQuestion)}
                  </div>

                  {/* Code Snippet Box */}
                  {getMcqCodeSnippet(activeQuestion) && (
                    <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#07090e] shadow-xl">
                      <div className="h-9 bg-[#0d111a] px-4 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
                          <span className="ml-2 text-slate-400 font-semibold">{team?.language || 'PYTHON'} Snippet</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Question Code</span>
                      </div>
                      <pre className="p-4 text-xs md:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre">
                        {getMcqCodeSnippet(activeQuestion)}
                      </pre>
                    </div>
                  )}

                  {/* 4 Interactive Option Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {isQuestionLocked(activeQuestion) ? 'Your Submitted Answer (Locked):' : 'Select your answer:'}
                      </h3>
                      {isQuestionLocked(activeQuestion) && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Single Attempt Used</span>
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {Object.entries(getMcqOptions(activeQuestion) || {}).map(([key, optText]) => {
                        const isSelected = (activeQuestion.selectedOption || code) === key;
                        const locked = isQuestionLocked(activeQuestion);
                        return (
                          <button
                            key={key}
                            onClick={() => !locked && handleSelectOption(key)}
                            disabled={locked}
                            className={`p-4 rounded-xl text-left border transition-all flex items-center space-x-4 ${
                              locked
                                ? isSelected
                                  ? 'bg-brand-600/25 border-brand-500 text-white cursor-default'
                                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-brand-600/20 border-brand-500 text-white shadow-lg shadow-brand-500/10 ring-2 ring-brand-500/40 cursor-pointer'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/80 cursor-pointer group'
                            }`}
                          >
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono flex-shrink-0 transition ${
                              isSelected
                                ? 'bg-brand-600 text-white shadow-md'
                                : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                            }`}>
                              {key}
                            </span>
                            <span className="text-sm font-mono font-medium flex-1">
                              {optText}
                            </span>
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                              isSelected
                                ? 'border-brand-500 bg-brand-500'
                                : 'border-slate-600 bg-transparent group-hover:border-slate-400'
                            }`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Status */}
                  {activeQuestion.bestSubmission && (
                    <div className={`p-4 rounded-xl border flex items-center justify-between text-xs md:text-sm font-semibold ${
                      activeQuestion.bestSubmission.verdict === 'ACCEPTED'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {activeQuestion.bestSubmission.verdict === 'ACCEPTED' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                        <span>
                          {activeQuestion.bestSubmission.verdict === 'ACCEPTED'
                            ? `Correct! Awarded ${activeQuestion.bestSubmission.pointsAwarded} points.`
                            : `Submitted Answer (Option ${activeQuestion.selectedOption || code}) is incorrect.`}
                        </span>
                      </div>
                      <span className="text-xs font-mono opacity-80">
                        {new Date(activeQuestion.bestSubmission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between mt-8">
                  <button
                    onClick={() => handleSelectQuestion(Math.max(0, activeQuestionIndex - 1))}
                    disabled={activeQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center space-x-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSelectOption('')}
                      disabled={isQuestionLocked(activeQuestion) || (!activeQuestion.selectedOption && !code)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Choice</span>
                    </button>

                    <button
                      onClick={() => handleSubmitMCQ()}
                      disabled={submitting || isQuestionLocked(activeQuestion) || (!activeQuestion.selectedOption && !code)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : isQuestionLocked(activeQuestion) ? (
                        <>
                          <Lock className="w-4 h-4 text-amber-400" />
                          <span>Answer Locked & Submitted</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit & Lock Answer</span>
                        </>
                      )}
                    </button>

                    {activeQuestionIndex < questions.length - 1 && (
                      <button
                        onClick={() => handleSelectQuestion(activeQuestionIndex + 1)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center space-x-1.5"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular Code Debugging Workspace (3-Column Grid for Rounds 2 & 3) */
        <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Question List & Problem Statement (Width: 320px - 400px) */}
        <div className="w-80 md:w-96 border-r border-slate-800 flex flex-col bg-[#0b0e14] flex-shrink-0">
          {/* Question Selector Tabs */}
          <div className="p-3 border-b border-slate-800 bg-[#0d111a] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            {questions.map((q, idx) => {
              const isSelected = idx === activeQuestionIndex;
              const isSolved = q.bestSubmission?.verdict === 'ACCEPTED';
              const isAttempted = q.submissionCount > 0 && !isSolved;

              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 flex-shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : isSolved
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40'
                      : isAttempted
                      ? 'bg-amber-950/40 text-amber-400 border border-amber-500/30 hover:bg-amber-900/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>Q{idx + 1}</span>
                  {isSolved ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isAttempted ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Problem Statement Content */}
          {activeQuestion && (
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
              {/* Question Header */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-400">
                    Question {activeQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {activeQuestion.points} Points
                  </span>
                </div>
                <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                  {activeQuestion.title}
                </h2>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-400" />
                  <span>Problem Statement</span>
                </h4>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                  {activeQuestion.statement}
                </p>
              </div>

              {/* Visible Sample Test Cases */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sample Inputs & Outputs</span>
                </h4>

                {activeQuestion.testCases.map((tc, tcIdx) => (
                  <div
                    key={tc.id || tcIdx}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 font-mono text-[11px]"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Sample Input {tcIdx + 1}:</span>
                      <pre className="bg-[#080b11] p-2 rounded text-slate-200 mt-1 overflow-x-auto">
                        {tc.stdin || '<empty>'}
                      </pre>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Expected Output:</span>
                      <pre className="bg-[#080b11] p-2 rounded text-emerald-400 mt-1 overflow-x-auto">
                        {tc.expectedStdout}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER & RIGHT COLUMN: Monaco Editor (Top) & Execution Console (Bottom) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Header Bar */}
          <div className="h-10 border-b border-slate-800 bg-[#0d111a] px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <FileCode className="w-4 h-4 text-brand-400" />
              <span>
                solution.{team?.language === 'PYTHON' ? 'py' : team?.language === 'JAVA' ? 'java' : 'cpp'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetToBuggy}
                className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition flex items-center space-x-1"
                title="Reset to buggy template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Code</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Component */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={getEditorLanguage(team?.language)}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                fontSize: 13,
                fontFamily: "'Fira Code', Consolas, Monaco, monospace",
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                bracketPairColorization: { enabled: true },
                // DISALLOW AUTOCOMPLETE & INTELLISENSE FOR COMPETITIVE INTEGRITY
                quickSuggestions: false,
                suggestOnTriggerCharacters: false,
                snippetSuggestions: 'none',
                wordBasedSuggestions: 'off',
                parameterHints: { enabled: false },
                tabSize: 4,
                cursorBlinking: 'smooth',
                automaticLayout: true,
              }}
            />
          </div>

          {/* Execution Action Bar & Console Output (Height: 260px) */}
          <div className="h-64 border-t border-slate-800 bg-[#0d111a] flex flex-col flex-shrink-0">
            {/* Action Bar */}
            <div className="h-11 border-b border-slate-800/80 px-4 flex items-center justify-between flex-shrink-0 bg-[#0b0e14]">
              {/* Output Tabs */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBottomTab('sample')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    bottomTab === 'sample'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sample Results
                </button>
                <button
                  onClick={() => setBottomTab('custom')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    bottomTab === 'custom'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom Stdin
                </button>
                <button
                  onClick={() => setBottomTab('submissions')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    bottomTab === 'submissions'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Submissions
                </button>
              </div>

              {/* Run & Submit Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRunCode}
                  disabled={running || runCooldown > 0}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                    runCooldown > 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {running ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-400" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-brand-400" />
                  )}
                  <span>{runCooldown > 0 ? `Wait ${runCooldown}s` : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleSubmitSolution}
                  disabled={submitting}
                  className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20"
                >
                  {submitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* Console Output Panel */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {bottomTab === 'sample' && (
                <div className="space-y-3">
                  {!sampleResults ? (
                    <div className="text-slate-500 text-center py-6">
                      Click "Run Code" to evaluate your program against sample test cases.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-sans pb-2 border-b border-slate-800">
                        <span className="text-slate-400">
                          Sample Test Results ({sampleResults.filter((r) => r.isMatch).length}/
                          {sampleResults.length} Passed)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sampleResults.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className={`p-3 rounded-xl border text-[11px] space-y-1.5 ${
                              res.isMatch
                                ? 'bg-emerald-950/20 border-emerald-500/30'
                                : 'bg-rose-950/20 border-rose-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">Sample Case #{rIdx + 1}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  res.isMatch
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {res.verdict} ({res.execTimeMs}ms)
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-500">Expected:</span>
                              <pre className="text-emerald-400 overflow-x-auto">{res.expectedStdout}</pre>
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-500">Your Output:</span>
                              <pre className="text-slate-200 overflow-x-auto">
                                {res.actualStdout || '<no output>'}
                              </pre>
                            </div>

                            {res.stderr && (
                              <div>
                                <span className="text-[10px] text-rose-400">Errors:</span>
                                <pre className="text-rose-400 text-[10px] overflow-x-auto">{res.stderr}</pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {bottomTab === 'custom' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-sans font-bold text-slate-400 mb-1">
                      Custom Stdin:
                    </span>
                    <textarea
                      value={customStdin}
                      onChange={(e) => setCustomStdin(e.target.value)}
                      placeholder="Enter custom input to pass to your program..."
                      className="flex-1 w-full bg-[#080b11] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 resize-none font-mono"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-sans font-bold text-slate-400 mb-1">
                      Execution Output:
                    </span>
                    <div className="flex-1 bg-[#080b11] border border-slate-800 rounded-lg p-2.5 overflow-y-auto text-slate-200">
                      {customOutput ? (
                        <div>
                          <pre>{customOutput.stdout || '<empty stdout>'}</pre>
                          {customOutput.stderr && (
                            <pre className="text-rose-400 mt-2">{customOutput.stderr}</pre>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-600">Output will appear here after Run Code.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {bottomTab === 'submissions' && (
                <div className="space-y-3">
                  {submissionFeedback ? (
                    <div className={`p-4 rounded-xl border space-y-2 ${
                      submissionFeedback.verdict === 'ACCEPTED'
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-rose-950/20 border-rose-500/40'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {submissionFeedback.verdict === 'ACCEPTED' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )}
                          <span className="text-sm font-bold text-white">
                            Verdict: {submissionFeedback.verdict}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                          Awarded: {submissionFeedback.pointsAwarded} Points
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">
                        Passed {submissionFeedback.testsPassed} of {submissionFeedback.testsTotal} test cases (including hidden evaluation tests).
                      </p>

                      {submissionFeedback.compileError && (
                        <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded text-[11px] text-rose-300 overflow-x-auto">
                          {submissionFeedback.compileError}
                        </div>
                      )}
                    </div>
                  ) : activeQuestion?.bestSubmission ? (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-xs font-sans">Current Best Submission:</span>
                      <div className="text-sm font-bold text-emerald-400">
                        {activeQuestion.bestSubmission.verdict} ({activeQuestion.bestSubmission.pointsAwarded} pts)
                      </div>
                      <div className="text-xs text-slate-500 font-sans">
                        {activeQuestion.bestSubmission.testsPassed}/{activeQuestion.bestSubmission.testsTotal} test cases passed.
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-center py-6">
                      No submissions made yet for this question.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default RoundWorkspace;
