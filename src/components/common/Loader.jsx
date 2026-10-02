import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Cyber GSAP Kernel Physics Loader
 * Inspired by physics2D kernel animation:
 * velocity: random(200, 400), angle: random(260, 280) deg, gravity: 300
 */
export const Loader = ({ text = "INITIALIZING CORE...", fullScreen = false, size = "md" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const width = 160;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    // Kernel particle pool
    const particles = [];
    const maxParticles = 24;
    const colors = ['#00F0FF', '#0066FF', '#38BDF8', '#818CF8', '#FFFFFF'];

    class Kernel {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = width / 2 + (Math.random() - 0.5) * 12;
        this.y = height / 2 + 10;
        this.size = Math.random() * 3 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.2;
        
        // Physics2D parameters:
        // velocity: random(200, 400), angle: random(260, 280) deg, gravity: 300
        const speed = (gsap.utils.random ? gsap.utils.random(180, 360) : (200 + Math.random() * 200)) / 60;
        const angleDeg = gsap.utils.random ? gsap.utils.random(255, 285) : (260 + Math.random() * 20);
        const angleRad = (angleDeg * Math.PI) / 180;

        this.vx = Math.cos(angleRad) * speed;
        this.vy = Math.sin(angleRad) * speed;
        this.gravity = 300 / 3600; // gravity per frame
        this.life = 0;
        this.maxLife = 35 + Math.random() * 25;
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
        
        // Render glowing diamond/kernel shape
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

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const p = new Kernel();
      p.life = Math.random() * p.maxLife; // stagger initial life
      particles.push(p);
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint energy field
      const grad = ctx.createRadialGradient(width / 2, height / 2, 4, width / 2, height / 2, 45);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
      grad.addColorStop(0.7, 'rgba(0, 102, 255, 0.05)');
      grad.addColorStop(1, 'rgba(6, 11, 24, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 45, 0, Math.PI * 2);
      ctx.fill();

      // Update & draw kernels
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP Core Pulse & Scale
    let tween;
    if (coreRef.current) {
      tween = gsap.to(coreRef.current, {
        scale: 1.15,
        boxShadow: '0 0 25px rgba(0, 240, 255, 0.6), 0 0 50px rgba(0, 102, 255, 0.3)',
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (tween) tween.kill();
    };
  }, []);

  const content = (
    <div ref={containerRef} className="flex flex-col items-center justify-center p-6 text-center space-y-3 select-none">
      {/* GSAP Physics Kernel Canvas & Core */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
        
        {/* Pulsing Central Quantum Core */}
        <div
          ref={coreRef}
          className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center z-20 border border-white/40 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          <div className="w-5 h-5 rounded-md bg-[#060B18] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          </div>
        </div>

        {/* Orbiting Neon Ring */}
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-[#00F0FF]/30 animate-[spin_4s_linear_infinite]" />
        <div className="absolute w-28 h-28 rounded-full border border-[#0066FF]/20 animate-[spin_7s_linear_infinite_reverse]" />
      </div>

      {text && (
        <div className="space-y-1">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF] flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span>{text}</span>
          </p>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            SYNCHRONIZING TELEMETRY...
          </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060B18]/90 backdrop-blur-md transition-opacity">
        <div className="bg-[#0B1528] border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-scaleUp">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default Loader;
