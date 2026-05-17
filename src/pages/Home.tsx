import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import { PersonalizedSection } from '@/components/sections/PersonalizedSection';

/**
 * Home / Landing page.
 * Sections: Navbar → Hero → HowItWorks → Footer
 */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PersonalizedSection />
      </div>
      <HowItWorks />
      <Footer />
    </motion.div>
  );
}
