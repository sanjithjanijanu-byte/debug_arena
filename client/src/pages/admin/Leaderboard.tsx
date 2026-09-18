import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { getSocket } from '../../services/socket';
import { formatScore } from '../../utils/formatters';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Snowflake,
  Eye,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  X,
  Sparkles,
  Lock,
  Shield,
} from 'lucide-react';

export interface RankedTeam {
  rank: number;
  id: string;
  name: string;
  teamCode: string;
  language: string | null;
  status: string;
  score: number;
  solvedQuestionsCount: number;
  attemptedQuestionsCount: number;
  totalTestsPassed: number;
  lastSubmissionTime: string | null;
  tieBreakerPoints: number;
  participants: { name: string; rollNo: string }[];
}

export interface TiebreakerQuestion {
  id: string;
  title: string;
  language: string;
  points: number;
  round: {
    number: number;
    name: string;
    difficulty: string;
  };
}

export const Leaderboard: React.FC = () => {
  const [standings, setStandings] = useState<RankedTeam[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenAt, setFrozenAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('ALL');
  const [projectorFullscreen, setProjectorFullscreen] = useState(false);

  // Manual Score Override Modal State
  const [overrideModal, setOverrideModal] = useState<{
    isOpen: boolean;
    team: RankedTeam | null;
    newScore: string;
    reason: string;
    isSubmitting: boolean;
    error: string | null;
    success: string | null;
  }>({
    isOpen: false,
    team: null,
    newScore: '',
    reason: '',
    isSubmitting: false,
    error: null,
    success: null,
  });

  // Tie-Breaker Push Modal State
  const [tiebreakerModal, setTiebreakerModal] = useState<{
    isOpen: boolean;
    selectedTeamIds: string[];
    selectedQuestionId: string;
    questions: TiebreakerQuestion[];
    loadingQuestions: boolean;
    isSubmitting: boolean;
    error: string | null;
    success: string | null;
  }>({
    isOpen: false,
    selectedTeamIds: [],
    selectedQuestionId: '',
    questions: [],
    loadingQuestions: false,
    isSubmitting: false,
    error: null,
    success: null,
  });

  // Fetch Leaderboard
  const fetchLeaderboard = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setRefreshing(true);
      const res = await api.get('/admin/leaderboard');
      if (res.data.success) {
        setStandings(res.data.standings || []);
        setIsFrozen(res.data.isFrozen || false);
        setFrozenAt(res.data.frozenAt || null);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();

    const socket = getSocket();

    const handleUpdated = (payload: { standings: RankedTeam[] }) => {
      if (payload.standings) {
        setStandings(payload.standings);
      }
    };

    const handleFrozen = (payload: { isFrozen: boolean; frozenAt: string }) => {
      setIsFrozen(payload.isFrozen);
      setFrozenAt(payload.frozenAt);
    };

    const handleRevealed = (payload: { isFrozen: boolean; standings: RankedTeam[] }) => {
      setIsFrozen(false);
      setFrozenAt(null);
      if (payload.standings) {
        setStandings(payload.standings);
      }
      // Trigger reveal confetti celebration!
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    };

    socket.on('leaderboard:updated', handleUpdated);
    socket.on('leaderboard:frozen', handleFrozen);
    socket.on('leaderboard:revealed', handleRevealed);

    // Esc key exits projector mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProjectorFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      socket.off('leaderboard:updated', handleUpdated);
      socket.off('leaderboard:frozen', handleFrozen);
      socket.off('leaderboard:revealed', handleRevealed);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fetchLeaderboard]);

  // Toggle Freeze / Reveal
  const handleToggleFreeze = async () => {
    try {
      const targetState = !isFrozen;
      const res = await api.post('/admin/leaderboard/freeze', { freeze: targetState });
      if (res.data.success) {
        setIsFrozen(res.data.isFrozen);
        setFrozenAt(res.data.frozenAt);
        if (!res.data.isFrozen) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
          });
        }
      }
    } catch (err: any) {
      console.error('Failed to toggle freeze:', err);
      alert(err.response?.data?.error?.message || 'Failed to toggle leaderboard freeze');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const adminToken = localStorage.getItem('adminToken');
    const downloadUrl = `/api/admin/leaderboard/export/csv?token=${encodeURIComponent(adminToken || '')}`;
    
    // Create anchor and download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `debug_arena_leaderboard_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Score Override Modal
  const openOverrideModal = (team: RankedTeam) => {
    setOverrideModal({
      isOpen: true,
      team,
      newScore: team.score.toString(),
      reason: '',
      isSubmitting: false,
      error: null,
      success: null,
    });
  };

  // Submit Score Override
  const submitScoreOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideModal.team) return;

    const numScore = parseFloat(overrideModal.newScore);
    if (isNaN(numScore) || numScore < 0) {
      setOverrideModal((prev) => ({ ...prev, error: 'Please enter a valid non-negative number for score.' }));
      return;
    }

    if (!overrideModal.reason || overrideModal.reason.trim().length < 3) {
      setOverrideModal((prev) => ({ ...prev, error: 'A valid reason (minimum 3 characters) is required for the audit log.' }));
      return;
    }

    setOverrideModal((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const res = await api.post('/admin/leaderboard/override', {
        teamId: overrideModal.team.id,
        newScore: numScore,
        reason: overrideModal.reason.trim(),
      });

      if (res.data.success) {
        setOverrideModal((prev) => ({
          ...prev,
          isSubmitting: false,
          success: `Score updated to ${numScore} pts!`,
        }));
        fetchLeaderboard(true);
        setTimeout(() => {
          setOverrideModal((prev) => ({ ...prev, isOpen: false }));
        }, 1200);
      }
    } catch (err: any) {
      setOverrideModal((prev) => ({
        ...prev,
        isSubmitting: false,
        error: err.response?.data?.error?.message || 'Failed to update score.',
      }));
    }
  };

  // Open Tiebreaker Modal
  const openTiebreakerModal = async () => {
    setTiebreakerModal((prev) => ({
      ...prev,
      isOpen: true,
      selectedTeamIds: [],
      selectedQuestionId: '',
      loadingQuestions: true,
      error: null,
      success: null,
    }));

    try {
      const res = await api.get('/admin/leaderboard/tiebreaker-questions');
      if (res.data.success) {
        setTiebreakerModal((prev) => ({
          ...prev,
          questions: res.data.questions || [],
          loadingQuestions: false,
          selectedQuestionId: res.data.questions[0]?.id || '',
        }));
      }
    } catch (err) {
      setTiebreakerModal((prev) => ({
        ...prev,
        loadingQuestions: false,
        error: 'Failed to fetch tiebreaker questions.',
      }));
    }
  };

  // Submit Tiebreaker Assignment
  const submitTiebreaker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tiebreakerModal.selectedTeamIds.length === 0) {
      setTiebreakerModal((prev) => ({ ...prev, error: 'Please select at least one tied team.' }));
      return;
    }
    if (!tiebreakerModal.selectedQuestionId) {
      setTiebreakerModal((prev) => ({ ...prev, error: 'Please select a tiebreaker question.' }));
      return;
    }

    setTiebreakerModal((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const res = await api.post('/admin/leaderboard/tie-breaker', {
        teamIds: tiebreakerModal.selectedTeamIds,
        questionId: tiebreakerModal.selectedQuestionId,
      });

      if (res.data.success) {
        setTiebreakerModal((prev) => ({
          ...prev,
          isSubmitting: false,
          success: `Tiebreaker question dispatched to ${res.data.count} teams!`,
        }));
        setTimeout(() => {
          setTiebreakerModal((prev) => ({ ...prev, isOpen: false }));
        }, 1400);
      }
    } catch (err: any) {
      setTiebreakerModal((prev) => ({
        ...prev,
        isSubmitting: false,
        error: err.response?.data?.error?.message || 'Failed to dispatch tiebreaker question.',
      }));
    }
  };

  // Detect Tied Teams (teams with identical score, tests passed, and lastSubmissionTime)
  const tiedTeamGroups = useMemo(() => {
    const groups: { [key: string]: RankedTeam[] } = {};
    standings.forEach((t) => {
      const key = `${t.score}_${t.totalTestsPassed}_${t.lastSubmissionTime || 'none'}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    });
    return Object.values(groups).filter((g) => g.length > 1);
  }, [standings]);

  // Filtered Standings
  const filteredStandings = useMemo(() => {
    return standings.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.teamCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLang = languageFilter === 'ALL' || team.language === languageFilter;
      return matchesSearch && matchesLang;
    });
  }, [standings, searchQuery, languageFilter]);

  // Top 3 for Podium
  const top3 = useMemo(() => {
    return standings.slice(0, 3);
  }, [standings]);

  const team1 = top3[0];
  const team2 = top3[1];
  const team3 = top3[2];

  // Quick stats
  const totalScore = useMemo(() => standings.reduce((acc, t) => acc + t.score, 0), [standings]);
  const totalSolved = useMemo(() => standings.reduce((acc, t) => acc + t.solvedQuestionsCount, 0), [standings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-medium">Computing live four-tier standings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Frozen Alert Banner */}
      {isFrozen && (
        <div className="glass-panel border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900/60 p-4 rounded-xl flex items-center justify-between shadow-lg shadow-amber-950/20 animate-pulse-fast">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Snowflake className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-300 text-sm tracking-wide uppercase">
                  Leaderboard Freeze Active
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {frozenAt ? new Date(frozenAt).toLocaleTimeString() : 'Frozen'}
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Participant screens and public projector views are locked to maintain suspense. You are viewing the live organizer feed.
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleFreeze}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-emerald-950/40 flex items-center space-x-2 shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>Reveal Final Standings</span>
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>Live Leaderboard</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                4-Tier Ranking
              </span>
            </h1>
            {!isFrozen ? (
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Broadcast</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Frozen</span>
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Official ranking criteria: Total Score &rarr; Test Cases Passed &rarr; Earliest Submission &rarr; Tie-Breaker Points.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh */}
          <button
            onClick={() => fetchLeaderboard()}
            disabled={refreshing}
            className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-brand-400' : ''}`} />
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" />
            <span>Export CSV</span>
          </button>

          {/* Tiebreaker Dispatch Modal Button */}
          {tiedTeamGroups.length > 0 && (
            <button
              onClick={openTiebreakerModal}
              className="px-3.5 py-2 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-all animate-pulse"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Resolve Ties ({tiedTeamGroups.length})</span>
            </button>
          )}

          {/* Freeze / Unfreeze Toggle */}
          <button
            onClick={handleToggleFreeze}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all shadow-md ${
              isFrozen
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
                : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white'
            }`}
          >
            {isFrozen ? (
              <>
                <Eye className="w-4 h-4" />
                <span>Reveal Standings</span>
              </>
            ) : (
              <>
                <Snowflake className="w-4 h-4" />
                <span>Freeze Leaderboard</span>
              </>
            )}
          </button>

          {/* Projector Fullscreen Mode */}
          <button
            onClick={() => setProjectorFullscreen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-brand-950/40 transition-all"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Projector View</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Competing Teams</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{standings.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {standings.filter((t) => t.solvedQuestionsCount > 0).length} on the scoreboard
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Questions Solved</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{totalSolved}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across all 3 rounds</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Leader Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {formatScore(standings[0]?.score)} <span className="text-xs text-amber-300 font-normal">pts</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {standings[0] ? `${standings[0].name} (${standings[0].teamCode})` : 'None yet'}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Points Awarded</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400 mt-1">{totalScore.toFixed(1)}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Max event capacity: 250 pts</div>
        </div>
      </div>

      {/* Top 3 Championship Podium */}
      {standings.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">Championship Podium</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Leading Contenders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto pt-4 pb-2">
            {/* 2nd Place (Silver) */}
            <div className="order-2 md:order-1 flex flex-col items-center">
              {team2 ? (
                <div className="w-full glass-panel border border-slate-600/50 bg-gradient-to-b from-slate-800/60 to-slate-900/90 rounded-2xl p-5 text-center relative shadow-lg shadow-slate-950/50 hover:border-slate-400 transition-all group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-100 flex items-center justify-center text-slate-900 font-black text-sm shadow-md">
                    2
                  </div>
                  <div className="mt-2 text-slate-300 flex items-center justify-center space-x-1">
                    <Medal className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Silver</span>
                  </div>
                  <h3 className="font-extrabold text-white text-base mt-2 truncate">{team2.name}</h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{team2.teamCode}</div>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-semibold text-slate-300">
                    {team2.language || 'Unselected'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-3 max-w-full truncate px-2">
                    {formatScore(team2.score)}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">points</div>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs text-slate-400">
                    <span>{team2.solvedQuestionsCount} Solved</span>
                    <span>•</span>
                    <span>{team2.totalTestsPassed} Tests</span>
                  </div>
                </div>
              ) : (
                <div className="w-full glass-panel border border-slate-800/60 p-5 rounded-2xl text-center text-slate-600 text-xs">
                  Empty Spot
                </div>
              )}
            </div>

            {/* 1st Place (Gold) */}
            <div className="order-1 md:order-2 flex flex-col items-center">
              {team1 ? (
                <div className="w-full glass-panel border-2 border-amber-500/60 bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950 rounded-2xl p-6 text-center relative shadow-xl shadow-amber-950/30 hover:border-amber-400 transition-all transform md:-translate-y-3 group">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-200 flex items-center justify-center text-slate-950 font-black text-base shadow-lg shadow-amber-500/30">
                    <Crown className="w-5 h-5 text-slate-950 fill-slate-950" />
                  </div>
                  <div className="mt-3 text-amber-400 flex items-center justify-center space-x-1">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400">Champion #1</span>
                  </div>
                  <h3 className="font-black text-white text-lg mt-2 truncate">{team1.name}</h3>
                  <div className="text-xs font-mono text-amber-300/80 mt-0.5">{team1.teamCode}</div>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300">
                    {team1.language || 'Unselected'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mt-3 max-w-full truncate px-2">
                    {formatScore(team1.score)}
                  </div>
                  <div className="text-xs text-amber-300/70 font-semibold mt-0.5">points</div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-around text-xs text-slate-300 font-medium">
                    <span className="text-emerald-400 font-bold">{team1.solvedQuestionsCount} Solved</span>
                    <span>•</span>
                    <span>{team1.totalTestsPassed} Tests Passed</span>
                  </div>
                </div>
              ) : (
                <div className="w-full glass-panel border border-slate-800/60 p-5 rounded-2xl text-center text-slate-600 text-xs">
                  Empty Spot
                </div>
              )}
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="order-3 flex flex-col items-center">
              {team3 ? (
                <div className="w-full glass-panel border border-amber-700/50 bg-gradient-to-b from-amber-950/20 to-slate-900/90 rounded-2xl p-5 text-center relative shadow-lg shadow-amber-950/30 hover:border-amber-600 transition-all group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-700 border-2 border-amber-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                    3
                  </div>
                  <div className="mt-2 text-amber-600 flex items-center justify-center space-x-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bronze</span>
                  </div>
                  <h3 className="font-extrabold text-white text-base mt-2 truncate">{team3.name}</h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{team3.teamCode}</div>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-semibold text-slate-300">
                    {team3.language || 'Unselected'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-200 mt-3 max-w-full truncate px-2">
                    {formatScore(team3.score)}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">points</div>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs text-slate-400">
                    <span>{team3.solvedQuestionsCount} Solved</span>
                    <span>•</span>
                    <span>{team3.totalTestsPassed} Tests</span>
                  </div>
                </div>
              ) : (
                <div className="w-full glass-panel border border-slate-800/60 p-5 rounded-2xl text-center text-slate-600 text-xs">
                  Empty Spot
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by team name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium">Language:</span>
          {['ALL', 'PYTHON', 'JAVA', 'CPP'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguageFilter(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                languageFilter === lang
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-950/50'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'CPP' ? 'C++' : lang === 'ALL' ? 'All' : lang.charAt(0) + lang.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Standings Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4">Language</th>
                <th className="py-3.5 px-4 text-right">Score</th>
                <th className="py-3.5 px-4 text-center">Solved</th>
                <th className="py-3.5 px-4 text-center">Tests Passed</th>
                <th className="py-3.5 px-4">Last Submission</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {filteredStandings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No teams found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredStandings.map((team) => {
                  const isGold = team.rank === 1;
                  const isSilver = team.rank === 2;
                  const isBronze = team.rank === 3;

                  return (
                    <tr
                      key={team.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isGold ? 'bg-amber-950/10' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center">
                        {isGold && (
                          <div className="w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shadow-amber-500/20">
                            1
                          </div>
                        )}
                        {isSilver && (
                          <div className="w-7 h-7 mx-auto rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                            2
                          </div>
                        )}
                        {isBronze && (
                          <div className="w-7 h-7 mx-auto rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-xs shadow-md">
                            3
                          </div>
                        )}
                        {!isGold && !isSilver && !isBronze && (
                          <span className="font-mono font-bold text-slate-400">#{team.rank}</span>
                        )}
                      </td>

                      {/* Team Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{team.name}</div>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="font-mono text-[11px] text-slate-400">{team.teamCode}</span>
                          {team.participants?.length > 0 && (
                            <span className="text-[10px] text-slate-500">
                              ({team.participants.map((p) => p.name).join(', ')})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Language */}
                      <td className="py-3.5 px-4">
                        {team.language === 'PYTHON' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Python
                          </span>
                        )}
                        {team.language === 'JAVA' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Java
                          </span>
                        )}
                        {team.language === 'CPP' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            C++
                          </span>
                        )}
                        {!team.language && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400">
                            Not Selected
                          </span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="text-base font-black text-white">
                          {formatScore(team.score)}
                          <span className="text-[10px] font-medium text-slate-400 ml-1">pts</span>
                        </div>
                        {team.tieBreakerPoints > 0 && (
                          <div className="text-[10px] text-amber-400 font-semibold mt-0.5">
                            +{team.tieBreakerPoints} tiebreaker
                          </div>
                        )}
                      </td>

                      {/* Solved */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-emerald-400">{team.solvedQuestionsCount}</span>
                        <span className="text-slate-500 text-[11px]"> / {team.attemptedQuestionsCount} att</span>
                      </td>

                      {/* Tests Passed */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-semibold text-slate-200">{team.totalTestsPassed}</span>
                      </td>

                      {/* Last Submission */}
                      <td className="py-3.5 px-4 text-slate-400">
                        {team.lastSubmissionTime ? (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="font-mono text-[11px]">
                              {new Date(team.lastSubmissionTime).toLocaleTimeString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-600 font-mono text-[11px]">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {team.status === 'DISQUALIFIED' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Disqualified
                          </span>
                        ) : team.status === 'ACTIVE' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400">
                            {team.status}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => openOverrideModal(team)}
                          className="px-2.5 py-1 rounded-md border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-[11px] transition-all"
                        >
                          Override Score
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Score Override Modal */}
      {overrideModal.isOpen && overrideModal.team && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel border border-slate-700 bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Manual Score Override</h3>
              </div>
              <button
                onClick={() => setOverrideModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-300 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                Score adjustments are immutably recorded in the system audit log with your organizer account ID.
              </span>
            </div>

            <form onSubmit={submitScoreOverride} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Target Team</label>
                <div className="mt-1 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-white font-bold flex justify-between items-center">
                  <span>{overrideModal.team.name}</span>
                  <span className="font-mono text-xs text-slate-400">{overrideModal.team.teamCode}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400">New Score (pts)</label>
                  <span className="text-xs text-slate-500">Current: {formatScore(overrideModal.team.score)} pts</span>
                </div>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="500"
                  required
                  value={overrideModal.newScore}
                  onChange={(e) => setOverrideModal((prev) => ({ ...prev, newScore: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                  placeholder="e.g. 85"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">
                  Mandatory Audit Reason <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={overrideModal.reason}
                  onChange={(e) => setOverrideModal((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="e.g., Awarded 10 bonus points for edge case workaround verified by judging panel."
                  className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {overrideModal.error && (
                <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/50 p-2.5 rounded-lg">
                  {overrideModal.error}
                </div>
              )}

              {overrideModal.success && (
                <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 p-2.5 rounded-lg">
                  {overrideModal.success}
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOverrideModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={overrideModal.isSubmitting}
                  className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors shadow-md shadow-brand-950/50 disabled:opacity-50"
                >
                  {overrideModal.isSubmitting ? 'Saving...' : 'Apply Override'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tie-Breaker Dispatch Modal */}
      {tiebreakerModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel border border-slate-700 bg-slate-900 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Assign Tie-Breaker Question</h3>
              </div>
              <button
                onClick={() => setTiebreakerModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select tied teams and dispatch a designated tie-breaker question directly into their workspaces in real-time.
            </p>

            <form onSubmit={submitTiebreaker} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Select Tied Teams</label>
                <div className="mt-1 max-h-40 overflow-y-auto space-y-1.5 p-2 bg-slate-950/80 border border-slate-800 rounded-lg">
                  {standings.map((t) => {
                    const isSelected = tiebreakerModal.selectedTeamIds.includes(t.id);
                    return (
                      <label
                        key={t.id}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer text-xs transition-colors ${
                          isSelected
                            ? 'bg-brand-500/20 border border-brand-500/30 text-white'
                            : 'bg-slate-900/50 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTiebreakerModal((prev) => ({
                                  ...prev,
                                  selectedTeamIds: [...prev.selectedTeamIds, t.id],
                                }));
                              } else {
                                setTiebreakerModal((prev) => ({
                                  ...prev,
                                  selectedTeamIds: prev.selectedTeamIds.filter((id) => id !== t.id),
                                }));
                              }
                            }}
                            className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-0"
                          />
                          <span className="font-bold">{t.name}</span>
                          <span className="font-mono text-[11px] text-slate-500">({t.teamCode})</span>
                        </div>
                        <span className="font-mono text-xs text-amber-400 font-bold">{formatScore(t.score)} pts</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Choose Tiebreaker Question</label>
                {tiebreakerModal.loadingQuestions ? (
                  <div className="p-3 text-center text-xs text-slate-500">Loading tiebreaker questions...</div>
                ) : tiebreakerModal.questions.length === 0 ? (
                  <div className="p-3 text-center text-xs text-amber-400 bg-amber-950/20 border border-amber-800/40 rounded-lg">
                    No questions currently designated as tiebreakers (isTiebreaker=true).
                  </div>
                ) : (
                  <select
                    value={tiebreakerModal.selectedQuestionId}
                    onChange={(e) => setTiebreakerModal((prev) => ({ ...prev, selectedQuestionId: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    {tiebreakerModal.questions.map((q) => (
                      <option key={q.id} value={q.id}>
                        [{q.language}] {q.title} ({q.points} pts - Round {q.round.number})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {tiebreakerModal.error && (
                <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/50 p-2.5 rounded-lg">
                  {tiebreakerModal.error}
                </div>
              )}

              {tiebreakerModal.success && (
                <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 p-2.5 rounded-lg">
                  {tiebreakerModal.success}
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTiebreakerModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tiebreakerModal.isSubmitting || tiebreakerModal.questions.length === 0}
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-md shadow-amber-950/50 disabled:opacity-50"
                >
                  {tiebreakerModal.isSubmitting ? 'Dispatching...' : 'Dispatch Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Projector / Cinema View */}
      {projectorFullscreen && (
        <div className="fixed inset-0 z-[100] bg-[#05070e] text-white flex flex-col p-6 sm:p-10 overflow-y-auto animate-in fade-in duration-300">
          {/* Cinema Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center space-x-3">
                  <span>COLLEGE TECH FEST — DEBUGGING ARENA</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Official Championship Standings • 4-Tier Auto-Scoring Engine
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isFrozen ? (
                <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm tracking-wide animate-pulse">
                  <Snowflake className="w-4 h-4 animate-spin" />
                  <span>STANDINGS FROZEN</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-sm tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIVE STANDINGS</span>
                </div>
              )}

              <button
                onClick={() => setProjectorFullscreen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Exit Cinema (Esc)</span>
              </button>
            </div>
          </div>

          {/* Projector Podium Showcase */}
          {standings.length > 0 && (
            <div className="my-8 max-w-5xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* #2 Silver */}
                <div className="order-2 md:order-1 glass-panel border border-slate-600/60 bg-gradient-to-b from-slate-800/80 to-slate-950 p-6 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-300 text-slate-950 font-black text-base flex items-center justify-center shadow-lg">
                    2
                  </div>
                  <div className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2">Rank 2 • Silver</div>
                  <div className="text-xl font-black text-white mt-2 truncate">{team2?.name || '—'}</div>
                  <div className="text-xs font-mono text-slate-400">{team2?.teamCode || ''}</div>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-4 max-w-full truncate px-2">
                    {formatScore(team2?.score)}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">TOTAL POINTS</div>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-around text-xs text-slate-300">
                    <span>{team2?.solvedQuestionsCount ?? 0} Solved</span>
                    <span>{team2?.totalTestsPassed ?? 0} Tests</span>
                  </div>
                </div>

                {/* #1 Champion Gold */}
                <div className="order-1 md:order-2 glass-panel border-2 border-amber-400/80 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-8 rounded-3xl text-center shadow-2xl shadow-amber-950/40 transform md:-translate-y-4 relative overflow-hidden">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-xl shadow-amber-500/40 border-2 border-yellow-100">
                    <Crown className="w-7 h-7 fill-slate-950 text-slate-950" />
                  </div>
                  <div className="text-amber-400 text-xs font-black uppercase tracking-widest mt-3">Grand Champion</div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-2 truncate">{team1?.name || '—'}</div>
                  <div className="text-xs font-mono text-amber-300/80">{team1?.teamCode || ''}</div>
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mt-4 max-w-full truncate px-2">
                    {formatScore(team1?.score)}
                  </div>
                  <div className="text-xs text-amber-300 font-black tracking-wider mt-1">TOTAL POINTS</div>
                  <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-around text-xs text-slate-200 font-bold">
                    <span className="text-emerald-400">{team1?.solvedQuestionsCount ?? 0} Solved</span>
                    <span>{team1?.totalTestsPassed ?? 0} Tests Passed</span>
                  </div>
                </div>

                {/* #3 Bronze */}
                <div className="order-3 glass-panel border border-amber-700/60 bg-gradient-to-b from-amber-950/30 to-slate-950 p-6 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-700 text-white font-black text-base flex items-center justify-center shadow-lg">
                    3
                  </div>
                  <div className="text-amber-600 text-xs font-bold uppercase tracking-widest mt-2">Rank 3 • Bronze</div>
                  <div className="text-xl font-black text-white mt-2 truncate">{team3?.name || '—'}</div>
                  <div className="text-xs font-mono text-slate-400">{team3?.teamCode || ''}</div>
                  <div className="text-4xl sm:text-5xl font-black text-amber-200 mt-4 max-w-full truncate px-2">
                    {formatScore(team3?.score)}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">TOTAL POINTS</div>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-around text-xs text-slate-300">
                    <span>{team3?.solvedQuestionsCount ?? 0} Solved</span>
                    <span>{team3?.totalTestsPassed ?? 0} Tests</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projector Ranked List */}
          <div className="max-w-5xl mx-auto w-full glass-panel border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6 text-center w-20">Rank</th>
                  <th className="py-4 px-6">Team Details</th>
                  <th className="py-4 px-6">Language</th>
                  <th className="py-4 px-6 text-right">Score</th>
                  <th className="py-4 px-6 text-center">Solved</th>
                  <th className="py-4 px-6 text-center">Tests</th>
                  <th className="py-4 px-6">Last Sub</th>
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
      )}
    </div>
  );
};
