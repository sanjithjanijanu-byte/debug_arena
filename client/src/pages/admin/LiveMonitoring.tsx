import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { api } from '../../services/api';
import { getSocket } from '../../services/socket';
import { formatScore } from '../../utils/formatters';
import {
  Activity,
  Users,
  Radio,
  Search,
  RefreshCw,
  Eye,
  AlertTriangle,
  UserX,
  UserCheck,
  Clock,
  Send,
  Loader2,
  X,
  History,
  Code2,
  Zap,
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  rollNo: string;
}

interface Violation {
  id: string;
  type: string;
  details: string | null;
  occurredAt: string;
}

interface TeamMonitoringData {
  id: string;
  name: string;
  teamCode: string;
  language: string | null;
  status: string;
  score: number;
  isOnline: boolean;
  activeRoundNumber?: number;
  timeRemainingSeconds?: number;
  solvedQuestionsCount: number;
  attemptedQuestionsCount: number;
  totalTestsPassed: number;
  lastActivityAt: string;
  violationCount: number;
  recentViolations: Violation[];
  disqualifiedAt: string | null;
  reinstatedAt: string | null;
  participants: Participant[];
}

interface LiveCodeDraft {
  questionId: string;
  questionTitle: string;
  roundNumber: number;
  points: number;
  code: string;
  buggyCode: string;
  statement: string;
  updatedAt: string;
}

interface LiveCodeSubmission {
  id: string;
  questionId: string;
  questionTitle: string;
  verdict: string;
  pointsAwarded: number;
  testsPassed: number;
  testsTotal: number;
  submittedAt: string;
  code: string;
}

