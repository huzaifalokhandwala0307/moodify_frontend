import { CLUSTER_MAP } from '@/types';

interface ClusterBadgeProps {
  cluster: number;
  size?: 'sm' | 'md';
}

/**
 * Pill-shaped badge showing cluster name and color.
 * Color-coded per cluster for instant visual identification.
 */
export default function ClusterBadge({ cluster, size = 'sm' }: ClusterBadgeProps) {
  const meta = CLUSTER_MAP[cluster] || {
    name: `Cluster ${cluster}`,
    color: '#888',
    bg: 'rgba(136,136,136,0.15)',
  };

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full tracking-wide uppercase ${sizeClasses}`}
      style={{
        color: meta.color,
        backgroundColor: meta.bg,
        border: `1px solid ${meta.color}30`,
      }}
    >
      {meta.name}
    </span>
  );
}
