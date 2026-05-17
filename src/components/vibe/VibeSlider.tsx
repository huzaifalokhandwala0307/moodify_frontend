import { useMemo } from 'react';

interface VibeSliderProps {
  label: string;
  emoji: string;
  value: number;
  onChange: (value: number) => void;
  min?: string;
  max?: string;
}

/**
 * Custom styled range slider with accent fill, moving label, and emoji.
 */
export default function VibeSlider({
  label,
  emoji,
  value,
  onChange,
  min = 'Low',
  max = 'High',
}: VibeSliderProps) {
  /* Compute fill percentage for the track gradient */
  const fillPercent = useMemo(() => Math.round(value * 100), [value]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <span className="text-sm font-medium text-white">{label}</span>
        </div>
        <span className="text-sm font-mono text-accent font-semibold tabular-nums">
          {value.toFixed(2)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #1db954 0%, #1db954 ${fillPercent}%, #222222 ${fillPercent}%, #222222 100%)`,
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex items-center justify-between text-xs text-text-subtle">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
