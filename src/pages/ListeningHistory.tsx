import React from 'react';
import { useUser } from '@/hooks/useUser';
import { HistoryList } from '@/components/user/HistoryList';
import { Loader2 } from 'lucide-react';

export default function ListeningHistory() {
  const { history, isLoading } = useUser();

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
          Listening <span className="text-gradient">History</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Review the tracks you've recently previewed or enjoyed.
        </p>
      </div>

      <div className="pt-2">
        <HistoryList songs={history} />
      </div>
    </div>
  );
}
