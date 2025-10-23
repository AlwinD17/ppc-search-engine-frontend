import { themeConfig } from '../config/theme';

// Función para aplicar los colores al CSS
export const applyThemeColors = () => {
  const root = document.documentElement;
  
  // Aplicar colores primarios
  Object.entries(themeConfig.primary).forEach(([key, value]) => {
    root.style.setProperty(`--color-primary-${key}`, value);
  });
  
  // Aplicar colores secundarios
  Object.entries(themeConfig.secondary).forEach(([key, value]) => {
    root.style.setProperty(`--color-secondary-${key}`, value);
  });
  
  // Aplicar colores de acento
  Object.entries(themeConfig.accent).forEach(([key, value]) => {
    root.style.setProperty(`--color-accent-${key}`, value);
  });
  
  // Aplicar colores del tema claro
  Object.entries(themeConfig.light).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};

// Función para cambiar a tema oscuro
export const applyDarkTheme = () => {
  const root = document.documentElement;
  
  // Aplicar colores del tema oscuro
  Object.entries(themeConfig.dark).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};

// Función para cambiar a tema claro
export const applyLightTheme = () => {
  const root = document.documentElement;
  
  // Aplicar colores del tema claro
  Object.entries(themeConfig.light).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};
