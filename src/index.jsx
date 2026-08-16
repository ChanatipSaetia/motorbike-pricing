import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#90caf9',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d47a1',
      light: '#2196f3',
      dark: '#0a3678',
      contrastText: '#ffffff',
    },
    error: {
      main: '#0d47a1',
      light: '#2196f3',
      dark: '#0a3678',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#90caf9',
    },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d47a1',
      secondary: '#1565c0',
    },
  },
  typography: {
    fontFamily: ['Sarabun', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    fontSize: 18, // Base font size boosted for elderly legibility
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2.2rem' },
    h3: { fontWeight: 700, fontSize: '2rem' },
    h4: { fontWeight: 700, fontSize: '1.75rem' },
    h5: { fontWeight: 700, fontSize: '1.5rem' },
    h6: { fontWeight: 700, fontSize: '1.25rem' },
    body1: { fontSize: '1.15rem', lineHeight: 1.6 },
    body2: { fontSize: '1.05rem', lineHeight: 1.5 },
    button: { fontSize: '1.15rem', fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 12,
          paddingTop: 12,
          paddingBottom: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        sizeLarge: {
          fontSize: '1.3rem',
          paddingTop: 14,
          paddingBottom: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          fontWeight: 600,
          color: '#334155',
          '&.Mui-focused': {
            color: '#1d4ed8',
            fontWeight: 700,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '1.35rem',
          fontWeight: 600,
          borderRadius: 12,
          '& fieldset': {
            borderWidth: '2px',
            borderColor: '#cbd5e1',
          },
          '&:hover fieldset': {
            borderColor: '#64748b',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1d4ed8',
            borderWidth: '2.5px',
          },
        },
        input: {
          padding: '16.5px 14px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
          border: '2px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1.05rem',
          fontWeight: 600,
          height: '38px',
          borderRadius: '10px',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
