import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/index.css';
import './styles/animations.css';

// Auto-recover from dynamic module import failures after new deployments
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

window.addEventListener('error', (event) => {
  if (
    event?.message &&
    (event.message.includes('Failed to fetch dynamically imported module') ||
     event.message.includes('Expected a JavaScript-or-Wasm module script'))
  ) {
    window.location.reload();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
