// Theme Provider
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
// Router Provider
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';

// Redux Provider
import { Provider } from 'react-redux';
import store from './store';
// Tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Cheating Log Provider
import { CheatingLogProvider } from './context/CheatingLogContext';

function AppContent() {
  const { theme } = useThemeMode();
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CheatingLogProvider>
          <ToastContainer />
          <CssBaseline />
          <RouterProvider router={Router} />
        </CheatingLogProvider>
      </Provider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
