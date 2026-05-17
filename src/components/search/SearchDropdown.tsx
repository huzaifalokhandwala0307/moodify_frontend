import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import ClusterBadge from '@/components/ui/ClusterBadge';
import type { SongResponse } from '@/types';

interface SearchDropdownProps {
  results: SongResponse[];
  focusIndex: number;
  onSelect: (song: SongResponse) => void;
}

/**
 * Animated dropdown list of search results.
 * Shows album art thumbnail, track name, artist, and cluster badge.
 */
export default function SearchDropdown({
  results,
  focusIndex,
  onSelect,
}: SearchDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-0 right-0 mt-2 z-50 glass-strong rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto"
    >
      {results.map((song, i) => (
        <button
          key={`${song.track_name}-${i}`}
          onClick={() => onSelect(song)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            focusIndex === i
              ? 'bg-accent/10 border-l-2 border-accent'
              : 'hover:bg-white/5 border-l-2 border-transparent'
          }`}
        >
          {/* Thumbnail */}
          <div className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {song.album_art ? (
              <img
                src={song.album_art}
                alt={song.track_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-4 h-4 text-text-subtle" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {song.track_name}
            </p>
            <p className="text-xs text-text-muted truncate">
              {song.artist || 'Unknown Artist'}
            </p>
          </div>

          {/* Cluster */}
          <ClusterBadge cluster={song.cluster} />
        </button>
      ))}
    </motion.div>
  );
}
