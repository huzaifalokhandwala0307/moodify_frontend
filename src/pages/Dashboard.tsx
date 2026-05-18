import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { PersonalizedSection } from '@/components/sections/PersonalizedSection';
import { 
  Heart, 
  Bookmark, 
  History, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Loader2,
  ChevronRight 
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { likes, saves, history, isLoading } = useUser();
  const navigate = useNavigate();

  // Get dynamic personalized greeting based on local hour
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.email ? user.email.split('@')[0] : 'User';

  const stats = [
    {
      label: 'Liked Songs',
      value: likes.length,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      action: () => navigate('/app/profile')
    },
    {
      label: 'Saved Tracks',
      value: saves.length,
      icon: Bookmark,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/app/saved')
    },
    {
      label: 'Listening History',
      value: history.length,
      icon: History,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      action: () => navigate('/app/history')
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-accent/10 border border-white/5 p-8 sm:p-10 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/5 blur-[80px] pointer-events-none rounded-full" />
        <div className="relative z-10 space-y-2">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase">Your Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {getGreeting()},{' '}
            <span className="capitalize text-gradient">{displayName}</span>
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-xl leading-relaxed">
            Welcome to your personalized ML recommendation workspace. Explore custom suggestions or tune acoustic profiles below.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-6 h-6 text-accent animate-spin" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              onClick={stat.action}
              className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-extrabold text-white tracking-tight group-hover:text-accent transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Quick Launch / Mode Selector */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Curate Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recommend by Song Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl glass border border-white/5 p-6 hover:border-accent/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            onClick={() => navigate('/app/song')}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-300">
                <Search className="w-6 h-6 text-accent group-hover:text-black" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">Recommend by Song</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Search a track name to find acoustically similar suggestions. Powered by our advanced machine learning K-Means clustering algorithm.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-accent font-semibold pt-6 mt-auto">
              <span>Open Song Curate</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Recommend by Vibe Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl glass border border-white/5 p-6 hover:border-accent/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            onClick={() => navigate('/app/vibe')}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                <Sparkles className="w-6 h-6 text-emerald-400 group-hover:text-black" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Recommend by Vibe</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Tweak interactive acoustic sliders like valence, energy, and danceability to synthesize matches tailored to your direct mood.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold pt-6 mt-auto">
              <span>Open Vibe Curate</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Personalized Section */}
      <div className="pt-4 border-t border-white/5">
        <PersonalizedSection />
      </div>

    </div>
  );
}
