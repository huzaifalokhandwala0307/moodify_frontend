import { motion } from 'framer-motion';
import { BarChart3, Music, Disc3 } from 'lucide-react';
import Equalizer from '@/components/ui/Equalizer';
import ClusterBadge from '@/components/ui/ClusterBadge';
import type { SongResponse } from '@/types';

interface InsightsPanelProps {
  mode: 'song' | 'vibe' | null;
  cluster: number | null;
  query: string | null;
  results: SongResponse[];
  loading: boolean;
  vibeValues?: { energy: number; danceability: number; valence: number };
}

/**
 * Sticky sidebar showing current recommendation state:
 * mode, cluster, top result, mood values, and equalizer.
 */
export default function InsightsPanel({
  mode,
  cluster,
  query,
  results,
  loading,
  vibeValues,
}: InsightsPanelProps) {
  const topResult = results.length > 0 ? results[0] : null;
  const hasData = mode !== null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 glass rounded-2xl p-5 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold">Insights</h3>
        </div>
        <Equalizer active={loading || results.length > 0} barCount={4} />
      </div>

      {!hasData ? (
        <div className="py-8 text-center">
          <Disc3 className="w-8 h-8 text-text-subtle mx-auto mb-3 animate-pulse-slow" />
          <p className="text-xs text-text-subtle">
            Search a song or set your vibe to see insights
          </p>
        </div>
      ) : (
        <>
          {/* Mode */}
          <div className="space-y-1">
            <label className="text-[10px] text-text-subtle uppercase tracking-wider">
              Mode
            </label>
            <p className="text-sm font-medium text-white flex items-center gap-2">
              {mode === 'song' ? (
                <>
                  <Music className="w-3.5 h-3.5 text-accent" />
                  Song Search
                </>
              ) : (
                <>
                  <BarChart3 className="w-3.5 h-3.5 text-accent" />
                  Vibe Mode
                </>
              )}
            </p>
          </div>

          {/* Cluster */}
          {cluster !== null && (
            <div className="space-y-1">
              <label className="text-[10px] text-text-subtle uppercase tracking-wider">
                Assigned Cluster
              </label>
              <div className="flex items-center gap-2">
                <ClusterBadge cluster={cluster} size="md" />
                <span className="text-xs text-text-muted font-mono">#{cluster}</span>
              </div>
            </div>
          )}

          {/* Query */}
          {query && (
            <div className="space-y-1">
              <label className="text-[10px] text-text-subtle uppercase tracking-wider">
                Query
              </label>
              <p className="text-xs text-text-muted truncate">{query}</p>
            </div>
          )}

          {/* Vibe values */}
          {mode === 'vibe' && vibeValues && (
            <div className="space-y-2">
              <label className="text-[10px] text-text-subtle uppercase tracking-wider">
                Vibe Settings
              </label>
              {[
                { label: 'Energy', value: vibeValues.energy, emoji: '⚡' },
                { label: 'Dance', value: vibeValues.danceability, emoji: '💃' },
                { label: 'Mood', value: vibeValues.valence, emoji: '😊' },
              ].map((v) => (
                <div key={v.label} className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {v.emoji} {v.label}
                  </span>
                  <span className="text-xs font-mono text-accent">{v.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Top result preview */}
          {topResult && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-[10px] text-text-subtle uppercase tracking-wider">
                Top Match
              </label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface2 overflow-hidden flex-shrink-0">
                  {topResult.album_art ? (
                    <img
                      src={topResult.album_art}
                      alt={topResult.track_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-900/20 flex items-center justify-center">
                      <Music className="w-4 h-4 text-text-subtle" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {topResult.track_name}
                  </p>
                  <p className="text-[10px] text-text-muted truncate">
                    {topResult.artist}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="text-center pt-2">
            <span className="text-[10px] text-text-subtle">
              {results.length} recommendation{results.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}
