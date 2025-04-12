// Ghibli-themed color palette based on Studio Ghibli films
// Inspired by various Ghibli color palettes

export const ghibliPalette = {
  // Main colors
  primary: {
    light: '#a3c5e0',    // Regent St Blue - Sky blue from many Ghibli films
    main: '#7d9b5f',     // Asparagus - Green from natural landscapes
    dark: '#4a5d47',     // Dark green for contrast
  },
  
  // Secondary colors
  secondary: {
    light: '#f1dbb6',    // Sidecar - Warm cream color from backgrounds
    main: '#e3bba1',     // Cashmere - Warm earthy tone
    dark: '#c49a7c',     // Darker earthy tone
  },
  
  // Accent colors
  accent: {
    light: '#f0a3b0',    // Wewak - Soft pink from Spirited Away
    main: '#d88c9a',     // Medium pink
    dark: '#b06a78',     // Dark pink
  },
  
  // Background colors
  background: {
    light: '#ffffff',    // White
    main: '#f8f5f0',     // Off-white with warm undertone
    dark: '#1a1a2e',     // Dark blue-black for dark mode
  },
  
  // Text colors
  text: {
    light: '#f8f5f0',    // Off-white for dark backgrounds
    main: '#333333',     // Dark gray for light backgrounds
    dark: '#1a1a2e',     // Dark blue-black
  },
  
  // Additional colors for UI elements
  ui: {
    success: '#7d9b5f',  // Green
    warning: '#e6b35a',  // Amber/gold
    error: '#d16666',    // Soft red
    info: '#a3c5e0',     // Sky blue
  }
};

// Theme configuration
export const lightTheme = {
  background: ghibliPalette.background.light,
  text: ghibliPalette.text.dark,
  primary: ghibliPalette.primary.main,
  secondary: ghibliPalette.secondary.main,
  accent: ghibliPalette.accent.main,
  card: ghibliPalette.background.main,
  border: '#e0e0e0',
};

export const darkTheme = {
  background: ghibliPalette.background.dark,
  text: ghibliPalette.text.light,
  primary: ghibliPalette.primary.light,
  secondary: ghibliPalette.secondary.light,
  accent: ghibliPalette.accent.light,
  card: '#2a2a3c',
  border: '#3a3a4c',
};
