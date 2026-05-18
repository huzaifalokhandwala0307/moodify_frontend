import { AnimatePresence } from 'framer-motion';
import SongCard from './SongCard';
import type { SongResponse } from '@/types';

interface SongGridProps {
  songs: SongResponse[];
}

/**
 * Responsive grid of SongCards with staggered animations.
 * 1 col mobile → 2 tablet → 3 desktop → 4 wide.
 */
export default function SongGrid({ songs }: SongGridProps) {
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {songs.map((song, i) => (
          <SongCard
            key={`${song.track_name}-${song.artist}-${i}`}
            song={song}
            index={i}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
