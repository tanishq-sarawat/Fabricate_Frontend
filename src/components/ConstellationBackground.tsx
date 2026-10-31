import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  isAccent: boolean;
}

interface ConstellationBackgroundProps {
  className?: string;
  particleCount?: number;
  interactiveRadius?: number;
}

export const ConstellationBackground: React.FC<ConstellationBackgroundProps> = ({
  className = '',
  particleCount,
  interactiveRadius = 180,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
      radius: interactiveRadius,
    };

    let particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Determine optimal particle density
      const count = particleCount || Math.floor((width * height) / 16000);
      const clampedCount = Math.min(Math.max(count, 35), 90);

      // Initialize or scale particles
      particles = [];
      for (let i = 0; i < clampedCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1.2,
          alpha: Math.random() * 0.35 + 0.25,
          isAccent: Math.random() < 0.15, // 15% have signature Keychain yellow accent
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (spring feel)
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;

        // Draw soft Keychain yellow spotlight aura around cursor
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.2
        );
        radialGlow.addColorStop(0, 'rgba(245, 203, 57, 0.08)');
        radialGlow.addColorStop(0.5, 'rgba(245, 203, 57, 0.025)');
        radialGlow.addColorStop(1, 'rgba(245, 203, 57, 0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      const connectionDistance = 125;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Mouse interaction: dynamic tether and subtle magnetic attraction
        let nearMouse = false;
        let mouseDist = 9999;
        if (mouse.isHovered) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          mouseDist = Math.sqrt(dx * dx + dy * dy);

          if (mouseDist < mouse.radius) {
            nearMouse = true;
            const factor = (1 - mouseDist / mouse.radius);

            // Subtle interactive pull towards cursor
            p.x += (dx / mouseDist) * factor * 0.6;
            p.y += (dy / mouseDist) * factor * 0.6;

            // Draw line directly to cursor with glowing Keychain yellow
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(245, 203, 57, ${factor * 0.65})`;
            ctx.lineWidth = factor * 1.2;
            ctx.stroke();
          }
        }

        // Draw connections between particle pairs
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const factor = 1 - dist / connectionDistance;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (nearMouse) {
              // Accentuated glowing link when near cursor
              ctx.strokeStyle = `rgba(245, 203, 57, ${factor * 0.4})`;
              ctx.lineWidth = factor * 0.9;
            } else {
              // Subtle elegant constellation link
              ctx.strokeStyle = `rgba(180, 180, 175, ${factor * 0.22})`;
              ctx.lineWidth = factor * 0.6;
            }
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (nearMouse || p.isAccent) {
          ctx.fillStyle = `rgba(245, 203, 57, ${nearMouse ? 0.95 : 0.65})`;
        } else {
          ctx.fillStyle = `rgba(140, 140, 135, ${p.alpha})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, interactiveRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 select-none ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};

export default ConstellationBackground;
