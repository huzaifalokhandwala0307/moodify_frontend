import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { recommendPersonalized } from '@/api/moodify';
import type { PersonalizedRecommendResponse, SongResponse } from '@/types';
import SongCard from '@/components/songs/SongCard';

export function PersonalizedSection() {
  const { user } = useAuth();
  const [data, setData] = useState<PersonalizedRecommendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    
    let mounted = true;
    const fetchRecs = async () => {
      setLoading(true);
      try {
        const res = await recommendPersonalized(user.id, 12);
        if (mounted) setData(res);
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchRecs();
    return () => { mounted = false; };
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Sparkles className="w-12 h-12 text-accent mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Log in for personalized music</h3>
        <p className="text-zinc-400 max-w-md">
          We use your listening history and likes to find songs you'll love. Log in or create an account to unlock this feature.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-400">
        <p>Not enough data to generate recommendations yet. Try liking some songs!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-2xl font-bold text-white">Made for You</h2>
      </div>
      
      {data.mode === 'cold_start' && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm text-accent mb-6">
          Start liking and listening to songs to get truly personalized recommendations! Here are some popular tracks to get you started.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.results.map((song, idx) => (
          <SongCard key={`foryou-${song.id}-${idx}`} song={song} index={idx} />
        ))}
      </div>
    </div>
  );
}
