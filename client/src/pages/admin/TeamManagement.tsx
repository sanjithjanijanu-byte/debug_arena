import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Team } from '../../types';
import {
  Users,
  UserPlus,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit2,
  Copy,
  Check,
  Search,
  UploadCloud,
  FileText,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals state
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Form states
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamPassword, setNewTeamPassword] = useState('');
  const [editTeamName, setEditTeamName] = useState('');
  const [editResetPassword, setEditResetPassword] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [participantRoll, setParticipantRoll] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');
  const [participantTeamId, setParticipantTeamId] = useState('');

  // CSV Import State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);

  // Password visibility map & copied map
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/teams');
      if (res.data.success) {
        setTeams(res.data.teams);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch teams list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const triggerNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/teams', {
        name: newTeamName.trim(),
        password: newTeamPassword.trim() || undefined,
      });
      if (res.data.success) {
        triggerNotification(`Team "${res.data.team.name}" created with code ${res.data.team.teamCode}`);
        setShowCreateTeamModal(false);
        setNewTeamName('');
        setNewTeamPassword('');
        fetchTeams();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to create team');
    }
  };

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    try {
      const res = await api.put(`/admin/teams/${selectedTeam.id}`, {
        name: editTeamName.trim(),
        resetPassword: editResetPassword,
      });
      if (res.data.success) {
        triggerNotification(`Team "${res.data.team.name}" updated successfully`);
        setShowEditTeamModal(false);
        setSelectedTeam(null);
        fetchTeams();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to update team');
    }
  };

  const handleDeleteTeam = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete team "${name}"?`)) return;

    try {
      const res = await api.delete(`/admin/teams/${id}`);
      if (res.data.success) {
        triggerNotification(`Team "${name}" deleted`);
        fetchTeams();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to delete team');
    }
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/participants', {
        name: participantName.trim(),
        rollNo: participantRoll.trim(),
        email: participantEmail.trim() || undefined,
        phone: participantPhone.trim() || undefined,
        teamId: participantTeamId,
      });
      if (res.data.success) {
        triggerNotification(`Participant ${res.data.participant.name} added`);
        setShowAddParticipantModal(false);
        setParticipantName('');
        setParticipantRoll('');
        setParticipantEmail('');
        setParticipantPhone('');
        fetchTeams();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to add participant');
    }
  };

  const handleCSVImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) return;

    try {
      setImporting(true);
      const formData = new FormData();
      formData.append('file', csvFile);

      const res = await api.post('/admin/teams/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        triggerNotification(`Successfully imported ${res.data.count} teams`);
        setShowImportModal(false);
        setCsvFile(null);
        fetchTeams();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'CSV Import failed. Check format.');
    } finally {
      setImporting(false);
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Team Name,Password,Participant 1 Name,Participant 1 Roll,Participant 1 Email,Participant 1 Phone,Participant 2 Name,Participant 2 Roll,Participant 2 Email,Participant 2 Phone\n' +
      'CyberKnights,pass123,David Jones,CS202611,david@college.edu,555-1234,Emma Watson,CS202612,emma@college.edu,555-5678\n' +
      'CodeVipers,,Liam Smith,CS202613,liam@college.edu,555-9012,Olivia Taylor,CS202614,olivia@college.edu,555-3456';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'teams_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCredentialsCSV = () => {
    window.open('/api/admin/teams/export/credentials', '_blank');
  };

  const exportCredentialsPDF = () => {
    window.open('/api/admin/teams/export/credentials/pdf', '_blank');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered teams
  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalParticipants = teams.reduce((acc, t) => acc + (t.participants?.length || 0), 0);
  const activeTeamsCount = teams.filter((t) => t.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Header Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Teams & Participants</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage registrations, credentials, bulk imports, and team rosters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowCreateTeamModal(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl flex items-center transition shadow-md shadow-brand-600/20 cursor-pointer"
          >
            <Users className="w-4 h-4 mr-1.5" />
            New Team
          </button>

          <button
            onClick={() => {
              if (teams.length > 0) {
                setParticipantTeamId(teams[0].id);
                setShowAddParticipantModal(true);
              } else {
                setError('Please create a team before adding participants.');
              }
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center transition border border-slate-700 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Add Member
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center transition border border-slate-700 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 mr-1.5" />
            Import CSV
          </button>

          {/* Export Dropdown */}
          <div className="flex items-center space-x-1 bg-slate-800 rounded-xl p-0.5 border border-slate-700">
            <button
              onClick={exportCredentialsCSV}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg flex items-center transition cursor-pointer"
              title="Download Credentials CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              CSV
            </button>
            <button
              onClick={exportCredentialsPDF}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg flex items-center transition cursor-pointer"
              title="Download Printable Credentials PDF"
            >
              <FileText className="w-3.5 h-3.5 mr-1 text-red-400" />
              PDF Slips
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs">Total Teams</span>
          <div className="text-2xl font-black text-white mt-1">{teams.length}</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs">Active Sessions</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{activeTeamsCount}</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs">Registered Members</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">{totalParticipants}</div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs">Languages Locked</span>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {teams.filter((t) => t.languageLockedAt).length} / {teams.length}
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team, code, or roll no..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NOT_LOGGED_IN">Not Logged In</option>
            <option value="ACTIVE">Active</option>
            <option value="IDLE">Idle</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="DISQUALIFIED">Disqualified</option>
          </select>

          <button
            onClick={fetchTeams}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Teams Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
            <span className="text-xs">Loading teams directory...</span>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-300">No teams found</p>
            <p className="text-xs text-slate-500 mt-1">Create a new team or import from CSV to begin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/60">
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4">Credentials</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Roster</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredTeams.map((team) => {
                  const isVisible = visiblePasswords[team.id];
                  return (
                    <tr key={team.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Team Name */}
                      <td className="py-3 px-4 font-semibold text-white">
                        <div className="flex items-center space-x-2">
                          <span>{team.name}</span>
                        </div>
                      </td>

                      {/* Credentials */}
                      <td className="py-3 px-4 font-mono">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1 text-cyan-400">
                            <span>{team.teamCode}</span>
                            <button
                              onClick={() => copyToClipboard(team.teamCode, `code-${team.id}`)}
                              className="text-slate-500 hover:text-white"
                              title="Copy Team Code"
                            >
                              {copiedCode === `code-${team.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                            <span>
                              {isVisible
                                ? team.initialPassword || '********'
                                : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(team.id)}
                              className="text-slate-500 hover:text-white"
                              title={isVisible ? 'Hide Password' : 'Show Password'}
                            >
                              {isVisible ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Chosen Language */}
                      <td className="py-3 px-4">
                        {team.language ? (
                          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-brand-500/10 text-brand-400 border border-brand-500/30">
                            {team.language}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px] italic">Not selected</span>
                        )}
                      </td>

                      {/* Participants */}
                      <td className="py-3 px-4">
                        {team.participants && team.participants.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {team.participants.map((p) => (
                              <span
                                key={p.id}
                                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700"
                                title={`${p.rollNo} • ${p.email || 'No email'}`}
                              >
                                {p.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px] italic">No members</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            team.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : team.status === 'DISQUALIFIED'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : team.status === 'SUBMITTED'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {team.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {team.score.toFixed(1)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTeam(team);
                              setEditTeamName(team.name);
                              setEditResetPassword(false);
                              setShowEditTeamModal(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Team"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteTeam(team.id, team.name)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Delete Team"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create Team */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Create New Team</h3>
            <p className="text-xs text-slate-400 mb-4">
              Team code and credentials will be generated automatically if left blank.
            </p>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Binary Bandits"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Custom Password (optional)
                </label>
                <input
                  type="text"
                  value={newTeamPassword}
                  onChange={(e) => setNewTeamPassword(e.target.value)}
                  placeholder="Leave empty to auto-generate"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateTeamModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl cursor-pointer"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Team */}
      {showEditTeamModal && selectedTeam && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Edit Team</h3>
            <p className="text-xs text-slate-400 mb-4">
              Updating team details for {selectedTeam.teamCode}.
            </p>

            <form onSubmit={handleUpdateTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  value={editTeamName}
                  onChange={(e) => setEditTeamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-300 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editResetPassword}
                  onChange={(e) => setEditResetPassword(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-brand-600 cursor-pointer"
                />
                <span>Reset password (generates fresh random password)</span>
              </label>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditTeamModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Participant */}
      {showAddParticipantModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Register Participant</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a student member and assign them to a team roster.
            </p>

            <form onSubmit={handleAddParticipant} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College Roll No. *
                </label>
                <input
                  type="text"
                  required
                  value={participantRoll}
                  onChange={(e) => setParticipantRoll(e.target.value)}
                  placeholder="e.g. CS202645"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={participantPhone}
                    onChange={(e) => setParticipantPhone(e.target.value)}
                    placeholder="555-0100"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assign To Team *
                </label>
                <select
                  required
                  value={participantTeamId}
                  onChange={(e) => setParticipantTeamId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.teamCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddParticipantModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl cursor-pointer"
                >
                  Add Participant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Bulk CSV Import */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-lg w-full border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Bulk Import Teams & Participants</h3>
            <p className="text-xs text-slate-400 mb-4">
              Upload a CSV file containing team rosters. You can download our standardized CSV template below.
            </p>

            <form onSubmit={handleCSVImport} className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-xl p-6 text-center transition-colors">
                <UploadCloud className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                <label className="block text-xs font-medium text-slate-300 cursor-pointer">
                  <span className="text-brand-400 hover:underline">Choose CSV File</span> or drag and drop here
                  <input
                    type="file"
                    accept=".csv"
                    required
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {csvFile && (
                  <div className="mt-2 text-xs text-emerald-400 font-mono flex items-center justify-center">
                    <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
                    {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={downloadCSVTemplate}
                  className="text-xs text-brand-400 hover:underline flex items-center cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Download CSV Template
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!csvFile || importing}
                    className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 disabled:opacity-50 rounded-xl flex items-center cursor-pointer"
                  >
                    {importing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Importing...
                      </>
                    ) : (
                      'Upload & Import'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