export const LiveMonitoring: React.FC = () => {
  const [teams, setTeams] = useState<TeamMonitoringData[]>([]);
  const [activeRound, setActiveRound] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');

  // Live Code Modal
  const [inspectTeam, setInspectTeam] = useState<TeamMonitoringData | null>(null);
  const [inspectCodeData, setInspectCodeData] = useState<{
    drafts: LiveCodeDraft[];
    submissions: LiveCodeSubmission[];
  } | null>(null);
  const [inspectQuestionIdx, setInspectQuestionIdx] = useState(0);
  const [loadingCode, setLoadingCode] = useState(false);

  // Warning Message Modal
  const [warningTeam, setWarningTeam] = useState<TeamMonitoringData | null>(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [sendingWarning, setSendingWarning] = useState(false);

  // Disqualification Modal
  const [disqualifyTeamTarget, setDisqualifyTeamTarget] = useState<TeamMonitoringData | null>(null);
  const [disqualifyReason, setDisqualifyReason] = useState('Repeated tab switches detected');
  const [processingDisqualify, setProcessingDisqualify] = useState(false);

  // Reinstatement Modal
  const [reinstateTeamTarget, setReinstateTeamTarget] = useState<TeamMonitoringData | null>(null);
  const [reinstateReason, setReinstateReason] = useState('False positive verified by lab coordinator');
  const [compensationMins, setCompensationMins] = useState(2);
  const [processingReinstate, setProcessingReinstate] = useState(false);

  // Violations History Modal
  const [violationInspectTeam, setViolationInspectTeam] = useState<TeamMonitoringData | null>(null);

  // Extend Team Time Modal
  const [extendTimeTeam, setExtendTimeTeam] = useState<TeamMonitoringData | null>(null);
  const [extendMins, setExtendMins] = useState(5);
  const [processingExtend, setProcessingExtend] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchLiveTeams = useCallback(async (quiet = false) => {
    try {
      if (!quiet) setRefreshing(true);
      const res = await api.get('/admin/proctoring/teams');
      if (res.data.success) {
        setTeams(res.data.teams);
        setActiveRound(res.data.activeRound);
      }
    } catch (err) {
      console.error('Failed to fetch live monitoring data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveTeams();

    const socket = getSocket();

    // Auto-update on real-time events
    const handleStatusChanged = () => fetchLiveTeams(true);
    const handleViolation = (data: any) => {
      fetchLiveTeams(true);
      showToast(`⚠️ Violation: Team ${data.teamCode} - ${data.type}`);
    };
    const handleSubmission = (data: any) => {
      fetchLiveTeams(true);
      showToast(`📥 Submission: ${data.teamCode} on ${data.questionTitle} (${data.verdict})`);
    };

    socket.on('team:status_changed', handleStatusChanged);
    socket.on('team:violation', handleViolation);
    socket.on('submission:received', handleSubmission);

    // Periodic poll fallback every 5 seconds
    const interval = setInterval(() => fetchLiveTeams(true), 5000);

    return () => {
      socket.off('team:status_changed', handleStatusChanged);
      socket.off('team:violation', handleViolation);
      socket.off('submission:received', handleSubmission);
      clearInterval(interval);
    };
  }, [fetchLiveTeams]);

  // Open Live Code Modal
  const handleOpenLiveCode = async (team: TeamMonitoringData) => {
    setInspectTeam(team);
    setInspectQuestionIdx(0);
    setInspectCodeData(null);
    setLoadingCode(true);

    try {
      const res = await api.get(`/admin/proctoring/teams/${team.id}/code`);
      if (res.data.success) {
        setInspectCodeData({
          drafts: res.data.drafts,
          submissions: res.data.submissions,
        });
      }
    } catch (err) {
      console.error('Failed to load team code:', err);
    } finally {
      setLoadingCode(false);
    }
  };

  // Dispatch Warning Message
  const handleSendWarning = async () => {
    if (!warningTeam || !warningMessage.trim()) return;

    try {
      setSendingWarning(true);
      const res = await api.post(`/admin/proctoring/teams/${warningTeam.id}/warning`, {
        message: warningMessage,
      });
      if (res.data.success) {
        showToast(res.data.message);
        setWarningTeam(null);
        setWarningMessage('');
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to send warning');
    } finally {
      setSendingWarning(false);
    }
  };

  // Disqualify Team
  const handleConfirmDisqualify = async () => {
    if (!disqualifyTeamTarget || !disqualifyReason.trim()) return;

    try {
      setProcessingDisqualify(true);
      const res = await api.post(`/admin/proctoring/teams/${disqualifyTeamTarget.id}/disqualify`, {
        reason: disqualifyReason,
      });
      if (res.data.success) {
        showToast(`Team ${disqualifyTeamTarget.teamCode} disqualified.`);
        setDisqualifyTeamTarget(null);
        await fetchLiveTeams(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to disqualify team');
    } finally {
      setProcessingDisqualify(false);
    }
  };

  // Reinstate Team
  const handleConfirmReinstate = async () => {
    if (!reinstateTeamTarget || !reinstateReason.trim()) return;

    try {
      setProcessingReinstate(true);
      const res = await api.post(`/admin/proctoring/teams/${reinstateTeamTarget.id}/reinstate`, {
        reason: reinstateReason,
        compensationMinutes: compensationMins,
      });
      if (res.data.success) {
        showToast(`Team ${reinstateTeamTarget.teamCode} reinstated (+${compensationMins}m).`);
        setReinstateTeamTarget(null);
        await fetchLiveTeams(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to reinstate team');
    } finally {
      setProcessingReinstate(false);
    }
  };

  // Extend Team Time
  const handleConfirmExtendTeam = async () => {
    if (!extendTimeTeam) return;

    try {
      setProcessingExtend(true);
      const res = await api.post(`/admin/proctoring/teams/${extendTimeTeam.id}/extend`, {
        extraMinutes: extendMins,
      });
      if (res.data.success) {
        showToast(`Granted +${extendMins}m to ${extendTimeTeam.teamCode}`);
        setExtendTimeTeam(null);
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to extend time');
    } finally {
      setProcessingExtend(false);
    }
  };

  // Filter Teams
  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.participants.some((p) => p.rollNo.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'ALL'
          ? true
          : selectedStatus === 'ONLINE'
          ? t.isOnline
          : t.status === selectedStatus;

      const matchesLanguage = selectedLanguage === 'ALL' ? true : t.language === selectedLanguage;

      return matchesSearch && matchesStatus && matchesLanguage;
    });
  }, [teams, searchQuery, selectedStatus, selectedLanguage]);

  // Statistics
  const totalTeams = teams.length;
  const onlineTeams = teams.filter((t) => t.isOnline).length;
  const activeTeams = teams.filter((t) => t.status === 'ACTIVE').length;
  const disqualifiedTeams = teams.filter((t) => t.status === 'DISQUALIFIED').length;
  const totalViolations = teams.reduce((sum, t) => sum + t.violationCount, 0);

  const formatTimer = (secs?: number) => {
    if (secs === undefined || secs === null || secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatRelativeTime = (isoString: string) => {
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 10) return 'just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const getStatusBadge = (status: string, isOnline: boolean) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Active
          </span>
        );
      case 'DISQUALIFIED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
            Disqualified
          </span>
        );
      case 'REINSTATED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
            Reinstated
          </span>
        );
      case 'IDLE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Idle
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
            {isOnline ? 'Online' : 'Not Logged In'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-brand-400/30 animate-in fade-in slide-in-from-bottom-5">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-sm">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Live Proctoring & Monitoring</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              <Radio className="w-3 h-3 text-emerald-400 mr-1.5 animate-pulse" />
              Live Telemetry
            </span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time participant feed: live editor inspection, anti-cheat violation auditing, and instant moderation actions {activeRound ? `• Live in Round ${activeRound.number}: ${activeRound.name}` : ''}.
          </p>
        </div>

        <button
          onClick={() => fetchLiveTeams()}
          disabled={refreshing}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition border border-slate-700 flex items-center space-x-2 self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Feeds</span>
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a]">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Teams</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalTeams}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a]">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Online Now</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{onlineTeams}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a]">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active in Code</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">{activeTeams}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a]">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Disqualified</span>
            <UserX className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{disqualifiedTeams}</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Violations</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{totalViolations}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-[#0d111a] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams by name, team code, or roll number..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ONLINE">Online Only</option>
            <option value="ACTIVE">Active in Round</option>
            <option value="DISQUALIFIED">Disqualified</option>
            <option value="REINSTATED">Reinstated</option>
            <option value="NOT_LOGGED_IN">Not Logged In</option>
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Languages</option>
            <option value="PYTHON">Python</option>
            <option value="JAVA">Java</option>
            <option value="CPP">C++</option>
          </select>
        </div>
      </div>

      {/* Main Proctoring Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 bg-[#0d111a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-3">Language</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Time Left</th>
                <th className="py-3.5 px-3">Score & Solved</th>
                <th className="py-3.5 px-3">Violations</th>
                <th className="py-3.5 px-3">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-400 mx-auto mb-2" />
                    <span>Streaming live team feeds...</span>
                  </td>
                </tr>
              ) : filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No teams match current filters.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr
                    key={team.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      team.status === 'DISQUALIFIED' ? 'bg-rose-950/10' : ''
                    }`}
                  >
                    {/* Team Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            team.isOnline
                              ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                              : 'bg-slate-600'
                          }`}
                          title={team.isOnline ? 'Online' : 'Offline'}
                        />
                        <div>
                          <span className="font-bold text-white block">{team.name}</span>
                          <span className="font-mono text-[11px] text-slate-400">
                            {team.teamCode}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Language */}
                    <td className="py-3.5 px-3">
                      {team.language ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-brand-500/10 text-brand-400 border border-brand-500/30">
                          {team.language}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Unset</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">{getStatusBadge(team.status, team.isOnline)}</td>

                    {/* Round & Time Remaining */}
                    <td className="py-3.5 px-3 font-mono">
                      {team.timeRemainingSeconds && team.timeRemainingSeconds > 0 ? (
                        <span
                          className={`font-bold ${
                            team.timeRemainingSeconds < 60
                              ? 'text-rose-400 animate-pulse'
                              : team.timeRemainingSeconds < 300
                              ? 'text-amber-400'
                              : 'text-slate-300'
                          }`}
                        >
                          {formatTimer(team.timeRemainingSeconds)}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Score & Solved */}
                    <td className="py-3.5 px-3">
                      <div className="font-mono">
                        <span className="font-bold text-white text-sm">{formatScore(team.score)}</span>
                        <span className="text-[10px] text-slate-400 ml-1">pts</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {team.solvedQuestionsCount} solved / {team.attemptedQuestionsCount} att /{' '}
                        {team.totalTestsPassed} passed
                      </div>
                    </td>

                    {/* Violations */}
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => setViolationInspectTeam(team)}
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                          team.violationCount > 2
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                            : team.violationCount > 0
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                        title="Click to view violation history"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>{team.violationCount}</span>
                      </button>
                    </td>

                    {/* Last Activity */}
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                      {formatRelativeTime(team.lastActivityAt)}
                    </td>

                    {/* Moderation Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Live Code Inspect */}
                        <button
                          onClick={() => handleOpenLiveCode(team)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition border border-slate-700"
                          title="View Live Code"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Send Warning Message */}
                        <button
                          onClick={() => {
                            setWarningTeam(team);
                            setWarningMessage('Warning: Please stay focused on your workspace tab.');
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition border border-slate-700"
                          title="Dispatch Warning Message"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </button>

                        {/* Extend Time */}
                        <button
                          onClick={() => setExtendTimeTeam(team)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-brand-400 rounded-lg transition border border-slate-700"
                          title="Grant Compensation Time"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>

                        {/* Disqualify / Reinstate */}
                        {team.status === 'DISQUALIFIED' ? (
                          <button
                            onClick={() => setReinstateTeamTarget(team)}
                            className="p-1.5 bg-purple-950/40 hover:bg-purple-900/50 text-purple-400 border border-purple-500/40 rounded-lg transition"
                            title="Reinstate Team"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setDisqualifyTeamTarget(team)}
                            className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 border border-rose-500/40 rounded-lg transition"
                            title="Disqualify Team"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: LIVE CODE VIEWER */}
      {inspectTeam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-700 bg-[#0d111a] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Live Code Inspection: {inspectTeam.name} ({inspectTeam.teamCode})
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Language: {inspectTeam.language || 'PYTHON'} • Score: {formatScore(inspectTeam.score)} pts
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectTeam(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Selector Tabs */}
            {inspectCodeData && inspectCodeData.drafts.length > 0 && (
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto">
                {inspectCodeData.drafts.map((d, dIdx) => (
                  <button
                    key={d.questionId}
                    onClick={() => setInspectQuestionIdx(dIdx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                      dIdx === inspectQuestionIdx
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Q{dIdx + 1}: {d.questionTitle.slice(0, 18)}...</span>
                  </button>
                ))}
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col">
              {loadingCode ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                  <span className="text-xs">Fetching live workspace snapshot...</span>
                </div>
              ) : !inspectCodeData || inspectCodeData.drafts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                  Team has not opened or typed any code drafts yet.
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>
                      Draft updated: {inspectCodeData.drafts[inspectQuestionIdx]?.updatedAt ? formatRelativeTime(inspectCodeData.drafts[inspectQuestionIdx].updatedAt) : 'N/A'}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {inspectCodeData.drafts[inspectQuestionIdx]?.points} Points
                    </span>
                  </div>

                  {/* Monaco Read-Only Code Viewer */}
                  <div className="flex-1 border border-slate-800 rounded-xl overflow-hidden">
                    <Editor
                      height="100%"
                      language={
                        inspectTeam.language === 'PYTHON'
                          ? 'python'
                          : inspectTeam.language === 'JAVA'
                          ? 'java'
                          : 'cpp'
                      }
                      theme="vs-dark"
                      value={inspectCodeData.drafts[inspectQuestionIdx]?.code || ''}
                      options={{
                        readOnly: true,
                        fontSize: 12,
                        lineNumbers: 'on',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND WARNING MESSAGE */}
      {warningTeam && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/40 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <h3 className="text-base font-bold text-white">Dispatch Warning</h3>
                <p className="text-xs text-slate-400">Team: {warningTeam.name} ({warningTeam.teamCode})</p>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="space-y-1.5 mb-4">
              <label className="text-[11px] font-semibold text-slate-400">Quick Templates:</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Stay focused on the workspace tab.',
                  'Fullscreen exit detected. Please return to exam view.',
                  'No secondary devices or communication permitted.',
                  'Warning Strike 1: Next violation results in disqualification.',
                ].map((tpl) => (
                  <button
                    key={tpl}
                    onClick={() => setWarningMessage(tpl)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 rounded transition border border-slate-700"
                  >
                    {tpl.slice(0, 28)}...
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-300">Message to Display on Screen:</label>
              <textarea
                rows={3}
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setWarningTeam(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendWarning}
                disabled={sendingWarning || !warningMessage.trim()}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2"
              >
                {sendingWarning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Send Warning</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DISQUALIFICATION PROMPT */}
      {disqualifyTeamTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-rose-500/50 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-rose-400">
              <UserX className="w-6 h-6" />
              <div>
                <h3 className="text-base font-bold text-white">Disqualify Team</h3>
                <p className="text-xs text-slate-400">
                  {disqualifyTeamTarget.name} ({disqualifyTeamTarget.teamCode})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              This will immediately freeze the team's timer, lock their editor, block all submissions server-side, and show a full-screen disqualification notice.
            </p>

            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-300">Official Disqualification Reason:</label>
              <input
                type="text"
                value={disqualifyReason}
                onChange={(e) => setDisqualifyReason(e.target.value)}
                placeholder="e.g., Multiple unauthorized tab switches"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDisqualifyTeamTarget(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDisqualify}
                disabled={processingDisqualify || !disqualifyReason.trim()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-rose-600/20"
              >
                {processingDisqualify ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserX className="w-4 h-4" />
                )}
                <span>Confirm Disqualification</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: REINSTATEMENT PROMPT */}
      {reinstateTeamTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-purple-500/50 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-purple-400">
              <UserCheck className="w-6 h-6" />
              <div>
                <h3 className="text-base font-bold text-white">Reinstate Team</h3>
                <p className="text-xs text-slate-400">
                  {reinstateTeamTarget.name} ({reinstateTeamTarget.teamCode})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Fully restores the team's workspace, code drafts, and prior submissions.
            </p>

            <div className="space-y-1.5 mb-4">
              <label className="text-xs font-semibold text-slate-300">Reinstatement Reason:</label>
              <input
                type="text"
                value={reinstateReason}
                onChange={(e) => setReinstateReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-300">
                Grant Compensation Minutes (+N mins):
              </label>
              <input
                type="number"
                min={0}
                max={30}
                value={compensationMins}
                onChange={(e) => setCompensationMins(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setReinstateTeamTarget(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReinstate}
                disabled={processingReinstate || !reinstateReason.trim()}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-purple-600/20"
              >
                {processingReinstate ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserCheck className="w-4 h-4" />
                )}
                <span>Confirm Reinstatement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: VIOLATIONS AUDIT */}
      {violationInspectTeam && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-slate-700 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3 text-amber-400">
                <History className="w-5 h-5" />
                <div>
                  <h3 className="text-base font-bold text-white">Violations History</h3>
                  <p className="text-xs text-slate-400">
                    Team: {violationInspectTeam.name} ({violationInspectTeam.teamCode})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViolationInspectTeam(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {violationInspectTeam.recentViolations.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No recorded violations for this team.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {violationInspectTeam.recentViolations.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start space-x-3 text-xs"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white uppercase font-mono text-[11px]">
                          {v.type}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {formatRelativeTime(v.occurredAt)}
                        </span>
                      </div>
                      {v.details && <p className="text-slate-400 text-[11px] mt-1">{v.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 6: EXTEND TEAM TIME */}
      {extendTimeTeam && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-sm p-6 rounded-2xl border border-brand-500/40 bg-[#0d111a] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4 text-brand-400">
              <Clock className="w-6 h-6" />
              <div>
                <h3 className="text-base font-bold text-white">Grant Extra Time</h3>
                <p className="text-xs text-slate-400">Team: {extendTimeTeam.teamCode}</p>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-semibold text-slate-300">Minutes to Add:</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[1, 2, 5, 10].map((m) => (
                  <button
                    key={m}
                    onClick={() => setExtendMins(m)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                      extendMins === m
                        ? 'bg-brand-600 text-white border-brand-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    +{m}m
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={1}
                max={60}
                value={extendMins}
                onChange={(e) => setExtendMins(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setExtendTimeTeam(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExtendTeam}
                disabled={processingExtend}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2"
              >
                {processingExtend ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                <span>Grant Time</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMonitoring;
