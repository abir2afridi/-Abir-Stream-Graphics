import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  theme?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-0 relative">
      {/* Background Japanese Text for atmosphere */}
      <span className={`absolute text-[8rem] md:text-[12rem] font-bold select-none pointer-events-none whitespace-nowrap overflow-hidden leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 transition-colors duration-500 ${isDark ? 'text-jazen-red/5' : 'text-jazen-red/5'}`}>
        デザイン
      </span>
      
      <div className="z-10 flex flex-col items-center">
        <h2 className={`text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] transition-colors duration-500 ${isDark ? 'text-jazen-gold' : 'text-gray-900'}`}>
          {title}
        </h2>
        <div className="flex items-center space-x-3 mt-2">
            <div className="h-[2px] w-12 bg-jazen-red"></div>
            <span className="text-jazen-red text-lg md:text-xl font-serif tracking-[0.2em] uppercase font-bold">
            {subtitle}
            </span>
            <div className="h-[2px] w-12 bg-jazen-red"></div>
        </div>
      </div>
    </div>
  );
};