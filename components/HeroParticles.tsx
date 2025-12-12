import React, { useEffect, useRef } from 'react';

interface HeroParticlesProps {
  isDark: boolean;
}

export const HeroParticles: React.FC<HeroParticlesProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let hexagons: Hexagon[] = [];

    // Configuration
    const hexRadius = 25; // Size of hexagons
    const hexGap = 2; // Gap between hexagons
    const xStep = (hexRadius * 3) / 2 + hexGap; // Horizontal distance between centers
    const yStep = Math.sqrt(3) * hexRadius + hexGap; // Vertical distance between centers

    // Colors
    const getColors = () => {
      if (isDark) {
        return {
          stroke: 'rgba(255, 255, 255, 0.03)',
          active: 'rgba(217, 22, 54, 0.4)', // Jazen Red
          highlight: 'rgba(224, 184, 133, 0.6)', // Jazen Gold
        };
      } else {
        return {
          stroke: 'rgba(0, 0, 0, 0.03)',
          active: 'rgba(217, 22, 54, 0.4)',
          highlight: 'rgba(31, 36, 46, 0.4)',
        };
      }
    };

    class Hexagon {
      x: number;
      y: number;
      q: number; // axial coordinates (optional, used for grid logic)
      r: number;
      activeLevel: number; // 0 to 1
      targetLevel: number;
      phase: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.activeLevel = 0;
        this.targetLevel = 0;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        // Random ambient pulse
        this.phase += 0.02;
        const ambient = (Math.sin(this.phase) + 1) * 0.5 * 0.1; // Base low pulse

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, (1 - dist / 250)); // 250px radius

        // Decay active level
        this.activeLevel += (this.targetLevel - this.activeLevel) * 0.1;
        
        // Random activation
        if (Math.random() < 0.001) {
             this.targetLevel = 1;
             setTimeout(() => { this.targetLevel = 0; }, 200 + Math.random() * 500);
        }

        // Combine effects
        return Math.min(1, Math.max(0, ambient + this.activeLevel + mouseEffect * 0.8));
      }

      draw(ctx: CanvasRenderingContext2D, colors: any) {
        const intensity = this.update();
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = this.x + hexRadius * Math.cos(angle);
          const py = this.y + hexRadius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // Base Stroke
        ctx.strokeStyle = colors.stroke;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Active Fill/Stroke
        if (intensity > 0.05) {
            ctx.fillStyle = intensity > 0.6 ? colors.active : colors.highlight;
            ctx.globalAlpha = intensity * 0.3; // Transparency for fill
            ctx.fill();
            
            ctx.strokeStyle = intensity > 0.6 ? colors.active : colors.highlight;
            ctx.globalAlpha = intensity * 0.8; // Stronger stroke
            ctx.stroke();
            
            ctx.globalAlpha = 1; // Reset
        }
      }
    }

    const init = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      hexagons = [];
      
      const cols = Math.ceil(width / xStep) + 2;
      const rows = Math.ceil(height / (yStep / 2)) + 2; // Tighter packing

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
           // Offset every other column
           const xOffset = col * xStep;
           const yOffset = row * (yStep / 2); // Tighter vertical packing for correct hex grid
           
           // Correct Hex Grid Logic:
           // Even columns are offset vertically? Or Odd?
           // Standard: 
           // x = r * 3/2 * col
           // y = r * sqrt(3) * (row + 0.5 * (col&1))
           
           const hx = col * (hexRadius * 1.5);
           const hy = row * (hexRadius * Math.sqrt(3)) + (col % 2 === 0 ? 0 : (hexRadius * Math.sqrt(3) / 2));

           hexagons.push(new Hexagon(hx, hy));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      hexagons.forEach(hex => hex.draw(ctx, colors));
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleResize = () => {
        init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
