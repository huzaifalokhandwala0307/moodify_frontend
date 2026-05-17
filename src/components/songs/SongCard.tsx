import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink, Music, Heart, Bookmark } from 'lucide-react';
import ClusterBadge from '@/components/ui/ClusterBadge';
import { formatSimilarity, formatScore } from '@/lib/utils';
import type { SongResponse } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { likeSong, unlikeSong, saveSong, unsaveSong, logHistory } from '@/api/moodify';

interface SongCardProps {
  song: SongResponse;
  index: number;
  onPlayPreview?: (song: SongResponse) => void;
}

/**
 * Glassmorphism song card with album art, metadata, score badges,
 * Spotify link, and audio preview capability.
 */
export default function SongCard({ song, index, onPlayPreview }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { user } = useAuth();
  const { likes, saves, refresh } = useUser();
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const isLiked = likes.some(l => l.id === song.id);
  const isSaved = saves.some(s => s.id === song.id);

  /* Cleanup audio on unmount */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function togglePreview() {
    if (!song.preview_url) return;

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      /* Stop any previously playing audio */
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(song.preview_url);
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
      setIsPlaying(true);
      onPlayPreview?.(song);
      
      // Log history if user is logged in
      if (user && song.id) {
        logHistory(song.id).then(refresh).catch(console.error);
      }
    }
  }

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || isLiking || !song.id) return;
    setIsLiking(true);
    try {
      if (isLiked) await unlikeSong(song.id);
      else await likeSong(song.id);
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || isSaving || !song.id) return;
    setIsSaving(true);
    try {
      if (isSaved) await unsaveSong(song.id);
      else await saveSong(song.id);
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="group relative glass rounded-2xl overflow-hidden shadow-xl hover:shadow-glow hover:border-accent/30 transition-all duration-300 cursor-default"
    >
      {/* Cluster badge — top right */}
      <div className="absolute top-3 right-3 z-10">
        <ClusterBadge cluster={song.cluster} />
      </div>

      {/* Album Art */}
      <div className="relative w-full aspect-square overflow-hidden bg-surface2">
        {song.album_art && !imgError ? (
          <img
            src={song.album_art}
            alt={song.track_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Fallback gradient placeholder */
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface2 to-purple-900/20 flex items-center justify-center">
            <Music className="w-16 h-16 text-text-subtle/50" strokeWidth={1} />
          </div>
        )}

        {/* Play overlay */}
        {song.preview_url && (
          <button
            onClick={togglePreview}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300"
            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
          >
            <div
              className={`w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-glow transition-all duration-300 ${
                isPlaying
                  ? 'scale-100 opacity-100'
                  : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
              )}
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Track name */}
        <h4 className="font-semibold text-white truncate text-sm leading-tight">
          {song.track_name}
        </h4>

        {/* Artist */}
        <p className="text-xs text-text-muted truncate">
          {song.artist || 'Unknown Artist'}
        </p>

        {/* Bottom row: scores + Spotify link */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            {/* Score badge */}
            {song.score !== null && (
              <span className="inline-flex items-center text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                {formatScore(song.score)}
              </span>
            )}
            {/* Similarity badge */}
            {song.similarity !== null && (
              <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                {formatSimilarity(song.similarity)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user && (
              <>
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className="text-text-subtle hover:text-green-400 transition-colors"
                  aria-label={isLiked ? 'Unlike song' : 'Like song'}
                >
                  <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-text-subtle hover:text-green-400 transition-colors"
                  aria-label={isSaved ? 'Remove save' : 'Save song'}
                >
                  <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                </button>
              </>
            )}
            
            {/* Spotify link */}
            {song.spotify_url && (
              <a
                href={song.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-subtle hover:text-accent transition-colors"
                aria-label="Open in Spotify"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
