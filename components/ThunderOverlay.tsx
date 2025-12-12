import React, { useEffect, useState, useCallback } from 'react';

export const ThunderOverlay: React.FC = () => {
  const [strikes, setStrikes] = useState<{ id: number; path: string; branches: string[]; color: string; width: number }[]>([]);
  const [flashOpacity, setFlashOpacity] = useState(0);

  const generatePath = useCallback((type: 'vertical' | 'horizontal') => {
    const segments = 16;
    let d = '';
    
    if (type === 'vertical') {
        const startX = Math.random() * 100;
        let currentX = startX;
        let currentY = 0;
        d = `M ${currentX} ${currentY}`;
        const stepY = 100 / segments;

        for (let i = 0; i < segments; i++) {
            currentY += stepY;
            currentX += (Math.random() - 0.5) * 12; // Moderate jitter
            d += ` L ${currentX} ${currentY}`;
        }
    } else {
        const startY = (Math.random() * 60) + 20; // Keep somewhat centered vertically
        let currentY = startY;
        let currentX = 0;
        d = `M ${currentX} ${currentY}`;
        const stepX = 100 / segments;

        for (let i = 0; i < segments; i++) {
            currentX += stepX;
            currentY += (Math.random() - 0.5) * 12;
            d += ` L ${currentX} ${currentY}`;
        }
    }
    return d;
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isActive = true;

    const triggerLightning = () => {
      if (!isActive) return;

      const id = Date.now();
      const type = Math.random() > 0.6 ? 'vertical' : 'horizontal';
      // Electric colors: White, Cyan, Purple, Bright Blue
      const colors = ['#ffffff', '#ffffff', '#22d3ee', '#a855f7', '#60a5fa'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const mainPath = generatePath(type);
      const branches = [];
      
      // 50% chance of branching
      if (Math.random() > 0.5) {
          branches.push(generatePath(type === 'vertical' ? 'horizontal' : 'vertical'));
      }
      // Occasional chaotic 3rd branch
      if (Math.random() > 0.8) {
          branches.push(generatePath('vertical'));
      }

      const isBigStrike = Math.random() > 0.7;

      setStrikes(prev => [...prev, {
        id,
        path: mainPath,
        branches,
        color,
        width: isBigStrike ? Math.random() * 1.5 + 1 : Math.random() * 0.8 + 0.5
      }]);
      
      // Flash effect for big strikes
      if (isBigStrike) {
          setFlashOpacity(0.15);
          setTimeout(() => setFlashOpacity(0), 150);
      }

      // Cleanup
      setTimeout(() => {
        if (isActive) {
          setStrikes(prev => prev.filter(s => s.id !== id));
        }
      }, 400);

      // Recursive Loop - Faster than before
      const nextDelay = Math.random() * 2000 + 800;
      timeoutId = setTimeout(() => {
          triggerLightning();
          // Burst logic for storms
          if (Math.random() > 0.85) {
              setTimeout(triggerLightning, 150);
              setTimeout(triggerLightning, 300);
          }
      }, nextDelay);
    };

    // Kickoff
    timeoutId = setTimeout(triggerLightning, 1000);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [generatePath]);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden">
       {/* Global Flash Overlay */}
       <div 
         className="absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-100 ease-out"
         style={{ opacity: flashOpacity }}
       ></div>

       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="mix-blend-screen">
         <defs>
           <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="1.5" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
         </defs>
         
         {strikes.map(strike => (
             <g key={strike.id}>
                 {/* Combine main path and branches */}
                 {[strike.path, ...strike.branches].map((d, i) => (
                    <React.Fragment key={i}>
                        {/* Outer Bloom */}
                        <path 
                            d={d} 
                            stroke={strike.color} 
                            strokeWidth={strike.width * 4}
                            strokeOpacity="0.2"
                            fill="none"
                            style={{ 
                                animation: 'flash-strike 0.35s ease-out forwards',
                                vectorEffect: 'non-scaling-stroke',
                                filter: 'blur(2px)'
                            }}
                        />
                        {/* Core Bolt */}
                        <path 
                            d={d} 
                            stroke={strike.color} 
                            strokeWidth={strike.width}
                            fill="none"
                            filter="url(#glow-intense)"
                            style={{ 
                                animation: 'flash-strike 0.35s ease-out forwards',
                                vectorEffect: 'non-scaling-stroke'
                            }}
                        />
                    </React.Fragment>
                 ))}
             </g>
         ))}
       </svg>
       
       <style>{`
         @keyframes flash-strike {
             0% { opacity: 0; }
             10% { opacity: 1; }
             50% { opacity: 1; }
             60% { opacity: 0.5; }
             70% { opacity: 0.8; }
             100% { opacity: 0; }
         }
       `}</style>
    </div>
  );
};
