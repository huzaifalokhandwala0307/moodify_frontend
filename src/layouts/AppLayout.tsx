import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music2, 
  LayoutDashboard, 
  Search, 
  Sparkles, 
  Bookmark, 
  History, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Volume2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePlayer } from '@/contexts/PlayerContext';
import MiniPlayer from '@/components/songs/MiniPlayer';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { currentSong, stopSong } = usePlayer();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    stopSong();
    navigate('/');
  };

  const navItems = [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/app/song', label: 'Recommend by Song', icon: Search },
    { to: '/app/vibe', label: 'Recommend by Vibe', icon: Sparkles },
    { to: '/app/saved', label: 'Saved Songs', icon: Bookmark },
    { to: '/app/history', label: 'Listening History', icon: History },
    { to: '/app/profile', label: 'Profile', icon: UserIcon },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111111] text-white border-r border-white/5">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/5">
        <div className="relative">
          <Music2 className="w-7 h-7 text-accent" />
          <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Mood<span className="text-accent">ify</span>
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-accent/10 text-accent font-semibold shadow-glow-sm border border-accent/20'
                  : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                  isActive ? 'text-accent' : 'text-text-muted group-hover:text-white'
                }`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute left-0 top-1/3 bottom-1/3 w-1 bg-accent rounded-r"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info / Logout */}
      <div className="p-4 border-t border-white/5 bg-zinc-950/20">
        <div className="flex items-center gap-3 px-2 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-accent text-sm font-semibold uppercase">
            {user?.email?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-text-subtle truncate">Logged In</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-white flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Desktop Sidebar (Sticky, Left) */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-[#111111]/85 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30 w-full">
        <div className="flex items-center gap-2">
          <Music2 className="w-6 h-6 text-accent" />
          <span className="font-bold tracking-tight">
            Mood<span className="text-accent">ify</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-text-muted hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Sidebar Slide-out Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] z-50 md:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace (Scrollable) */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-7xl w-full mx-auto pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Mini Audio Player */}
      <MiniPlayer song={currentSong} onClose={stopSong} />
    </div>
  );
}
