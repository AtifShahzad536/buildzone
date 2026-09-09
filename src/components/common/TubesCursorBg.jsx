import React, { useEffect, useRef } from 'react';

function randomColors(count) {
  return new Array(count)
    .fill(0)
    .map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
}

export const TubesCursorBg = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let clickHandler = null;

    const initTubes = async () => {
      try {
        if (!canvasRef.current) return;

        // Dynamically import the TubesCursor module
        const module = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default || module.TubesCursor || module;

        if (!isMounted || !canvasRef.current) return;

        // bloom: false ensures canvas renderer stays transparent without turning black
        const app = TubesCursor(canvasRef.current, {
          bloom: false,
          tubes: {
            colors: ['#0066FF', '#00D2FF', '#6958d5', '#3B82F6'],
            lights: {
              intensity: 350,
              colors: ['#0066FF', '#00D2FF', '#83f36e', '#60aed5']
            }
          }
        });

        // Ensure clear color has 0 alpha (transparent)
        if (app?.three?.renderer) {
          app.three.renderer.setClearColor(0x000000, 0);
        }

        appRef.current = app;

        clickHandler = (e) => {
          // Prevent interrupting clicks on inputs and buttons
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('form')) return;
          if (app && app.tubes) {
            const colors = randomColors(17);
            const lightsColors = randomColors(18);
            app.tubes.setColors(colors);
            app.tubes.setLightsColors(lightsColors);
          }
        };

        window.addEventListener('click', clickHandler);
      } catch (err) {
        console.warn('TubesCursor initialization error:', err);
      }
    };

    initTubes();

    return () => {
      isMounted = false;
      if (clickHandler) {
        window.removeEventListener('click', clickHandler);
      }
      try {
        if (appRef.current && typeof appRef.current.dispose === 'function') {
          appRef.current.dispose();
        }
      } catch (e) {
        // ignore cleanup error
      }
    };
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{
        touchAction: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default TubesCursorBg;
