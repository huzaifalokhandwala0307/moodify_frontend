import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { ProfileCard } from '@/components/user/ProfileCard';
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const { user, isLoading: authLoading } = useAuth();
  const { profile, likes, saves, history, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

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

  const stats = {
    likes: likes.length,
    saves: saves.length,
    history: history.length,
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>
        
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
