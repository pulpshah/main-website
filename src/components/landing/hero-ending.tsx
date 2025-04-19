
'use client'

import { ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: any[] = [];
  const mouse = { x: 0, y: 0 };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnParticle(x: number, y: number) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 100,
        radius: Math.random() * 2 + 1,
      });
    }

    function handleMouseMove(e: MouseEvent) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        for (let i = 0; i < 5; i++) {
          spawnParticle(mouse.x + Math.random() * 10 - 5, mouse.y + Math.random() * 10 - 5);
        }
      }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(180, 100, 255, ${p.life / 100})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life / 100})`;

        ctx.fill();
      }
    }

    function animate() {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    // Setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export function Ending () {

    return (
        <div className="absolute bottom-6 flex gap-4">
          <button className="w-full rounded-md px-6 py-3 flex items-center justify-between text-white text-lg font-mono font-medium bg-transparent hover:bg-gray-300/40 transition duration-200 whitespace-nowrap">
            <span className="hover:underline underline-offset-4 decoration-white">Join Waitlist</span>
            <ChevronRight size={24} />
          </button>
    
          <button className="w-full rounded-md px-6 py-3 flex items-center justify-between text-white text-lg font-mono font-medium bg-transparent hover:bg-gray-300/40 transition duration-200 whitespace-nowrap">
            <span className="hover:underline underline-offset-4 decoration-white">About Us</span>
            <ChevronRight size={24} />
          </button>
    
          <button className="w-full rounded-md px-6 py-3 flex items-center justify-between text-white text-lg font-mono font-medium bg-transparent hover:bg-gray-300/40 transition duration-200 whitespace-nowrap">
            <span className="hover:underline underline-offset-4 decoration-white">Social Media</span>
            <ChevronRight size={24} />
          </button>
        </div>
      );
}
