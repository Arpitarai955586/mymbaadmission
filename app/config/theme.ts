// Centralized theme colors for components
// This file exports colors that can be used in both Tailwind classes and component logic

export const themeColors = {
  primary: '#1E40AF',      // Blue from logo - Brand color for CTAs, headers, icons
  secondary: '#ffffffff',  // Footer, headings, bold text
  accent: '#F97316',       // Orange from logo - Highlights, "Apply Now" buttons, star icons
  background: '#F8F9F9',   // Main page sections (off-white)
  text: '#2C3E50',         // Body paragraphs for high readability
  dark: '#1A1A1B',         // Dark background for footer/navbar
  white: '#FFFFFF',        // Pure white
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
  primaryHover: '#1E3A8A', // Darker shade of blue
  accentText: themeColors.accent,
  accentHover: '#EA580C', // Darker shade of orange
  textMuted: getColorWithOpacity(themeColors.text, 0.8),
  textLight: getColorWithOpacity(themeColors.text, 0.6),
  borderLight: getColorWithOpacity(themeColors.text, 0.2),
  borderMedium: getColorWithOpacity(themeColors.text, 0.3),
  borderPrimary: getColorWithOpacity(themeColors.primary, 0.1),
  borderAccent: getColorWithOpacity(themeColors.accent, 0.2),
  shadowPrimary: getColorWithOpacity(themeColors.primary, 0.2),
  shadowAccent: getColorWithOpacity(themeColors.accent, 0.2),
};

// Tailwind CSS custom colors configuration
export const tailwindColors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  accent: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    950: '#431407',
  }
};

// Common CSS classes for consistent styling
export const themeClasses = {
  // Button styles
  buttons: {
    primary: 'bg-primary hover:bg-primaryHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary',
    accent: 'bg-accent hover:bg-accentHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-accent',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10 font-bold transition-all',
  },
  
  // Text styles
  text: {
    primary: 'text-primary',
    accent: 'text-accent',
    muted: 'text-gray-600',
    light: 'text-gray-500',
  },
  
  // Border styles
  borders: {
    primary: 'border border-primary',
    accent: 'border border-accent',
    light: 'border border-gray-200',
  },
  
  // Background styles
  backgrounds: {
    primary: 'bg-primary',
    accent: 'bg-accent',
    muted: 'bg-gray-50',
    card: 'bg-white',
  },
  
  // Shadow styles
  shadows: {
    primary: 'shadow-lg shadow-primary',
    accent: 'shadow-lg shadow-accent',
    card: 'shadow-md',
  }
};

// Gradient combinations
export const gradients = {
  primary: 'from-primary to-primaryHover',
  accent: 'from-accent to-accentHover',
  hero: 'from-primary via-primaryHover to-dark',
  card: 'from-white via-white to-background',
};
