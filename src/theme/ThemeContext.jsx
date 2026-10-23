import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#ffffff',
      cardBg: isDarkMode ? '#1e1e1e' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#0f172a',
      subText: isDarkMode ? '#a1a1aa' : '#64748b',
      border: isDarkMode ? '#333333' : '#e2e8f0',
      inputBg: isDarkMode ? '#27272a' : '#ffffff',
      headerBg: isDarkMode ? '#1e1e1e' : '#ffffff',
      headerText: isDarkMode ? '#ffffff' : '#000000',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);