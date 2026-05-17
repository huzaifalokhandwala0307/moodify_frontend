import { motion } from 'framer-motion';
import SongCard from '@/components/songs/SongCard';
import type { SongResponse } from '@/types';
import EmptyState from '@/components/ui/EmptyState';
import { Heart } from 'lucide-react';

interface LikedTracksProps {
  songs: SongResponse[];
}

export function LikedTracks({ songs }: LikedTracksProps) {
  if (songs.length === 0) {
    return (
      <EmptyState
        title="No liked songs yet"
        subtitle="Songs you like will appear here for easy access."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song, index) => (
        <SongCard key={`liked-${song.id}`} song={song} index={index} />
      ))}
    </div>
  );
}
