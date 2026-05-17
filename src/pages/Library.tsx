import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { LikedTracks } from '@/components/user/LikedTracks';
import { SavedTracks } from '@/components/user/SavedTracks';
import { HistoryList } from '@/components/user/HistoryList';
import { Loader2 } from 'lucide-react';

export default function Library() {
  const { user, isLoading: authLoading } = useAuth();
  const { likes, saves, history, isLoading: userLoading } = useUser();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'liked' | 'saved' | 'history'>('liked');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || userLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        
        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5 w-fit">
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'liked' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Liked Songs
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'saved' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved Tracks
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'history' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Recently Played
          </button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'liked' && <LikedTracks songs={likes} />}
        {activeTab === 'saved' && <SavedTracks songs={saves} />}
        {activeTab === 'history' && <HistoryList songs={history} />}
      </motion.div>
    </div>
  );
}
