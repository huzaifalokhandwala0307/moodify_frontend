import { useState, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import SearchDropdown from './SearchDropdown';
import type { SongResponse } from '@/types';

interface SearchBarProps {
  onSelect: (song: SongResponse) => void;
  placeholder?: string;
  large?: boolean;
}

/**
 * Search bar with debounced autocomplete dropdown.
 * On type → search local dataset → show dropdown → select → trigger recommendation.
 */
export default function SearchBar({
  onSelect,
  placeholder = 'Search for a song...',
  large = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const { results, loading } = useSearch(query);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Show dropdown when results arrive */
  useEffect(() => {
    if (results.length > 0 && query.length >= 2) {
      setOpen(true);
      setFocusIndex(-1);
    }
  }, [results, query]);

  /* Keyboard navigation */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && focusIndex >= 0) {
      e.preventDefault();
      handleSelect(results[focusIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function handleSelect(song: SongResponse) {
    setQuery(song.track_name);
    setOpen(false);
    onSelect(song);
  }

  const sizeClasses = large
    ? 'h-14 text-base px-5'
    : 'h-11 text-sm px-4';

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle ${large ? 'w-5 h-5' : 'w-4 h-4'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full ${sizeClasses} pl-12 bg-surface border border-border rounded-xl text-white placeholder:text-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all`}
          autoComplete="off"
          spellCheck={false}
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <SearchDropdown
          results={results}
          focusIndex={focusIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
