import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SearchBar from '@/components/search/SearchBar';
import SongGrid from '@/components/songs/SongGrid';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import InsightsPanel from '@/components/sections/InsightsPanel';
import { useRecommend } from '@/hooks/useRecommend';
import type { SongResponse } from '@/types';

export default function SongRecommend() {
  const [hasSearched, setHasSearched] = useState(false);
  const {
    results,
    loading,
    error,
    cluster,
    query,
    mode,
    recommendBySong,
  } = useRecommend();

  function handleSongSelect(song: SongResponse) {
    setHasSearched(true);
    recommendBySong(song.track_name);
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Recommend by <span className="text-gradient">Song</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Search for any track in our database, and we'll cluster acoustic similarities to find perfect matches.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Search Panel */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Acoustic Search</h3>
            <SearchBar
              onSelect={handleSongSelect}
              placeholder="Search for a song name..."
              large
            />
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
              <h3 className="text-lg font-bold text-white">Recommendations for "{query}"</h3>
              <SongGrid songs={results} />
            </div>
          ) : hasSearched ? (
            <EmptyState
              type="search"
              title="No recommendations found"
              subtitle="Try searching for a different song."
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/5 rounded-2xl bg-zinc-950/20">
              <Search className="w-12 h-12 text-text-subtle mb-4 animate-pulse" />
              <h3 className="text-sm font-semibold text-white">Start your search</h3>
              <p className="text-xs text-text-subtle max-w-xs mt-1">
                Enter a track name above. Our algorithm will fetch the K-Means cluster matches immediately.
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
          />
        </aside>

      </div>
    </div>
  );
}
