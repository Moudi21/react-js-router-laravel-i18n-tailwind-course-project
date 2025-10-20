import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './i18n/I18n'; // import i18n setup
import './index.css';
import App from './App.jsx';
import ThemeProvider from './contexts/ThemeProvider.jsx';
import {UserProvider} from './contexts/UserProvider.jsx';

createRoot( document.getElementById( 'root' ) ).render(

  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>
);
