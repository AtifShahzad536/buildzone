import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Fast & Lightweight Page Transition Loader
 * Uses the GSAP Physics2D Kernel Particle simulation:
 * velocity: random(200, 400), angle: random(260, 280), gravity: 300
 * Includes official website logo in the center.
 */
export const PageTransitionBlinds = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const coreRef = useRef(null);
  const isInitialMount = useRef(true);
  const prevPathname = useRef(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // 1. Never fire on initial mount / page refresh / hot reload
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathname.current = location.pathname;
      return;
    }

    // 2. Only fire if the path actually changed
    if (prevPathname.current === location.pathname) {
      return;
    }

    prevPathname.current = location.pathname;
    setIsTransitioning(true);

    const canvas = canvasRef.current;
    let animationFrameId;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      const width = 180;
      const height = 180;
      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const maxParticles = 24;
      const colors = ['#00F0FF', '#0066FF', '#38BDF8', '#FFFFFF', '#67E8F9'];

      class Kernel {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = width / 2 + (Math.random() - 0.5) * 16;
          this.y = height / 2 + 15;
          this.size = Math.random() * 3.5 + 1.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.alpha = 1;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotSpeed = (Math.random() - 0.5) * 0.25;

          // Physics2D parameters:
          // velocity: random(200, 400), angle: random(260, 280), gravity: 300
          const speed = (gsap.utils.random ? gsap.utils.random(180, 360) : (200 + Math.random() * 200)) / 60;
          const angleDeg = gsap.utils.random ? gsap.utils.random(255, 285) : (260 + Math.random() * 20);
          const angleRad = (angleDeg * Math.PI) / 180;

          this.vx = Math.cos(angleRad) * speed;
          this.vy = Math.sin(angleRad) * speed;
          this.gravity = 300 / 3600;
          this.life = 0;
          this.maxLife = 25 + Math.random() * 20;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.gravity;
          this.rotation += this.rotSpeed;
          this.life++;
          this.alpha = Math.max(0, 1 - this.life / this.maxLife);

          if (this.life >= this.maxLife || this.y > height) {
            this.reset();
          }
        }

        draw(context) {
          context.save();
          context.globalAlpha = this.alpha;
          context.translate(this.x, this.y);
          context.rotate(this.rotation);
          context.fillStyle = this.color;
          context.shadowColor = this.color;
          context.shadowBlur = 8;

          context.beginPath();
          context.moveTo(0, -this.size);
          context.lineTo(this.size * 0.8, 0);
          context.lineTo(0, this.size);
          context.lineTo(-this.size * 0.8, 0);
          context.closePath();
          context.fill();

          context.restore();
        }
      }

      for (let i = 0; i < maxParticles; i++) {
        const p = new Kernel();
        p.life = Math.random() * p.maxLife;
        particles.push(p);
      }

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        const grad = ctx.createRadialGradient(width / 2, height / 2, 4, width / 2, height / 2, 50);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
        grad.addColorStop(1, 'rgba(6, 11, 24, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p) => {
          p.update();
          p.draw(ctx);
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    }

    // Fast, Snappy Page Transition (~0.45s)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          setIsTransitioning(false);
        }
      });

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power2.out" })
        .to({}, { duration: 0.35 })
        .to(containerRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
    }, containerRef);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#060B18]/85 backdrop-blur-md flex flex-col items-center justify-center select-none pointer-events-none"
    >
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* GSAP Gravity Particles Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Central Official Website Logo Core */}
        <div
          ref={coreRef}
          className="relative w-14 h-14 rounded-2xl bg-[#0B1528] border border-slate-700/90 shadow-[0_0_25px_rgba(0,240,255,0.5)] flex items-center justify-center z-20 backdrop-blur-xl"
        >
          <img
            src="/logo.png"
            alt="BuildZone Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          />
        </div>

        {/* Orbiting Quantum Neon Rings */}
        <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#00F0FF]/30 animate-[spin_4s_linear_infinite]" />
        <div className="absolute w-34 h-34 rounded-full border border-[#0066FF]/20 animate-[spin_6s_linear_infinite_reverse]" />
      </div>

      <div className="mt-2 text-center space-y-0.5">
        <p className="font-mono text-xs font-bold tracking-widest text-[#00F0FF] uppercase flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
          <span>LOADING ROUTE...</span>
        </p>
      </div>
    </div>
  );
};

export default PageTransitionBlinds;

