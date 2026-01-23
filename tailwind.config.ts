import { type Config } from 'tailwindcss';

// Centralized color configuration
export const themeColors = {
  primary: '#922B21',      // Brand color for CTAs, headers, icons
  secondary: '#ffffffff',  // Footer, headings, bold text
  accent: '#D4AC0D',       // Highlights, "Apply Now" buttons, star icons
  background: '#F8F9F9',   // Main page sections (off-white)
  text: '#2C3E50',         // Body paragraphs for high readability
  dark: '#1A1A1B',         // Dark background for footer/navbar
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  }
};

// Tailwind CSS configuration with custom colors
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: themeColors.primary,
        secondary: themeColors.secondary,
        accent: themeColors.accent,
        background: themeColors.background,
        'text-primary': themeColors.text,
        dark: themeColors.dark,
        gray: themeColors.gray,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
