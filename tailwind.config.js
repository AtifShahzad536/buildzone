/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          card: '#FFFFFF',
          elevated: '#F1F5F9',
          dark: '#0B1938',
        },
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
          hover: '#0077FF',
          light: '#EFF6FF',
        },
        navy: {
          DEFAULT: '#0B1938',
          dark: '#071126',
          light: '#1E293B',
          muted: '#334155',
        },
        secondary: {
          DEFAULT: '#0284C7',
          light: '#38BDF8',
          dark: '#0369A1',
        },
        accent: {
          blue: '#0066FF',
          cyan: '#0284C7',
          emerald: '#10B981',
          rose: '#EF4444',
          amber: '#F59E0B',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#F1F5F9',
          glow: 'rgba(0, 102, 255, 0.25)',
        },
        text: {
          primary: '#0B1938',
          secondary: '#334155',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '8px',
        '2xl': '10px',
        '3xl': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px -5px rgba(0, 102, 255, 0.3)',
        'glow-sm': '0 2px 10px rgba(0, 102, 255, 0.15)',
        'light-card': '0 4px 20px -4px rgba(11, 25, 56, 0.06), 0 2px 6px -2px rgba(11, 25, 56, 0.04)',
        'light-card-hover': '0 12px 30px -6px rgba(0, 102, 255, 0.12), 0 4px 10px -2px rgba(11, 25, 56, 0.06)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.9 },
        }
      }
    },
  },
  plugins: [],
}
