import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, isSupabaseConfigured } from './auth/AuthContext';
import { SetupRequiredPage } from './components/SetupRequiredPage';
import App from './App';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {!isSupabaseConfigured ? (
      <SetupRequiredPage />
    ) : (
      <AuthProvider>
        <App />
      </AuthProvider>
    )}
  </StrictMode>,
);
