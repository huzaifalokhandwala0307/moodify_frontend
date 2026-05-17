import { useState, useCallback } from 'react';
import { recommendBySong, recommendByVibe } from '@/api/moodify';
import type { SongResponse, VibeParams } from '@/types';

interface RecommendState {
  results: SongResponse[];
  loading: boolean;
  error: string | null;
  cluster: number | null;
  query: string | null;
  mode: 'song' | 'vibe' | null;
}

/**
 * Hook for managing recommendation state.
 * Provides methods for song-based and vibe-based recommendations.
 */
export function useRecommend() {
  const [state, setState] = useState<RecommendState>({
    results: [],
    loading: false,
    error: null,
    cluster: null,
    query: null,
    mode: null,
  });

  const fetchBySong = useCallback(async (name: string) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      mode: 'song',
      query: name,
    }));

    try {
      const data = await recommendBySong(name, 12);
      setState({
        results: data.results,
        loading: false,
        error: null,
        cluster: data.cluster,
        query: data.query,
        mode: 'song',
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to get recommendations',
        results: [],
      }));
    }
  }, []);

  const fetchByVibe = useCallback(async (params: VibeParams) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      mode: 'vibe',
      query: `Energy: ${params.energy}, Dance: ${params.danceability}, Mood: ${params.valence}`,
    }));

    try {
      const data = await recommendByVibe(params);
      setState({
        results: data.results,
        loading: false,
        error: null,
        cluster: data.cluster,
        query: data.query,
        mode: 'vibe',
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to get vibe recommendations',
        results: [],
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      results: [],
      loading: false,
      error: null,
      cluster: null,
      query: null,
      mode: null,
    });
  }, []);

  return {
    results: state.results,
    loading: state.loading,
    error: state.error,
    cluster: state.cluster,
    query: state.query,
    mode: state.mode,
    recommendBySong: fetchBySong,
    recommendByVibe: fetchByVibe,
    reset,
  };
}
