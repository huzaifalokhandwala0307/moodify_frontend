import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/search/SearchBar';
import VibePanel from '@/components/vibe/VibePanel';
import SongGrid from '@/components/songs/SongGrid';
import MiniPlayer from '@/components/songs/MiniPlayer';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import InsightsPanel from '@/components/sections/InsightsPanel';
import { useRecommend } from '@/hooks/useRecommend';
import type { SongResponse, VibeParams } from '@/types';

type TabMode = 'search' | 'vibe';

/**
 * Main app page — Discover.
 * Layout: sidebar (InsightsPanel) + main content with tabs (Search / Vibe).
 */
export default function Discover() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabMode>(
    searchParams.get('mode') === 'vibe' ? 'vibe' : 'search',
  );
  const [previewSong, setPreviewSong] = useState<SongResponse | null>(null);
  const [vibeValues, setVibeValues] = useState({ energy: 0.5, danceability: 0.5, valence: 0.5 });
  const [hasSearched, setHasSearched] = useState(false);

  const {
    results,
    loading,
    error,
    cluster,
    query,
    mode,
    recommendBySong,
    recommendByVibe,
  } = useRecommend();

  /* Update tab from URL params */
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'vibe') setActiveTab('vibe');
  }, [searchParams]);

  /* Handler: song selected from search */
  function handleSongSelect(song: SongResponse) {
    setHasSearched(true);
    recommendBySong(song.track_name);
  }

  /* Handler: vibe submitted */
  function handleVibeSubmit(params: VibeParams) {
    setHasSearched(true);
    setVibeValues({
      energy: params.energy,
      danceability: params.danceability,
      valence: params.valence,
    });
    recommendByVibe(params);
  }

  const tabs: { id: TabMode; label: string; icon: typeof Search }[] = [
    { id: 'search', label: 'Search Song', icon: Search },
    { id: 'vibe', label: 'Vibe Mode', icon: Sparkles },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── Sidebar ─────────────────────────────── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <InsightsPanel
              mode={mode}
              cluster={cluster}
              query={query}
              results={results}
              loading={loading}
              vibeValues={mode === 'vibe' ? vibeValues : undefined}
            />
          </aside>

          {/* ─── Main Content ────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Discover <span className="text-gradient">Music</span>
              </h1>
              <p className="text-text-muted">
                Find your next favorite track with ML-powered recommendations
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl pb-4 mb-6 border-b border-white/5">
              <div className="flex items-center gap-1 bg-surface rounded-xl p-1 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'text-black'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-accent rounded-lg"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="mb-8">
              {activeTab === 'search' ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SearchBar
                    onSelect={handleSongSelect}
                    placeholder="Search for a song name..."
                    large
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="vibe"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VibePanel onSubmit={handleVibeSubmit} loading={loading} />
                </motion.div>
              )}
            </div>

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 glass rounded-xl p-4 border border-red-500/20"
              >
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Results area */}
            {loading ? (
              <LoadingSkeleton count={8} />
            ) : results.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Recommendations
                    <span className="text-text-muted font-normal text-sm ml-2">
                      ({results.length} songs)
                    </span>
                  </h2>
                </div>
                <SongGrid songs={results} onPlayPreview={setPreviewSong} />
              </div>
            ) : hasSearched && !loading ? (
              <EmptyState
                type="search"
                title="No recommendations found"
                subtitle={
                  activeTab === 'search'
                    ? 'Try searching for a different song'
                    : 'Try adjusting your vibe sliders'
                }
              />
            ) : null}
          </div>
        </div>
      </main>

      {/* Mobile insights (collapsed) */}
      <div className="lg:hidden fixed bottom-16 left-4 right-4 z-40">
        {mode && cluster !== null && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong rounded-xl px-4 py-2 flex items-center justify-between text-xs"
          >
            <span className="text-text-muted">
              Cluster: <span className="text-accent font-semibold">#{cluster}</span>
            </span>
            <span className="text-text-muted">
              {results.length} results
            </span>
          </motion.div>
        )}
      </div>

      <Footer />

      {/* Mini Player */}
      <MiniPlayer song={previewSong} onClose={() => setPreviewSong(null)} />
    </motion.div>
  );
}
