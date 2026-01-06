import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme context for managing dark/light mode.
 */
const ThemeContext = createContext();

/**
 * Theme provider component.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      // If user has manually set a theme, use it
      const saved = localStorage.getItem('theme');
      if (saved) return saved;

      // Otherwise, check browser/system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }

      // Default to dark if no preference found
      return 'dark';
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    const root = document.documentElement;

    // Set data-theme attribute for daisyUI
    root.setAttribute('data-theme', theme);

    // Keep dark class for Tailwind dark mode
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
