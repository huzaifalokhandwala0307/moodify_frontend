import { motion } from 'framer-motion';
import { Music2, SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  type?: 'search' | 'default';
}

/**
 * Empty state with large icon and helpful message.
 * Shown when search/recommendations return 0 results.
 */
export default function EmptyState({
  title = 'No songs found',
  subtitle = 'Try a different song name or adjust your vibe',
  type = 'default',
}: EmptyStateProps) {
  const Icon = type === 'search' ? SearchX : Music2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Decorative glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
        <div className="relative glass rounded-2xl p-6">
          <Icon className="w-12 h-12 text-text-subtle" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-muted text-center max-w-sm">{subtitle}</p>
    </motion.div>
  );
}
