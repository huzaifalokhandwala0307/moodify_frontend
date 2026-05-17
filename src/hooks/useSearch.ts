import { useState, useEffect } from 'react';
import { searchSongs } from '@/api/moodify';
import { useDebounce } from './useDebounce';
import type { SongResponse } from '@/types';

/**
 * Hook for searching songs with debounced input.
 * Calls searchSongs() when the debounced query changes.
 */
export function useSearch(query: string) {
  const [results, setResults] = useState<SongResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchSongs(debouncedQuery, 8)
      .then((data) => {
        if (!cancelled) {
          setResults(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setResults([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return { results, loading, error };
}
