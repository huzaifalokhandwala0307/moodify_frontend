import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
}

/**
 * Skeleton loading grid matching SongCard dimensions.
 * Animated shimmer effect on dark background.
 */
export default function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl bg-surface border border-border overflow-hidden"
        >
          {/* Album art skeleton */}
          <div className="relative w-full aspect-square bg-surface2 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-4 bg-surface2 rounded-full w-3/4 overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            {/* Artist */}
            <div className="h-3 bg-surface2 rounded-full w-1/2 overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            {/* Bottom row */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-5 bg-surface2 rounded-full w-16 overflow-hidden relative">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
              <div className="h-5 bg-surface2 rounded-full w-12 overflow-hidden relative">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
