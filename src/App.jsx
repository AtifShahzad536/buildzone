import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  return (
    <BrowserRouter>
      {/* Toast Notification Container */}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: '#0E1424',
            border: '1px solid #1E293B',
            color: '#F8FAFC',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '0px',
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
