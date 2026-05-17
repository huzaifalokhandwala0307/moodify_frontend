/* ─── Types for Moodify Frontend ─────────────────────────── */

export interface SongResponse {
  id: string;
  track_name: string;
  artist: string | null;
  album: string | null;
  cluster: number;
  similarity: number | null;
  score: number | null;
  popularity: number | null;
  album_art: string | null;
  preview_url: string | null;
  spotify_url: string | null;
}

export interface RecommendResponse {
  query: string;
  cluster: number;
  results: SongResponse[];
}

export interface SearchResponse {
  query: string;
  count: number;
  results: SongResponse[];
}

export interface VibeParams {
  energy: number;
  danceability: number;
  valence: number;
  n: number;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  songs_count: number;
  timestamp: string;
}

/* ─── User & Auth Types ────────────────────────────── */

export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
}

export interface PersonalizedRecommendResponse {
  user_id: string;
  mode: string;
  dominant_clusters: number[];
  results: SongResponse[];
}

/* Cluster metadata for display */
export interface ClusterMeta {
  name: string;
  color: string;
  bg: string;
}

export const CLUSTER_MAP: Record<number, ClusterMeta> = {
  0: { name: 'Acoustic', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  1: { name: 'Dance', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  2: { name: 'Chill', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  3: { name: 'Hip-Hop', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  4: { name: 'Energy', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  5: { name: 'Pop', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
};
