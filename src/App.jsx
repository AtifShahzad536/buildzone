import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  return (
    <BrowserRouter>
      {/* Toast Notification Container */}
      <Toaster
        theme="light"
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#0B1938',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(11, 25, 56, 0.1)',
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
