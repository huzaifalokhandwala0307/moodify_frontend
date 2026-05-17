import { Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Center everything */}
        <div className="flex flex-col items-center gap-2">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">
              Mood<span className="text-accent">ify</span>
            </span>
            <span className="text-text-subtle text-sm">
              — ML-powered music recommendations
            </span>
          </div>

          {/* Credit */}
          <p className="text-xs text-text-subtle">
            © 2026 Moodify. Moodified by Huzaifa Lokhandwala 🎵
          </p>

        </div>
      </div>
    </footer>
  );
}