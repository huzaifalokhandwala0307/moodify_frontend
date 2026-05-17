import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import type { UserProfile } from '@/types';

interface ProfileCardProps {
  profile: UserProfile | null;
  stats: {
    likes: number;
    saves: number;
    history: number;
  };
}

export function ProfileCard({ profile, stats }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-white/5"
    >
      <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-zinc-900 shadow-xl shrink-0 overflow-hidden">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <UserIcon className="w-10 h-10 text-zinc-500" />
        )}
      </div>

      <div className="flex-1 text-center md:text-left space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {profile?.display_name || 'User'}
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'recently'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <div className="bg-zinc-900/50 rounded-xl px-4 py-2 border border-white/5">
            <div className="text-2xl font-bold text-white">{stats.likes}</div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Likes</div>
          </div>
          <div className="bg-zinc-900/50 rounded-xl px-4 py-2 border border-white/5">
            <div className="text-2xl font-bold text-white">{stats.saves}</div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Saves</div>
          </div>
          <div className="bg-zinc-900/50 rounded-xl px-4 py-2 border border-white/5">
            <div className="text-2xl font-bold text-white">{stats.history}</div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Listens</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
