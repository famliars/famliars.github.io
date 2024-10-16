// App.tsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, TextField, mergeStyles } from '@fluentui/react';

// 定义 Light 和 Dark 主题
const lightTheme = createTheme({
  palette: {
    themePrimary: '#111',
    neutralLighter: '#fff',
    neutralLight: '#ccc',
    neutralTertiaryAlt: '#aaa',
  },
});

const darkTheme = createTheme({
  palette: {
    themePrimary: '#eee',
    neutralLighter: '#111',
    neutralLight: '#aaa',
    neutralTertiaryAlt: '#ccc',
  },
});

// MirrorsPage 组件
const MirrorsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getWidthStyles = (): React.CSSProperties => {
    const width = window.innerWidth;
    if (width <= 480) {
      return { width: '60%', minWidth: 240, padding: '0 15px' };
    } else if (width <= 960) {
      return { width: '50%', minWidth: 288, padding: '0 16px' };
    } else if (width <= 1440) {
      return { width: '40%', minWidth: 480, padding: '0 17px' };
    } else {
      return { width: '35%', minWidth: 576, padding: '0 18px' };
    }
  };

  const styles = mergeStyles({
    height: 60,
    borderRadius: 2,
    border: `1px solid ${isDarkMode ? '#aaa' : '#ccc'}`,
    backgroundColor: isDarkMode ? '#111' : '#fff',
    color: isDarkMode ? '#eee' : '#111',
    ...getWidthStyles(),
  });

  return (
    <div className={mergeStyles({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: isDarkMode ? '#111' : '#fff'
    })}>
      <TextField
        placeholder="Unit"
        styles={{ fieldGroup: { ...styles } }}
      />
    </div>
  );
};

// App 组件
const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <MirrorsPage />
    </ThemeProvider>
  );
};

// 确保正确导出 App 组件
export default App;
