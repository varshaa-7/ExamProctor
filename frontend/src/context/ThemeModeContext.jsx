import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { baselightTheme } from 'src/theme/DefaultColors';

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('themeMode');
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => {
    // base theme comes from DefaultColors, we only toggle palette.mode
    const base = baselightTheme;
    // When switching to dark mode, merge in a few sensible overrides so
    // colors (background, text, divider) look correct for dark UIs.
    const palette =
      mode === 'dark'
        ? {
            ...base.palette,
            mode,
            background: {
              default: '#0b1220', // deep navy
              paper: '#0f1724',
            },
            text: {
              primary: '#E6EEF8',
              secondary: '#B6C7DA',
            },
            divider: 'rgba(255,255,255,0.08)',
            action: {
              ...base.palette.action,
              hover: 'rgba(255,255,255,0.04)',
            },
          }
        : { ...base.palette, mode };

    return createTheme({
      ...base,
      palette,
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, theme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return context;
};
