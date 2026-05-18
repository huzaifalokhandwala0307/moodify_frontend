import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import VibePanel from '@/components/vibe/VibePanel';
import SongGrid from '@/components/songs/SongGrid';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import InsightsPanel from '@/components/sections/InsightsPanel';
import { useRecommend } from '@/hooks/useRecommend';
import type { VibeParams } from '@/types';

export default function VibeRecommend() {
  const [hasSearched, setHasSearched] = useState(false);
  const [vibeValues, setVibeValues] = useState({ energy: 0.5, danceability: 0.5, valence: 0.5 });

  const {
    results,
    loading,
    error,
    cluster,
    query,
    mode,
    recommendByVibe,
  } = useRecommend();

  function handleVibeSubmit(params: VibeParams) {
    setHasSearched(true);
    setVibeValues({
      energy: params.energy,
      danceability: params.danceability,
      valence: params.valence,
    });
    recommendByVibe(params);
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Recommend by <span className="text-gradient">Vibe</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Adjust the sliders below to dial in your precise mood. We'll search acoustic space to generate recommendations that match.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Controls Panel */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Acoustic Synthesizer</h3>
            <VibePanel onSubmit={handleVibeSubmit} loading={loading} />
          </div>

          {/* Results display */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/20 text-sm text-red-400 rounded-xl leading-relaxed">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSkeleton count={8} />
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Recommendations matching your vibe</h3>
              <SongGrid songs={results} />
            </div>
          ) : hasSearched ? (
            <EmptyState
              type="search"
              title="No recommendations found"
              subtitle="Try adjusting your vibe sliders."
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/5 rounded-2xl bg-zinc-950/20">
              <Sparkles className="w-12 h-12 text-emerald-400/80 mb-4 animate-pulse" />
              <h3 className="text-sm font-semibold text-white">Synthesize your vibe</h3>
              <p className="text-xs text-text-subtle max-w-xs mt-1">
                Tweak energy, danceability, and mood sliders above and click submit to trigger machine learning recommendations.
              </p>
            </div>
          )}
        </div>

        {/* Desktop ML Insights Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <InsightsPanel
            mode={mode}
            cluster={cluster}
            query={query}
            results={results}
            loading={loading}
            vibeValues={mode === 'vibe' ? vibeValues : undefined}
          />
        </aside>

      </div>
    </div>
  );
}
