import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Users,
  BookOpen,
  PlayCircle,
  Activity,
  Trophy,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const admin = useAuthStore((state) => state.admin);
  const logoutAdmin = useAuthStore((state) => state.logoutAdmin);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Teams & Participants', path: '/admin/teams', icon: Users },
    { name: 'Question Bank', path: '/admin/questions', icon: BookOpen },
    { name: 'Round Engine', path: '/admin/rounds', icon: PlayCircle },
    { name: 'Live Monitoring', path: '/admin/monitoring', icon: Activity },
    { name: 'Leaderboard', path: '/admin/leaderboard', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-slate-800 bg-[#0d111a]/90 backdrop-blur-md sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Platform Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black shadow-lg shadow-brand-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-none">
                DebugArena <span className="text-brand-400 text-xs font-normal">ADMIN</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Event Command Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Admin Profile & Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Admin:</span>
            <span className="font-semibold text-white font-mono">{admin?.username || 'admin'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
