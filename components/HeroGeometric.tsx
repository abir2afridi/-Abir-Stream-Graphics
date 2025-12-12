import React from 'react';

interface HeroGeometricProps {
  isDark: boolean;
}

export const HeroGeometric: React.FC<HeroGeometricProps> = ({ isDark }) => {
  const strokeColor = isDark ? '#d91636' : '#d91636'; // Jazen Red
  const ringColor = isDark ? '#e0b885' : '#1f242e'; // Gold or Dark Gray
  
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-30 z-0">
       {/* Ring 1 - Outer Dashed - Slow Rotate */}
       <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
          <svg viewBox="0 0 900 900" className="w-full h-full">
            <circle cx="450" cy="450" r="440" fill="none" stroke={ringColor} strokeWidth="1" strokeDasharray="20 40" opacity="0.2" />
          </svg>
       </div>

       {/* Ring 2 - Inner Solid - Reverse Rotate */}
       <div className="absolute inset-[100px] animate-[spin_40s_linear_infinite_reverse]">
          <svg viewBox="0 0 700 700" className="w-full h-full">
            <circle cx="350" cy="350" r="348" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />
            {/* Ticks */}
            {[...Array(12)].map((_, i) => (
                <rect key={i} x="348" y="0" width="4" height="20" fill={strokeColor} transform={`rotate(${i * 30} 350 350)`} />
            ))}
          </svg>
       </div>

       {/* Ring 3 - Tech Bits - Fast Rotate */}
       <div className="absolute inset-[250px] animate-[spin_20s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full">
             <path d="M200,20 A180,180 0 0,1 380,200" fill="none" stroke={ringColor} strokeWidth="2" strokeDasharray="10 10" />
             <path d="M200,380 A180,180 0 0,1 20,200" fill="none" stroke={ringColor} strokeWidth="2" strokeDasharray="10 10" />
          </svg>
       </div>
       
       {/* Center Crosshair */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-50">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`}></div>
       </div>
    </div>
  );
};
