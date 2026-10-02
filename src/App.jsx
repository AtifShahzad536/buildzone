import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Toast Notification Container */}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#0B1528',
              border: '1px solid #1E293B',
              color: '#F8FAFC',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
            },
          }}
        />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
