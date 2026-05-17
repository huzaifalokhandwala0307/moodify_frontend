import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import VibeSlider from './VibeSlider';
import type { VibeParams } from '@/types';

interface VibePanelProps {
  onSubmit: (params: VibeParams) => void;
  loading?: boolean;
}

/**
 * Vibe mode panel with 3 sliders and animated gradient backdrop.
 * Submits energy, danceability, valence params to the recommend API.
 */
export default function VibePanel({ onSubmit, loading = false }: VibePanelProps) {
  const [energy, setEnergy] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [valence, setValence] = useState(0.5);

  function handleSubmit() {
    onSubmit({ energy, danceability, valence, n: 12 });
  }

  /* Dynamic background gradient based on slider values */
  const gradientStyle = {
    background: `radial-gradient(
      ellipse at ${30 + energy * 40}% ${30 + valence * 40}%,
      rgba(29,185,84,${0.06 + energy * 0.08}) 0%,
      rgba(29,185,84,${0.02 + danceability * 0.04}) 40%,
      transparent 70%
    )`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative glass rounded-2xl p-6 overflow-hidden"
    >
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
        style={gradientStyle}
      />

      <div className="relative z-10 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold tracking-tight">Set Your Vibe</h3>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          <VibeSlider
            label="Energy"
            emoji="⚡"
            value={energy}
            onChange={setEnergy}
            min="Calm"
            max="Hype"
          />
          <VibeSlider
            label="Danceability"
            emoji="💃"
            value={danceability}
            onChange={setDanceability}
            min="Chill"
            max="Groove"
          />
          <VibeSlider
            label="Mood"
            emoji="😊"
            value={valence}
            onChange={setValence}
            min="Melancholy"
            max="Euphoric"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 bg-accent text-black font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-glow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Finding your sound...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Find My Sound
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
