/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00FFFF',
          violet: '#8B00FF',
          dark: '#0A0E27',
          darker: '#050814',
          purple: '#6B21D8',
          blue: '#0EA5E9',
          pink: '#EC4899',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'typing': 'typing 0.5s steps(20)',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF' },
          '100%': { boxShadow: '0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #8B00FF' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}
