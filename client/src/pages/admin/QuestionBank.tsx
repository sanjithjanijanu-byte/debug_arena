import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Question, Round, Language } from '../../types';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Play,
  Download,
  UploadCloud,
  Edit3,
  Trash2,
  Clock,
  Loader2,
  Check,
  Code2,
  FileCode,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ValidationResult {
  success: boolean;
  questionId: string;
  title: string;
  language: Language;
  allPassed: boolean;
  testsPassed: number;
  testsTotal: number;
  totalDurationMs: number;
  compileError?: string;
  testResults: {
    testCaseId?: string;
    stdin: string;
    expectedStdout: string;
    actualStdout: string;
    isMatch: boolean;
    verdict: string;
    execTimeMs: number;
    stderr?: string;
    compileError?: string;
    isHidden?: boolean;
    weight?: number;
  }[];
}

export const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRound, setSelectedRound] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');

  // Validation modal state
  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [validationData, setValidationData] = useState<ValidationResult | null>(null);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Question Editor Modal state
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form Fields
  const [formRoundId, setFormRoundId] = useState('');
  const [formLanguage, setFormLanguage] = useState<Language>('PYTHON');
  const [formTitle, setFormTitle] = useState('');
  const [formStatement, setFormStatement] = useState('');
  const [formBuggyCode, setFormBuggyCode] = useState('');
  const [formRefSolution, setFormRefSolution] = useState('');
  const [formPoints, setFormPoints] = useState<number>(10);
  const [formTimeLimit, setFormTimeLimit] = useState<number>(2000);
  const [formMemoryLimit, setFormMemoryLimit] = useState<number>(256);
  const [formIsTiebreaker, setFormIsTiebreaker] = useState(false);
  const [formTestCases, setFormTestCases] = useState<
    { stdin: string; expectedStdout: string; isHidden: boolean; weight: number }[]
  >([{ stdin: '', expectedStdout: '', isHidden: false, weight: 1.0 }]);

  // JSON Import Modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importing, setImporting] = useState(false);

  const fetchQuestionsAndRounds = async () => {
    try {
      setLoading(true);
      const [qRes] = await Promise.all([
        api.get('/admin/questions'),
      ]);

      if (qRes.data.success) {
        setQuestions(qRes.data.questions);

        // Derive unique rounds from questions
        const extractedRounds: Round[] = [];
        const seenRoundIds = new Set<string>();
        qRes.data.questions.forEach((q: any) => {
          if (q.round && !seenRoundIds.has(q.round.id)) {
            seenRoundIds.add(q.round.id);
            extractedRounds.push(q.round);
          }
        });
        extractedRounds.sort((a, b) => a.number - b.number);
        setRounds(extractedRounds);
        if (extractedRounds.length > 0 && !formRoundId) {
          setFormRoundId(extractedRounds[0].id);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load question bank');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsAndRounds();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setFormTitle('');
    setFormStatement('');
    setFormBuggyCode('');
    setFormRefSolution('');
    setFormPoints(10);
    setFormTimeLimit(2000);
    setFormMemoryLimit(256);
    setFormIsTiebreaker(false);
    setFormLanguage('PYTHON');
    if (rounds.length > 0) setFormRoundId(rounds[0].id);
    setFormTestCases([
      { stdin: '', expectedStdout: '', isHidden: false, weight: 1.0 },
      { stdin: '', expectedStdout: '', isHidden: true, weight: 2.0 },
    ]);
    setShowEditorModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (q: Question) => {
    setEditingQuestion(q);
    setFormRoundId(q.roundId);
    setFormLanguage(q.language);
    setFormTitle(q.title);
    setFormStatement(q.statement);
    setFormBuggyCode(q.buggyCode);
    setFormRefSolution(q.referenceSolution || '');
    setFormPoints(q.points);
    setFormTimeLimit(q.timeLimitMs || 2000);
    setFormMemoryLimit(q.memoryLimitMb || 256);
    setFormIsTiebreaker(q.isTiebreaker);
    if (q.testCases && q.testCases.length > 0) {
      setFormTestCases(
        q.testCases.map((tc) => ({
          stdin: tc.stdin,
          expectedStdout: tc.expectedStdout,
          isHidden: tc.isHidden,
          weight: tc.weight,
        }))
      );
    } else {
      setFormTestCases([{ stdin: '', expectedStdout: '', isHidden: false, weight: 1.0 }]);
    }
    setShowEditorModal(true);
  };

  // Save Question (Create or Edit)
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        roundId: formRoundId,
        language: formLanguage,
        title: formTitle.trim(),
        statement: formStatement.trim(),
        buggyCode: formBuggyCode,
        referenceSolution: formRefSolution,
        points: Number(formPoints),
        timeLimitMs: Number(formTimeLimit),
        memoryLimitMb: Number(formMemoryLimit),
        isTiebreaker: formIsTiebreaker,
        testCases: formTestCases,
      };

      if (editingQuestion) {
        const res = await api.put(`/admin/questions/${editingQuestion.id}`, payload);
        if (res.data.success) {
          showToast(`Question "${res.data.question.title}" updated.`);
        }
      } else {
        const res = await api.post('/admin/questions', payload);
        if (res.data.success) {
          showToast(`Question "${res.data.question.title}" created.`);
        }
      }

      setShowEditorModal(false);
      fetchQuestionsAndRounds();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to save question');
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete question "${title}"?`)) return;

    try {
      const res = await api.delete(`/admin/questions/${id}`);
      if (res.data.success) {
        showToast(res.data.message || 'Question deleted.');
        fetchQuestionsAndRounds();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to delete question');
    }
  };

  // Validate Question Reference Solution
  const handleValidateQuestion = async (id: string) => {
    try {
      setValidatingId(id);
      const res = await api.post(`/admin/questions/${id}/validate`);
      if (res.data.success) {
        setValidationData(res.data);
        setShowValidationModal(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Validation action failed');
    } finally {
      setValidatingId(null);
    }
  };

  // Bulk JSON Import
  const handleImportJSON = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setImporting(true);
      const parsed = JSON.parse(jsonInput);
      const res = await api.post('/admin/questions/import', parsed);
      if (res.data.success) {
        showToast(`Successfully imported ${res.data.count} questions.`);
        setShowImportModal(false);
        setJsonInput('');
        fetchQuestionsAndRounds();
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Invalid JSON format or structure');
    } finally {
      setImporting(false);
    }
  };

  // Add/Remove Test Cases in Form
  const addTestCaseRow = () => {
    setFormTestCases((prev) => [
      ...prev,
      { stdin: '', expectedStdout: '', isHidden: true, weight: 1.0 },
    ]);
  };

  const removeTestCaseRow = (index: number) => {
    if (formTestCases.length <= 1) return;
    setFormTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTestCaseRow = (index: number, field: string, val: any) => {
    setFormTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: val } : tc))
    );
  };

  // Download Sample Template
  const downloadTemplate = () => {
    window.open('/api/admin/questions/template', '_blank');
  };

  const getDisplayStatement = (statement: string) => {
    if (!statement) return '';
    try {
      if (statement.trim().startsWith('{')) {
        const parsed = JSON.parse(statement);
        return parsed.prompt || parsed.text || statement;
      }
    } catch (e) {}
    return statement;
  };

  // Filter questions and sort naturally by round number, language, and question number
  const filteredQuestions = questions
    .filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.statement.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRound = selectedRound === 'ALL' || q.roundId === selectedRound;
      const matchesLang = selectedLanguage === 'ALL' || q.language === selectedLanguage;
      return matchesSearch && matchesRound && matchesLang;
    })
    .sort((a, b) => {
      const rA = (a as any).round?.number || 0;
      const rB = (b as any).round?.number || 0;
      if (rA !== rB) return rA - rB;
      if (a.language !== b.language) return a.language.localeCompare(b.language);
      const numA = parseInt((a.title.match(/Q(\d+)/i) || [])[1] || '0', 10);
      const numB = parseInt((b.title.match(/Q(\d+)/i) || [])[1] || '0', 10);
      if (numA !== numB) return numA - numB;
      return a.title.localeCompare(b.title);
    });

  const round1Count = questions.filter((q) => (q as any).round?.number === 1).length;
  const round2Count = questions.filter((q) => (q as any).round?.number === 2).length;
  const round3Count = questions.filter((q) => (q as any).round?.number === 3).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Question Bank</h1>
          <p className="text-slate-400 text-xs mt-1">
            Author problems, manage test cases, and validate reference solutions before event launch.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl flex items-center transition shadow-md shadow-brand-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Question
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center transition border border-slate-700 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 mr-1.5" />
            Import JSON
          </button>

          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center transition border border-slate-700 cursor-pointer"
            title="Download Sample JSON Template"
          >
            <Download className="w-4 h-4 mr-1.5 text-brand-400" />
            Template
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
          <span>{notification}</span>
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

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs flex items-center justify-between">
            <span>Total Questions</span>
            <Layers className="w-4 h-4 text-brand-400" />
          </span>
          <div className="text-2xl font-black text-white mt-1">
            {questions.length} <span className="text-xs font-normal text-slate-500">loaded</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs flex items-center justify-between">
            <span>Round 1 (MCQ)</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </span>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {round1Count} <span className="text-xs font-normal text-slate-500">/ 60 MCQs</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs flex items-center justify-between">
            <span>Round 2 (Medium)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </span>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {round2Count} <span className="text-xs font-normal text-slate-500">challenges</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-xs flex items-center justify-between">
            <span>Round 3 (Hard)</span>
            <FileCode className="w-4 h-4 text-rose-400" />
          </span>
          <div className="text-2xl font-black text-rose-400 mt-1">
            {round3Count} <span className="text-xs font-normal text-slate-500">challenges</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by title or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Round Filter */}
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Rounds</option>
            {rounds.map((r) => (
              <option key={r.id} value={r.id}>
                Round {r.number}: {r.name}
              </option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500 font-mono"
          >
            <option value="ALL">All Languages</option>
            <option value="CPP">C++</option>
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
            <span className="text-xs">Loading question repository...</span>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-300">No questions found</p>
            <p className="text-xs text-slate-500 mt-1">
              Add a new question or import the JSON starter pack.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/60">
                  <th className="py-3 px-4">Title & Problem</th>
                  <th className="py-3 px-4">Round</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4">Test Cases</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredQuestions.map((q) => {
                  const roundObj = (q as any).round;
                  const isValidating = validatingId === q.id;

                  return (
                    <tr key={q.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Title & Statement */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-white truncate">{q.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {getDisplayStatement(q.statement)}
                        </div>
                      </td>

                      {/* Round */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                          R{roundObj?.number || 1} • {roundObj?.name || 'Round'}
                        </span>
                      </td>

                      {/* Language */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                            q.language === 'CPP'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                              : q.language === 'JAVA'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {q.language}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            roundObj?.difficulty === 'EASY'
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : roundObj?.difficulty === 'MEDIUM'
                              ? 'text-amber-400 bg-amber-500/10'
                              : 'text-rose-400 bg-rose-500/10'
                          }`}
                        >
                          {roundObj?.difficulty || 'EASY'}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3 px-4 font-mono font-semibold text-white whitespace-nowrap">
                        {q.points} pts
                      </td>

                      {/* Test Cases Count */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-slate-300 text-xs">
                          {q.testCases?.length || 0} cases
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          ({q.testCases?.filter((tc) => !tc.isHidden).length || 0} visible)
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Validate Button */}
                          <button
                            onClick={() => handleValidateQuestion(q.id)}
                            disabled={isValidating}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-brand-600/20 text-brand-300 hover:bg-brand-600 hover:text-white border border-brand-500/30 rounded-lg flex items-center transition cursor-pointer disabled:opacity-50"
                            title="Run Reference Solution against all test cases"
                          >
                            {isValidating ? (
                              <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            ) : (
                              <Play className="w-3 h-3 mr-1" />
                            )}
                            Validate
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEdit(q)}
                            className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteQuestion(q.id, q.title)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Delete Question"
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

      {/* Validation Results Modal */}
      {showValidationModal && validationData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-2xl w-full border border-slate-700 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    validationData.allPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {validationData.allPassed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Validation: {validationData.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-cyan-400 font-semibold">{validationData.language}</span>
                    <span>•</span>
                    <span>
                      Passed: {validationData.testsPassed} / {validationData.testsTotal}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {validationData.totalDurationMs} ms
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowValidationModal(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                &times;
              </button>
            </div>

            {/* Compile Error alert if any */}
            {validationData.compileError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono mb-4 overflow-x-auto">
                <strong className="block text-red-400 font-bold mb-1">Compilation Failure:</strong>
                <pre>{validationData.compileError}</pre>
              </div>
            )}

            {/* Test Results Table */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {validationData.testResults.map((tr, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border text-xs ${
                    tr.isMatch
                      ? 'bg-slate-900/60 border-emerald-500/30'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-300">
                      Test Case #{index + 1} {tr.isHidden && <span className="text-[10px] text-slate-500 font-normal">(Hidden)</span>}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tr.isMatch ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {tr.verdict} ({tr.execTimeMs}ms)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Expected:</span>
                      <pre className="text-emerald-400 whitespace-pre-wrap">{tr.expectedStdout || '(empty)'}</pre>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Actual Output:</span>
                      <pre className={`${tr.isMatch ? 'text-emerald-400' : 'text-red-400'} whitespace-pre-wrap`}>
                        {tr.actualStdout || '(empty)'}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowValidationModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Close Diagnostics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Editor Modal (Create / Edit) */}
      {showEditorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-3xl w-full border border-slate-700 max-h-[92vh] flex flex-col">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingQuestion ? 'Edit Problem Specification' : 'Create New Problem'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure question statement, starter buggy program, reference solution, and test suite.
            </p>

            <form onSubmit={handleSaveQuestion} className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Row 1: Round, Language, Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Competition Round *</label>
                  <select
                    required
                    value={formRoundId}
                    onChange={(e) => setFormRoundId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    {rounds.map((r) => (
                      <option key={r.id} value={r.id}>
                        Round {r.number}: {r.name} ({r.difficulty})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Language *</label>
                  <select
                    required
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value as Language)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  >
                    <option value="CPP">C++ (GCC 13)</option>
                    <option value="JAVA">Java (OpenJDK 17)</option>
                    <option value="PYTHON">Python (3.11)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Score Value (Points) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formPoints}
                    onChange={(e) => setFormPoints(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Fix the Binary Search Off-By-One"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Statement */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem Statement & Expected Behavior *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formStatement}
                  onChange={(e) => setFormStatement(e.target.value)}
                  placeholder="Describe the bug context, input format, and correct expected behavior..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Buggy Starter Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Buggy Source Code (Presented to participants) *</span>
                  <span className="text-[10px] text-brand-400 font-mono">Contains intentional bugs</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formBuggyCode}
                  onChange={(e) => setFormBuggyCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Reference Solution */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Reference / Correct Solution (Admin Only, never sent to participants) *</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Must pass all test cases</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formRefSolution}
                  onChange={(e) => setFormRefSolution(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Limits */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Limit (ms)</label>
                  <input
                    type="number"
                    value={formTimeLimit}
                    onChange={(e) => setFormTimeLimit(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Memory Limit (MB)</label>
                  <input
                    type="number"
                    value={formMemoryLimit}
                    onChange={(e) => setFormMemoryLimit(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              {/* Test Cases Manager */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center">
                    <Code2 className="w-4 h-4 mr-1 text-brand-400" />
                    Test Suite Evaluation Cases ({formTestCases.length})
                  </span>
                  <button
                    type="button"
                    onClick={addTestCaseRow}
                    className="px-2.5 py-1 bg-brand-600/20 text-brand-300 hover:bg-brand-600 hover:text-white border border-brand-500/30 rounded-lg text-[11px] font-semibold flex items-center transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Test Case
                  </button>
                </div>

                <div className="space-y-3">
                  {formTestCases.map((tc, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">Case #{idx + 1}</span>
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center space-x-1 text-[11px] text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tc.isHidden}
                              onChange={(e) => updateTestCaseRow(idx, 'isHidden', e.target.checked)}
                              className="rounded border-slate-700 bg-slate-900 text-brand-600"
                            />
                            <span>Hidden</span>
                          </label>

                          <div className="flex items-center space-x-1">
                            <span className="text-[11px] text-slate-400">Weight:</span>
                            <input
                              type="number"
                              step="0.5"
                              value={tc.weight}
                              onChange={(e) => updateTestCaseRow(idx, 'weight', parseFloat(e.target.value) || 1)}
                              className="w-14 px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-center font-mono text-[11px] text-white"
                            />
                          </div>

                          {formTestCases.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTestCaseRow(idx)}
                              className="text-slate-500 hover:text-red-400"
                              title="Delete test case"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Stdin</label>
                          <textarea
                            rows={2}
                            value={tc.stdin}
                            onChange={(e) => updateTestCaseRow(idx, 'stdin', e.target.value)}
                            placeholder="Input piped to program"
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Expected Stdout</label>
                          <textarea
                            rows={2}
                            required
                            value={tc.expectedStdout}
                            onChange={(e) => updateTestCaseRow(idx, 'expectedStdout', e.target.value)}
                            placeholder="Expected output"
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-emerald-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-2 sticky bottom-0 bg-[#121620] py-2">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/20 cursor-pointer"
                >
                  {editingQuestion ? 'Update Question' : 'Create Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk JSON Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-xl w-full border border-slate-700 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-1">Bulk Import Questions (JSON)</h3>
            <p className="text-xs text-slate-400 mb-3">
              Paste an array of question objects adhering to our JSON schema.
            </p>

            <form onSubmit={handleImportJSON} className="space-y-4">
              <textarea
                required
                rows={12}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste [ { title: ..., roundNumber: 1, language: 'CPP', statement: ..., buggyCode: ..., referenceSolution: ..., testCases: [...] } ]"
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="text-xs text-brand-400 hover:underline flex items-center cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Download Sample JSON
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
                    disabled={importing || !jsonInput.trim()}
                    className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 disabled:opacity-50 rounded-xl flex items-center cursor-pointer"
                  >
                    {importing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Importing...
                      </>
                    ) : (
                      'Parse & Import'
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
