import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { ProfileCard } from '@/components/user/ProfileCard';
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { profile, likes, saves, history, isLoading: userLoading } = useUser();

  if (userLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const stats = {
    likes: likes.length,
    saves: saves.length,
    history: history.length,
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Your Profile</h1>
        
        <ProfileCard profile={profile} stats={stats} />
        
        <div className="glass rounded-2xl p-6 border border-white/5 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>
          <p className="text-zinc-400">Email: {user.email}</p>
          {/* Future implementation: Update password, update preferences sliders */}
          <div className="mt-4 text-sm text-accent">
            Preferences editing coming soon.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
