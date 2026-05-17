import { motion } from 'framer-motion';
import SongCard from '@/components/songs/SongCard';
import type { SongResponse } from '@/types';
import EmptyState from '@/components/ui/EmptyState';
import { Bookmark } from 'lucide-react';

interface SavedTracksProps {
  songs: SongResponse[];
}

export function SavedTracks({ songs }: SavedTracksProps) {
  if (songs.length === 0) {
    return (
      <EmptyState
        title="No saved songs"
        subtitle="Songs you bookmark will appear here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song, index) => (
        <SongCard key={`saved-${song.id}`} song={song} index={index} />
      ))}
    </div>
  );
}
