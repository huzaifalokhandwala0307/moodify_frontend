import { motion } from 'framer-motion';
import SongCard from '@/components/songs/SongCard';
import type { SongResponse } from '@/types';
import EmptyState from '@/components/ui/EmptyState';
import { History } from 'lucide-react';

interface HistoryListProps {
  songs: SongResponse[];
}

export function HistoryList({ songs }: HistoryListProps) {
  if (songs.length === 0) {
    return (
      <EmptyState
        title="No listening history"
        subtitle="Songs you preview will appear here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song, index) => (
        <SongCard key={`history-${song.id}-${index}`} song={song} index={index} />
      ))}
    </div>
  );
}
