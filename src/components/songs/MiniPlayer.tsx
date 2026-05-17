import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2 } from 'lucide-react';
import type { SongResponse } from '@/types';

interface MiniPlayerProps {
  song: SongResponse | null;
  onClose: () => void;
}

/**
 * Fixed bottom mini player bar.
 * Shows when a song with preview_url is selected.
 * Plays 30s Spotify preview audio.
 */
export default function MiniPlayer({ song, onClose }: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  /* Reset and play when song changes */
  useEffect(() => {
    if (song?.preview_url) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(song.preview_url);
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      /* Track progress */
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          const pct =
            (audioRef.current.currentTime / (audioRef.current.duration || 30)) *
            100;
          setProgress(pct);
        }
      }, 100);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [song]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleClose() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    onClose();
  }

  return (
    <AnimatePresence>
      {song && song.preview_url && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
            <div
              className="h-full bg-accent transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            {/* Album art */}
            <div className="w-10 h-10 rounded-lg bg-surface2 overflow-hidden flex-shrink-0">
              {song.album_art ? (
                <img
                  src={song.album_art}
                  alt={song.track_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-900/20 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-text-subtle" />
                </div>
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

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-all active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                )}
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-text-subtle hover:text-white transition-colors"
                aria-label="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
