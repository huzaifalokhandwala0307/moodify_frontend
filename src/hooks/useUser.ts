import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { 
  getUserProfile, 
  getUserHistory, 
  getUserLikes, 
  getUserSaves
} from '@/api/moodify';
import type { UserProfile, SongResponse } from '@/types';

export function useUser() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<SongResponse[]>([]);
  const [likes, setLikes] = useState<SongResponse[]>([]);
  const [saves, setSaves] = useState<SongResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [prof, hist, lik, sav] = await Promise.all([
        getUserProfile(user.id).catch(() => null),
        getUserHistory(user.id).catch(() => []),
        getUserLikes(user.id).catch(() => []),
        getUserSaves(user.id).catch(() => [])
      ]);
      setProfile(prof);
      setHistory(hist);
      setLikes(lik);
      setSaves(sav);
    } catch (err) {
      console.error('Error fetching user data', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    profile,
    history,
    likes,
    saves,
    isLoading,
    refresh: fetchUserData
  };
}
