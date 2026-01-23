// Centralized theme colors for components
// This file exports colors that can be used in both Tailwind classes and component logic

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

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Export commonly used color combinations
export const colorCombos = {
  primaryText: themeColors.primary,
  primaryHover: '#7A2318', // Darker shade of primary
  accentText: themeColors.accent,
  textMuted: getColorWithOpacity(themeColors.text, 0.8),
  textLight: getColorWithOpacity(themeColors.text, 0.6),
  borderLight: getColorWithOpacity(themeColors.text, 0.2),
  borderMedium: getColorWithOpacity(themeColors.text, 0.3),
};
