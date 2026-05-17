import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Music } from 'lucide-react';
import Equalizer from '@/components/ui/Equalizer';

/**
 * Full viewport hero section with animated gradient blobs,
 * bold headline, CTAs, equalizer decoration, and stats row.
 */
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] bg-accent/30 top-[-10%] left-[-10%]" />
      <div className="gradient-blob w-[500px] h-[500px] bg-purple-600/20 bottom-[-5%] right-[-5%]" />
      <div className="gradient-blob w-[300px] h-[300px] bg-teal-500/15 top-[40%] right-[20%]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Floating equalizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-3">
            <Equalizer active barCount={5} />
            <span className="text-sm font-medium text-text-muted">
              ML-Powered Recommendations
            </span>
            <Equalizer active barCount={5} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Your Music. Your Mood.
          <br />
          <span className="text-gradient">Reimagined.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ML-powered recommendations that actually get your taste.
          Search a song or dial in your vibe — we'll handle the rest.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => navigate('/discover')}
            className="group flex items-center gap-2 px-8 py-3.5 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-all hover:shadow-glow active:scale-95 text-sm sm:text-base"
          >
            <Search className="w-4 h-4" />
            Find by Song
          </button>
          <button
            onClick={() => navigate('/discover?mode=vibe')}
            className="group flex items-center gap-2 px-8 py-3.5 border border-accent/40 text-accent font-semibold rounded-full hover:bg-accent/10 hover:border-accent/60 transition-all active:scale-95 text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4" />
            Try Vibe Mode
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: '10,000+', label: 'Songs' },
            { value: '6', label: 'Mood Clusters' },
            { value: 'ML', label: 'Powered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Music className="w-3.5 h-3.5 text-accent" />
                <span className="text-lg sm:text-xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs text-text-subtle uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
