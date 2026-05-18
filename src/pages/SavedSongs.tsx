import React from 'react';
import { useUser } from '@/hooks/useUser';
import { SavedTracks } from '@/components/user/SavedTracks';
import { Loader2 } from 'lucide-react';

export default function SavedSongs() {
  const { saves, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Saved <span className="text-gradient">Songs</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Review and listen to the tracks you bookmarked during recommendations.
        </p>
      </div>

      <div className="pt-2">
        <SavedTracks songs={saves} />
      </div>
    </div>
  );
}
