/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Palette
        void: '#030305',
        forge: {
          950: '#050508',
          900: '#0A0A0F',
          800: '#101018',
          700: '#161622',
          600: '#1E1E2E',
          500: '#2A2A3C',
        },
        // Metallic Tones
        steel: {
          800: '#3D3D4A',
          600: '#6E6E7A',
          400: '#9090A0',
          300: '#B8B8C8',
          200: '#D0D0DC',
          100: '#E8E8F0',
        },
        // Light Palette
        snow: '#FAFAFA',
        concrete: '#F0F0F5',
        // Primary - Ignition Orange
        ignition: {
          700: '#E04A00',
          600: '#FF5500',
          500: '#FF6A1A',
          400: '#FF7A2E',
        },
        // Secondary - Electric Blue
        electric: {
          600: '#0077FF',
          500: '#0088FF',
        },
        // Functional
        success: '#22C55E',
        whatsapp: '#25D366',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Orbitron', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 15vw, 12rem)',
        'section': 'clamp(2.5rem, 6vw, 5rem)',
      },
      backgroundImage: {
        'molten': 'linear-gradient(135deg, #E04A00, #FF5500, #FF7A2E)',
        'dark-glass': 'linear-gradient(135deg, rgba(10,10,15,0.85), rgba(10,10,15,0.95))',
        'blueprint': 'linear-gradient(rgba(0,119,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,255,0.03) 1px, transparent 1px)',
      },
      boxShadow: {
        'orange-glow': '0 0 60px rgba(255,85,0,0.4)',
        'blue-glow': '0 0 40px rgba(0,119,255,0.3)',
        'whatsapp-glow': '0 6px 20px rgba(37,211,102,0.4)',
        'card': '0 20px 50px rgba(0,0,0,0.1)',
        'card-hover': '0 30px 60px rgba(0,0,0,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,85,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255,85,0,0.6)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
