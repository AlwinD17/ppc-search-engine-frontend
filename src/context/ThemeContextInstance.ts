import { createContext } from 'react';
import type { ThemeContextType } from './ThemeContextValue';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
