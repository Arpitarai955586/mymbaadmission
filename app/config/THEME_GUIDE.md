# 🎨 Centralized Theme System Guide

## 📋 Overview
This project uses a centralized theme system located in `/app/config/theme.ts` to maintain consistent colors and styling throughout the application.

## 🎯 Benefits

### ✅ **Single Source of Truth**
- All colors defined in one place
- Easy to update brand colors globally
- No hardcoded color values scattered across components

### ✅ **Consistency**
- Consistent color usage across all components
- Standardized hover states and transitions
- Unified design language

### ✅ **Maintainability**
- Change brand colors in one file
- Automatic updates across all components
- Easy to add new color variations

### ✅ **Developer Experience**
- IntelliSense support for theme colors
- Clear naming conventions
- Reusable utility classes

## 🚀 How to Use

### 1. Import Theme
```tsx
import { themeColors, colorCombos, themeClasses } from '../config/theme';
```

### 2. Use Colors in JSX
```tsx
// Direct color values
<div className="text-primary">Blue text</div>
<div className="bg-accent">Orange background</div>

// With opacity
<div className="border border-primary/10">Light border</div>
<div className="shadow-primary">Shadow with primary color</div>
```

### 3. Use Predefined Classes
```tsx
// Button styles
<button className={themeClasses.buttons.primary}>
  Primary Button
</button>

// Text styles
<p className={themeClasses.text.primary}>
  Primary text
</p>

// Border styles
<div className={themeClasses.borders.primary}>
  Primary border
</div>
```

### 4. Use Color Combinations
```tsx
// Predefined combinations
<div style={{ color: colorCombos.primaryText }}>
  Primary text color
</div>

<div style={{ backgroundColor: colorCombos.shadowPrimary }}>
  Shadow with primary
</div>
```

## 🎨 Available Colors

### Primary Colors
- `primary`: `#1E40AF` (Blue)
- `accent`: `#F97316` (Orange)
- `background`: `#F8F9F9` (Light gray)
- `text`: `#2C3E50` (Dark gray)
- `dark`: `#1A1A1B` (Very dark)
- `white`: `#FFFFFF` (Pure white)

### Color Variations
- `primaryHover`: `#1E3A8A` (Darker blue)
- `accentHover`: `#EA580C` (Darker orange)
- `borderPrimary`: `rgba(30, 64, 175, 0.1)`
- `borderAccent`: `rgba(249, 115, 22, 0.2)`
- `shadowPrimary`: `rgba(30, 64, 175, 0.2)`
- `shadowAccent`: `rgba(249, 115, 22, 0.2)`

## 🛠️ Utility Classes

### Buttons
```tsx
themeClasses.buttons.primary    // Primary button style
themeClasses.buttons.accent    // Accent button style
themeClasses.buttons.outline    // Outline button style
themeClasses.buttons.ghost      // Ghost button style
```

### Text
```tsx
themeClasses.text.primary       // Primary text color
themeClasses.text.accent       // Accent text color
themeClasses.text.muted        // Muted text color
themeClasses.text.light        // Light text color
```

### Borders
```tsx
themeClasses.borders.primary    // Primary border
themeClasses.borders.accent    // Accent border
themeClasses.borders.light     // Light border
```

### Backgrounds
```tsx
themeClasses.backgrounds.primary  // Primary background
themeClasses.backgrounds.accent  // Accent background
themeClasses.backgrounds.muted   // Muted background
themeClasses.backgrounds.card    // Card background
```

### Shadows
```tsx
themeClasses.shadows.primary  // Primary shadow
themeClasses.shadows.accent  // Accent shadow
themeClasses.shadows.card    // Card shadow
```

## 🔄 Tailwind CSS Integration

To use these colors in your `tailwind.config.js`:

```js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        accent: '#F97316',
        background: '#F8F9F9',
        text: '#2C3E50',
        dark: '#1A1A1B',
      }
    }
  }
}
```

## 📝 Best Practices

### 1. **Use Semantic Names**
```tsx
// ✅ Good
<div className="text-primary">

// ❌ Avoid
<div className="text-blue-600">
```

### 2. **Combine with Tailwind**
```tsx
// ✅ Good
<div className="text-primary font-bold text-lg">

// ❌ Avoid inline styles
<div style={{ color: '#1E40AF', fontWeight: 'bold' }}>
```

### 3. **Use Utility Classes**
```tsx
// ✅ Good
<button className={themeClasses.buttons.primary}>

// ❌ Avoid repeating styles
<button className="bg-primary hover:bg-primaryHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary">
```

### 4. **Consistent Hover States**
```tsx
// ✅ Good - uses predefined hover colors
<div className="text-primary hover:text-primaryHover">

// ❌ Avoid hardcoded hover colors
<div className="text-blue-600 hover:text-blue-800">
```

## 🎯 Migration Guide

### From Hardcoded Colors:
```tsx
// Before
<div className="text-[#1E40AF] border-[#F97316] bg-[#F8F9F9]">

// After
<div className="text-primary border-accent bg-background">
```

### From Inline Styles:
```tsx
// Before
<div style={{ color: '#1E40AF', backgroundColor: '#F8F9F9' }}>

// After
<div className="text-primary bg-background">
```

### From Repeated Classes:
```tsx
// Before
<button className="bg-primary hover:bg-primaryHover text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary">

// After
<button className={themeClasses.buttons.primary}>
```

## 🚀 Advanced Usage

### Custom Components with Theme
```tsx
const CustomCard = ({ children }) => {
  return (
    <div className={`${themeClasses.backgrounds.card} ${themeClasses.shadows.card} ${themeClasses.borders.light} p-6 rounded-lg`}>
      {children}
    </div>
  );
};
```

### Dynamic Colors
```tsx
const getStatusColor = (status: 'success' | 'error' | 'warning') => {
  switch (status) {
    case 'success': return 'text-green-600';
    case 'error': return 'text-red-600';
    case 'warning': return 'text-accent';
    default: return 'text-primary';
  }
};
```

## 🎨 Theme Customization

### Adding New Colors
```tsx
// In theme.ts
export const themeColors = {
  // ... existing colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};
```

### Adding New Utility Classes
```tsx
// In theme.ts
export const themeClasses = {
  // ... existing classes
  success: 'bg-success text-white font-bold',
  warning: 'bg-warning text-white font-bold',
  error: 'bg-error text-white font-bold',
};
```

## 📚 Examples

### Button Component
```tsx
const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={themeClasses.buttons[variant]}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage
<Button variant="primary">Primary Button</Button>
<Button variant="accent">Accent Button</Button>
```

### Card Component
```tsx
const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`${themeClasses.backgrounds.card} ${themeClasses.shadows.card} ${themeClasses.borders.light} rounded-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

## 🔧 Troubleshooting

### Colors Not Working
1. Check if you imported the theme correctly
2. Verify Tailwind is configured properly
3. Ensure no CSS specificity conflicts

### Build Issues
1. Make sure theme file exports are correct
2. Check for circular dependencies
3. Verify TypeScript types are correct

---

**Remember**: This centralized theme system makes your application more maintainable and ensures brand consistency! 🎉
