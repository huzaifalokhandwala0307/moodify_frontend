/* ─── Moodify API Layer ──────────────────────────────────── */
/* All Axios calls to the FastAPI backend.                   */
/* Base URL sourced from VITE_API_URL env variable.          */

import axios from 'axios';
import type {
  SongResponse,
  RecommendResponse,
  PersonalizedRecommendResponse,
  SearchResponse,
  VibeParams,
  HealthResponse,
  UserProfile,
} from '@/types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('moodify_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ─── Search songs in local dataset ────────────────────── */
export async function searchSongs(
  q: string,
  limit: number = 10,
): Promise<SongResponse[]> {
  try {
    const { data } = await api.get<SearchResponse>('/songs/search', {
      params: { q, limit },
    });
    return data.results;
  } catch (err) {
    console.error('[Moodify] searchSongs failed:', err);
    throw new Error('Failed to search songs. Please try again.');
  }
}

/* ─── Recommend by song name ───────────────────────────── */
export async function recommendBySong(
  songName: string,
  n: number = 10,
): Promise<RecommendResponse> {
  try {
    const { data } = await api.get<RecommendResponse>('/recommend/song', {
      params: { song_name: songName, n },
    });
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      throw new Error(`Song "${songName}" not found in our dataset.`);
    }
    console.error('[Moodify] recommendBySong failed:', err);
    throw new Error('Failed to get recommendations. Please try again.');
  }
}

/* ─── Recommend by vibe parameters ─────────────────────── */
export async function recommendByVibe(
  params: VibeParams,
): Promise<RecommendResponse> {
  try {
    const { data } = await api.get<RecommendResponse>('/recommend/vibe', {
      params: {
        energy: params.energy,
        danceability: params.danceability,
        valence: params.valence,
        n: params.n,
      },
    });
    return data;
  } catch (err) {
    console.error('[Moodify] recommendByVibe failed:', err);
    throw new Error('Failed to get vibe recommendations. Please try again.');
  }
}

/* ─── Personalized Recommendations ───────────────────────── */
export async function recommendPersonalized(
  userId: string,
  n: number = 10,
): Promise<PersonalizedRecommendResponse> {
  try {
    const { data } = await api.get<PersonalizedRecommendResponse>(`/recommend/user/${userId}`, {
      params: { n },
    });
    return data;
  } catch (err) {
    console.error('[Moodify] recommendPersonalized failed:', err);
    throw new Error('Failed to get personalized recommendations.');
  }
}

/* ─── User Profile ─────────────────────────────────────── */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>(`/user/profile/${userId}`);
  return data;
}

export async function getUserHistory(userId: string): Promise<SongResponse[]> {
  const { data } = await api.get<SongResponse[]>(`/user/history/${userId}`);
  return data;
}

export async function getUserLikes(userId: string): Promise<SongResponse[]> {
  const { data } = await api.get<SongResponse[]>(`/user/likes/${userId}`);
  return data;
}

export async function getUserSaves(userId: string): Promise<SongResponse[]> {
  const { data } = await api.get<SongResponse[]>(`/user/saves/${userId}`);
  return data;
}

/* ─── User Actions ─────────────────────────────────────── */
export async function logHistory(songId: string): Promise<void> {
  await api.post('/user/history', { song_id: songId });
}

export async function likeSong(songId: string): Promise<void> {
  await api.post('/user/likes', { song_id: songId });
}

export async function unlikeSong(songId: string): Promise<void> {
  await api.delete(`/user/likes/${songId}`);
}

export async function saveSong(songId: string): Promise<void> {
  await api.post('/user/saves', { song_id: songId });
}

export async function unsaveSong(songId: string): Promise<void> {
  await api.delete(`/user/saves/${songId}`);
}

/* ─── Health check ─────────────────────────────────────── */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const { data } = await api.get<HealthResponse>('/health');
    return data;
  } catch (err) {
    console.error('[Moodify] healthCheck failed:', err);
    throw new Error('Backend is unreachable.');
  }
}
