import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme/theme.js';
import { AuthProvider } from './context/AuthContext';
import { ServiciosProvider } from './context/ServiciosContext.jsx';
import { ClientesProvider } from './context/ClientesContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ServiciosProvider>
        <ClientesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ClientesProvider>
      </ServiciosProvider>
    </AuthProvider>
  </React.StrictMode>
);
