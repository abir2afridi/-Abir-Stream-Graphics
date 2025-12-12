import React from 'react';

interface CloudDecorProps {
  className?: string;
  flipped?: boolean;
}

export const CloudDecor: React.FC<CloudDecorProps> = ({ className = "", flipped = false }) => {
  return (
    <svg 
      viewBox="0 0 200 100" 
      className={`w-full h-full fill-none stroke-jazen-gold stroke-2 ${className}`} 
      style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
    >
      <path d="M20,80 Q40,40 70,60 T120,50 T180,70" strokeLinecap="round" />
      <path d="M40,60 Q50,20 90,30 T150,30" strokeLinecap="round" />
      <circle cx="50" cy="70" r="10" />
      <circle cx="90" cy="40" r="12" />
      <circle cx="140" cy="50" r="8" />
      <path d="M10,90 H190" strokeWidth="1" className="opacity-50" />
    </svg>
  );
};

export const DragonIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`fill-none stroke-jazen-gold stroke-[1.5] ${className}`}>
    <path d="M20,80 C20,80 10,40 40,40 C70,40 60,10 90,20 C90,20 80,50 60,60 C40,70 50,90 80,90" />
    <path d="M40,40 C45,35 55,35 60,40" />
    <circle cx="75" cy="25" r="2" className="fill-jazen-gold" />
    <path d="M30,50 Q40,60 30,70" />
    <path d="M25,55 Q35,65 25,75" />
    <path d="M85,25 L95,15 M88,18 L95,22" strokeLinecap="round" />
  </svg>
);
