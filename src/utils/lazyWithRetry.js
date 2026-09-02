import React from 'react';

/**
 * Self-healing lazy loading wrapper.
 * Automatically recovers from dynamic import failures after deployments on Vercel
 * when chunk hashes change.
 */
export const lazyWithRetry = (componentImport) =>
  React.lazy(async () => {
    const isAlreadyRefreshed = window.sessionStorage.getItem('bz_chunk_reload_attempted') === 'true';

    try {
      return await componentImport();
    } catch (error) {
      console.warn('Chunk loading failed. Auto-refreshing to fetch latest version...', error);

      if (!isAlreadyRefreshed) {
        window.sessionStorage.setItem('bz_chunk_reload_attempted', 'true');
        // Force hard reload from server
        window.location.reload();
        // Return hanging promise so React does not throw or unmount before reload triggers
        return new Promise(() => {});
      }

      // Reset for subsequent navigations
      window.sessionStorage.setItem('bz_chunk_reload_attempted', 'false');
      throw error;
    }
  });

export default lazyWithRetry;
