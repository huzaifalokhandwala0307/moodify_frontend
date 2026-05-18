import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { SongResponse } from '@/types';

interface PlayerContextType {
  currentSong: SongResponse | null;
  setCurrentSong: (song: SongResponse | null) => void;
  playSong: (song: SongResponse) => void;
  stopSong: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<SongResponse | null>(null);

  const playSong = (song: SongResponse) => {
    setCurrentSong(song);
  };

  const stopSong = () => {
    setCurrentSong(null);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, playSong, stopSong }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
