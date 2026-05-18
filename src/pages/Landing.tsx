import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { 
  Music2, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  CheckCircle2, 
  Disc,
  Sliders,
  TrendingUp,
  Loader2
} from 'lucide-react';

export default function Landing() {
  const { login, register } = useAuth();
  
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name || undefined);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      icon: Disc,
      title: 'Analyze Acoustic Profiles',
      desc: 'Our advanced K-Means model maps songs based on energy, danceability, and valence.',
    },
    {
      icon: Sliders,
      title: 'Tune to Your Mood',
      desc: 'Adjust interactive sliders to curate recommendations tailored to your exact emotional frequency.',
    },
    {
      icon: TrendingUp,
      title: 'Curated Discoveries',
      desc: 'Instantly uncover tracks that match your taste, with smart previews and bookmarking.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#1db954]/8 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] bg-teal-500/5 rounded-full blur-[120px] animate-float" />
      </div>

      {/* Header / Logo */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Music2 className="w-8 h-8 text-accent" />
            <div className="absolute inset-0 bg-accent/30 blur-lg rounded-full" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Mood<span className="text-accent">ify</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted hidden sm:inline-block bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
            Version 2.0 (ML Optimized)
          </span>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 my-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Product Intro */}
        <div className="flex-1 text-left space-y-8 max-w-xl lg:max-w-none">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Recommendations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Soundtracks tailored <br />
              to your <span className="text-gradient">Emotional Vibe</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg max-w-lg leading-relaxed">
              Step away from generic playlists. Moodify uses machine learning to decode music acoustics and align recommendations with your state of mind.
            </p>
          </div>

          {/* Core USP steps */}
          <div className="space-y-5">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-surface border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                  <step.icon className="w-5 h-5 text-accent transition-transform group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-0.5 max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Card Container */}
        <div className="w-full max-w-md lg:flex-shrink-0 relative">
          
          {/* Subtle Glow detrás de la tarjeta */}
          <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-3xl pointer-events-none" />

          {/* Centered Glassmorphic Auth Card */}
          <div className="relative glass rounded-3xl p-8 border border-white/10 shadow-glow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-accent/15 border border-accent/20 rounded-2xl flex items-center justify-center mb-3">
                <Music2 className="w-6 h-6 text-accent animate-float" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-xs text-text-muted mt-1 text-center">
                {authMode === 'login' 
                  ? 'Access your saved sounds and custom recommendations'
                  : 'Join Moodify and unlock personalized recommendations'}
              </p>
            </div>

            {/* Error display */}
            {error && (
              <div className="mb-5 p-3.5 text-xs text-red-400 bg-red-950/20 border border-red-500/20 rounded-xl leading-relaxed">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle w-4 h-4" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950/60 border border-white/5 text-sm text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-300 placeholder:text-text-subtle"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/5 text-sm text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-300 placeholder:text-text-subtle"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle w-4 h-4" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/5 text-sm text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-300 placeholder:text-text-subtle"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-accent hover:bg-accent/90 text-black font-bold rounded-xl transition-all shadow-glow-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'Continue' : 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Auth switcher */}
            <div className="mt-6 text-center text-xs text-text-muted">
              {authMode === 'login' ? (
                <>
                  New to Moodify?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setError('');
                    }}
                    className="text-white hover:text-accent font-semibold transition-colors underline underline-offset-4"
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setError('');
                    }}
                    className="text-white hover:text-accent font-semibold transition-colors underline underline-offset-4"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/5 bg-[#090909]/40 text-center">
        <p className="text-xs text-text-subtle">
          &copy; {new Date().getFullYear()} Moodify Inc. All rights reserved. Powered by machine learning acoustics.
        </p>
      </footer>
    </div>
  );
}
