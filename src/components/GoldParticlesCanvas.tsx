import { useEffect, useRef } from 'react';
import { computeParticleDensity, type ParticleVariant } from '../utils/motionHelpers';

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  depth: number;
}

interface LightOrb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  depth: number;
}

interface GoldParticlesCanvasProps {
  variant?: ParticleVariant;
  className?: string;
}

export function GoldParticlesCanvas({
  variant = 'hero',
  className = 'pointer-events-none absolute inset-0 h-full w-full',
}: GoldParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let prefersReduced = motionQuery.matches;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    let width = 0;
    let height = 0;
    let rafId = 0;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const { dustCount, orbCount } = computeParticleDensity(width, variant);
    const alphaScale = variant === 'hero' ? 1 : 0.65;

    const particles: DustParticle[] = Array.from({ length: dustCount }, (_, idx) => ({
      x: ((idx * 137.5) % 100) * 0.01 * width,
      y: ((idx * 73.1) % 100) * 0.01 * height,
      radius: 0.8 + (idx % 3) * 0.55,
      vx: (idx % 2 === 0 ? 1 : -1) * (0.07 + (idx % 4) * 0.03),
      vy: -(0.09 + (idx % 5) * 0.035),
      alpha: (0.14 + (idx % 4) * 0.07) * alphaScale,
      phase: idx * 0.7,
      depth: 0.4 + (idx % 3) * 0.45,
    }));

    const orbs: LightOrb[] = Array.from({ length: orbCount }, (_, idx) => ({
      x: ((idx * 29.3 + 11) % 100) * 0.01 * width,
      y: ((idx * 41.7 + 17) % 100) * 0.01 * height,
      radius: variant === 'hero' ? 28 + (idx % 3) * 18 : 22 + (idx % 3) * 14,
      vx: (idx % 2 === 0 ? 1 : -1) * (0.04 + (idx % 3) * 0.02),
      vy: -(0.03 + (idx % 2) * 0.02),
      alpha: (0.045 + (idx % 3) * 0.018) * alphaScale,
      phase: idx * 1.35,
      depth: 0.8 + (idx % 2) * 0.5,
    }));

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer interpolation on desktop
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Soft moving golden light points (bokeh depth layer)
      for (const orb of orbs) {
        if (!prefersReduced) {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.y < -orb.radius) orb.y = height + orb.radius;
          if (orb.x < -orb.radius) orb.x = width + orb.radius;
          if (orb.x > width + orb.radius) orb.x = -orb.radius;
        }

        const px = orb.x + pointer.x * orb.depth * 14;
        const py = orb.y + pointer.y * orb.depth * 10;
        const pulse = prefersReduced
          ? 1
          : 0.7 + 0.3 * Math.sin(time * 0.0008 + orb.phase);
        const currentAlpha = orb.alpha * pulse;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.radius);
        grad.addColorStop(0, `rgba(236, 209, 118, ${(currentAlpha * 1.4).toFixed(3)})`);
        grad.addColorStop(0.45, `rgba(212, 175, 55, ${(currentAlpha * 0.65).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.beginPath();
        ctx.arc(px, py, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Crisp floating gold dust motes
      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const px = p.x + pointer.x * p.depth * 8;
        const py = p.y + pointer.y * p.depth * 6;
        const pulse = prefersReduced
          ? 1
          : 0.7 + 0.3 * Math.sin(time * 0.0014 + p.phase);
        const currentAlpha = p.alpha * pulse;

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 194, 88, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReduced && isVisible && isTabVisible) {
        rafId = window.requestAnimationFrame(drawFrame);
      } else {
        rafId = 0;
      }
    };

    const startOrPause = () => {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
      if (prefersReduced) {
        drawFrame(0);
      } else if (isVisible && isTabVisible) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    startOrPause();

    const handlePointerMove = (e: MouseEvent) => {
      if (!finePointer || prefersReduced) return;
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      startOrPause();
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
      startOrPause();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        startOrPause();
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    if (finePointer) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (finePointer) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      data-testid={`gold-particles-${variant}`}
      aria-hidden="true"
      className={className}
    />
  );
}
