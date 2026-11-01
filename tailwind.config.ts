import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        ivory: "#FFF9EF",
        dark: "#252525",
        secondary: "#777777",
        gold: "#D9B978",
        goldLight: "#F3E7C4",
        black: "#000000",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        caveat: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow-gold': 'glowGold 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        glowGold: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(217, 185, 120, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(217, 185, 120, 0.8))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

