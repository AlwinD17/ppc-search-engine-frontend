import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { applyThemeColors, applyDarkTheme, applyLightTheme } from '../utils/themeUtils';
import { ThemeContext } from './ThemeContextInstance';
import type { ThemeContextType } from './ThemeContextValue';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Cargar tema desde localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('search-engine-theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    }
  }, []);

  // Aplicar colores base y tema al documento
  useEffect(() => {
    // Aplicar colores base
    applyThemeColors();
    
    // Aplicar tema específico
    if (theme === 'dark') {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
    
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('search-engine-theme', newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
