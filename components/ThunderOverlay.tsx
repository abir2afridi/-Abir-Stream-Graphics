import React, { useEffect, useState, useCallback } from 'react';

export const ThunderOverlay: React.FC = () => {
  const [strikes, setStrikes] = useState<{ 
    id: number; 
    path: string; 
    branches: string[]; 
    color: string; 
    width: number;
    nodes: {x: number, y: number}[];
  }[]>([]);
  const [flashOpacity, setFlashOpacity] = useState(0);

  const generatePath = useCallback((type: 'vertical' | 'horizontal') => {
    const segments = 12;
    let d = '';
    const nodes: {x: number, y: number}[] = [];
    
    if (type === 'vertical') {
        const startX = Math.random() * 100;
        let currentX = startX;
        let currentY = 0;
        d = `M ${currentX} ${currentY}`;
        const stepY = 100 / segments;

        for (let i = 0; i < segments; i++) {
            currentY += stepY;
            currentX += (Math.random() - 0.5) * 20; // Aggressive jitter
            d += ` L ${currentX} ${currentY}`;
            if (Math.random() > 0.4) nodes.push({x: currentX, y: currentY});
        }
    } else {
        const startY = (Math.random() * 60) + 20; // Focus on the middle of the text
        let currentY = startY;
        let currentX = 0;
        d = `M ${currentX} ${currentY}`;
        const stepX = 100 / segments;

        for (let i = 0; i < segments; i++) {
            currentX += stepX;
            currentY += (Math.random() - 0.5) * 20; // Aggressive jitter
            d += ` L ${currentX} ${currentY}`;
            if (Math.random() > 0.4) nodes.push({x: currentX, y: currentY});
        }
    }
    return { d, nodes };
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isActive = true;

    const triggerLightning = () => {
      if (!isActive) return;

      const id = Date.now();
      // Bias towards horizontal to cover the wide "ABIR" text
      const type = Math.random() > 0.3 ? 'horizontal' : 'vertical';
      
      // Cyberpunk/Jazen Palette: Pure White, Jazen Red, Jazen Gold, Tech Cyan
      const colors = ['#ffffff', '#ffffff', '#d91636', '#e0b885', '#00fff2'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const mainResult = generatePath(type);
      const branches: string[] = [];
      
      // Add more branches for complexity
      if (Math.random() > 0.3) {
          branches.push(generatePath(type === 'vertical' ? 'horizontal' : 'vertical').d);
      }
      if (Math.random() > 0.7) {
          branches.push(generatePath(type).d);
      }

      const isBigStrike = Math.random() > 0.6;

      setStrikes(prev => [...prev, {
        id,
        path: mainResult.d,
        branches,
        color,
        width: isBigStrike ? Math.random() * 2 + 1.2 : Math.random() * 1 + 0.4,
        nodes: mainResult.nodes
      }]);
      
      // Intense screen flash for major strikes
      if (isBigStrike) {
          setFlashOpacity(0.25);
          setTimeout(() => setFlashOpacity(0), 100);
      }

      // Cleanup
      setTimeout(() => {
        if (isActive) {
          setStrikes(prev => prev.filter(s => s.id !== id));
        }
      }, 350);

      // Loop timing
      const nextDelay = Math.random() * 1400 + 500;
      timeoutId = setTimeout(() => {
          triggerLightning();
          // Storm burst logic (rapid double strikes)
          if (Math.random() > 0.8) {
              setTimeout(triggerLightning, 80);
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
    <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-visible">
       {/* Global Flash Overlay */}
       <div 
         className="absolute inset-0 bg-white/20 mix-blend-overlay transition-opacity duration-100 ease-out"
         style={{ opacity: flashOpacity }}
       ></div>

       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="mix-blend-screen overflow-visible">
         <defs>
           <filter id="thunder-bloom" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="1.5" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
           <filter id="thunder-glow-red">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feFlood floodColor="#d91636" floodOpacity="0.8" result="color"/>
             <feComposite in="color" in2="blur" operator="in" result="glow"/>
             <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>
         </defs>
         
         {strikes.map(strike => (
             <g key={strike.id} filter={strike.color === '#d91636' ? 'url(#thunder-glow-red)' : 'url(#thunder-bloom)'}>
                 {/* Main Bolts & Branches */}
                 {[strike.path, ...strike.branches].map((d, i) => (
                    <React.Fragment key={i}>
                        {/* Wide Outer Aura */}
                        <path 
                            d={d} 
                            stroke={strike.color} 
                            strokeWidth={strike.width * 5}
                            strokeOpacity="0.2"
                            fill="none"
                            style={{ 
                                animation: 'bolt-flash 0.3s ease-out forwards',
                                vectorEffect: 'non-scaling-stroke',
                            }}
                        />
                        {/* Middle Glow */}
                        <path 
                            d={d} 
                            stroke={strike.color} 
                            strokeWidth={strike.width * 2}
                            strokeOpacity="0.6"
                            fill="none"
                            style={{ 
                                animation: 'bolt-flash 0.3s ease-out forwards',
                                vectorEffect: 'non-scaling-stroke',
                            }}
                        />
                        {/* Sharp White Core */}
                        <path 
                            d={d} 
                            stroke="#fff" 
                            strokeWidth={strike.width * 0.5}
                            fill="none"
                            style={{ 
                                animation: 'bolt-flash 0.3s ease-out forwards',
                                vectorEffect: 'non-scaling-stroke'
                            }}
                        />
                    </React.Fragment>
                 ))}

                 {/* Tech Spark Nodes (Circles at joints) */}
                 {strike.nodes.map((node, idx) => (
                    <circle 
                        key={idx}
                        cx={node.x}
                        cy={node.y}
                        r={strike.width * 0.6}
                        fill="#fff"
                        style={{
                            animation: 'node-flash 0.3s ease-out forwards',
                            vectorEffect: 'non-scaling-stroke',
                            boxShadow: '0 0 10px #fff'
                        }}
                    />
                 ))}
             </g>
         ))}
       </svg>
       
       <style>{`
         @keyframes bolt-flash {
             0% { opacity: 0; stroke-dasharray: 0 100; }
             15% { opacity: 1; stroke-dasharray: 100 0; }
             40% { opacity: 1; }
             100% { opacity: 0; }
         }
         @keyframes node-flash {
            0% { opacity: 0; transform: scale(0); }
            20% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0; transform: scale(0); }
         }
       `}</style>
    </div>
  );
};