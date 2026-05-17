import { motion } from 'framer-motion';
import { Search, Brain, Headphones } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search or Set Your Vibe',
    description:
      'Find a song you love or use our vibe sliders to describe your perfect mood with energy, danceability, and valence.',
  },
  {
    icon: Brain,
    title: 'ML Clusters Your Taste',
    description:
      'Our KMeans model maps your input to one of 6 distinct mood clusters, grouping songs by their audio DNA.',
  },
  {
    icon: Headphones,
    title: 'Get Matched Songs',
    description:
      'Cosine similarity finds the closest matches in your cluster, ranked by a blend of similarity and popularity.',
  },
];

/**
 * 3-step "How It Works" section with glassmorphism cards and staggered animation.
 */
export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          How It <span className="text-accent">Works</span>
        </h2>
        <p className="text-text-muted max-w-lg mx-auto">
          Three simple steps to discover your next favorite track
        </p>
      </motion.div>

      {/* Step cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 hover:shadow-glow-sm transition-all duration-300 group"
          >
            {/* Step number + icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-mono text-text-subtle uppercase tracking-wider">
                Step {i + 1}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
