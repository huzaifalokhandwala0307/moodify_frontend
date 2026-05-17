interface EqualizerProps {
  active?: boolean;
  barCount?: number;
  className?: string;
}

/**
 * Animated equalizer bars — accent green, plays when active.
 * Pure CSS animation, each bar has independent timing.
 */
export default function Equalizer({
  active = true,
  barCount = 5,
  className = '',
}: EqualizerProps) {
  const animationClasses = [
    'animate-eq-1',
    'animate-eq-2',
    'animate-eq-3',
    'animate-eq-4',
    'animate-eq-5',
  ];

  return (
    <div className={`flex items-end gap-[3px] h-6 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-accent transition-all duration-300 ${
            active ? animationClasses[i % animationClasses.length] : ''
          }`}
          style={{
            height: active ? undefined : '4px',
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}
