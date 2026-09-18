import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const AdminProtectedRoute: React.FC = () => {
  const adminToken = useAuthStore((state) => state.adminToken);

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export const ParticipantProtectedRoute: React.FC = () => {
  const participantToken = useAuthStore((state) => state.participantToken);

  if (!participantToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
