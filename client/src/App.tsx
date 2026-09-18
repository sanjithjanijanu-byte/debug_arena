import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { TeamManagement } from './pages/admin/TeamManagement';
import { QuestionBank } from './pages/admin/QuestionBank';
import { RoundControl } from './pages/admin/RoundControl';
import { LiveMonitoring } from './pages/admin/LiveMonitoring';
import { Leaderboard } from './pages/admin/Leaderboard';
import { ParticipantLogin } from './pages/participant/Login';
import { Instructions } from './pages/participant/Instructions';
import { LanguageSelect } from './pages/participant/LanguageSelect';
import { WaitingRoom } from './pages/participant/WaitingRoom';
import { RoundWorkspace } from './pages/participant/RoundWorkspace';
import { ProjectorView } from './pages/public/ProjectorView';
import { AdminProtectedRoute, ParticipantProtectedRoute } from './components/common/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Root & Participant Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<ParticipantLogin />} />

        {/* Public Auditorium Projector View */}
        <Route path="/projector" element={<ProjectorView />} />
        <Route path="/leaderboard" element={<ProjectorView />} />

        {/* Admin Portal Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Portal Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/teams" replace />} />
            <Route path="teams" element={<TeamManagement />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="rounds" element={<RoundControl />} />
            <Route path="monitoring" element={<LiveMonitoring />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>

        {/* Protected Participant Portal Routes */}
        <Route path="/event" element={<ParticipantProtectedRoute />}>
          <Route path="instructions" element={<Instructions />} />
          <Route path="language-select" element={<LanguageSelect />} />
          <Route path="waiting-room" element={<WaitingRoom />} />
          <Route path="round" element={<RoundWorkspace />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
