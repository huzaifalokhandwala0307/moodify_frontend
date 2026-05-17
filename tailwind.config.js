/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        surface2: '#1a1a1a',
        border: '#222222',
        accent: '#1db954',
        'accent-glow': 'rgba(29,185,84,0.15)',
        'text-primary': '#ffffff',
        'text-muted': '#a3a3a3',
        'text-subtle': '#525252',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(29,185,84,0.2)',
        'glow-sm': '0 0 20px rgba(29,185,84,0.15)',
        'glow-lg': '0 0 60px rgba(29,185,84,0.25)',
      },
      animation: {
        'eq-1': 'eq 1.2s ease-in-out infinite',
        'eq-2': 'eq 1.5s ease-in-out infinite 0.2s',
        'eq-3': 'eq 1.0s ease-in-out infinite 0.4s',
        'eq-4': 'eq 1.3s ease-in-out infinite 0.1s',
        'eq-5': 'eq 1.1s ease-in-out infinite 0.3s',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        eq: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '24px' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
