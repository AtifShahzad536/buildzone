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
          DEFAULT: '#060B18',
          subtle: '#0A1128',
          card: '#0B1528',
          elevated: '#111E38',
          dark: '#030712',
        },
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
          hover: '#0077FF',
          light: '#0A1E4A',
          neon: '#00F0FF',
        },
        navy: {
          DEFAULT: '#060B18',
          dark: '#030712',
          light: '#0B1528',
          muted: '#1E293B',
        },
        secondary: {
          DEFAULT: '#0284C7',
          light: '#38BDF8',
          dark: '#0369A1',
        },
        accent: {
          blue: '#0066FF',
          cyan: '#00F0FF',
          emerald: '#10B981',
          rose: '#EF4444',
          amber: '#F59E0B',
        },
        border: {
          DEFAULT: '#1E293B',
          subtle: '#0F172A',
          glow: 'rgba(0, 102, 255, 0.35)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
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
