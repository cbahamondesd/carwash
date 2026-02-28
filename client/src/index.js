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
import { BrowserRouter } from 'react-router-dom';
import { OrdenesProvider } from './context/OrdenesContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ServiciosProvider>
          <ClientesProvider>
            <OrdenesProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </OrdenesProvider>
          </ClientesProvider>
        </ServiciosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
