import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import AppLayout from '@/layouts/AppLayout';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import SongRecommend from '@/pages/SongRecommend';
import VibeRecommend from '@/pages/VibeRecommend';
import SavedSongs from '@/pages/SavedSongs';
import ListeningHistory from '@/pages/ListeningHistory';
import Profile from '@/pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Publicly Accessible Routes (Shielded from logged in users) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
      </Route>

      {/* Protected Main App Routes (Shielded from guests) */}
      <Route path="/app" element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="song" element={<SongRecommend />} />
          <Route path="vibe" element={<VibeRecommend />} />
          <Route path="saved" element={<SavedSongs />} />
          <Route path="history" element={<ListeningHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Catch-all Wildcard Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
