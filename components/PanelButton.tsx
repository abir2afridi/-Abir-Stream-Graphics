import React from 'react';

interface PanelButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  theme?: string;
}

export const PanelButton: React.FC<PanelButtonProps> = ({ icon, label, onClick, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <button 
      onClick={onClick}
      className={`group relative w-full h-20 border transition-all duration-300 overflow-hidden flex items-center px-6 ${
        isDark 
          ? 'bg-[#0a0c10] border-jazen-gray hover:border-jazen-red' 
          : 'bg-white border-gray-200 hover:border-jazen-red shadow-sm hover:shadow-md'
      }`}
    >
      {/* Background Hover Slide */}
      <div className="absolute inset-0 bg-jazen-red/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-12 origin-left" />

      {/* Icon Box */}
      <div className={`relative z-10 w-10 h-10 flex items-center justify-center border transition-colors duration-300 mr-5 ${
        isDark
          ? 'border-jazen-gold/30 bg-jazen-dark group-hover:bg-jazen-red group-hover:border-jazen-red'
          : 'border-gray-300 bg-gray-50 group-hover:bg-jazen-red group-hover:border-jazen-red'
      }`}>
        <div className={`transition-colors ${isDark ? 'text-jazen-gold' : 'text-gray-700'} group-hover:text-white`}>
            {icon}
        </div>
      </div>

      <div className="flex flex-col items-start z-10">
        <span className={`text-3xl font-bold uppercase tracking-tight leading-none transition-colors ${isDark ? 'text-white group-hover:text-jazen-gold' : 'text-gray-900 group-hover:text-jazen-red'}`}>
          {label}
        </span>
        <span className={`text-xs tracking-widest uppercase transition-colors ${isDark ? 'text-jazen-gold/50 group-hover:text-jazen-gold' : 'text-gray-400 group-hover:text-gray-600'}`}>
            Official Link
        </span>
      </div>
      
      {/* Right side decorative accent */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className={`w-1 h-1 mb-1 ${isDark ? 'bg-jazen-gold' : 'bg-jazen-red'}`}></div>
          <div className={`w-1 h-1 mb-1 ${isDark ? 'bg-jazen-gold' : 'bg-jazen-red'}`}></div>
          <div className={`w-1 h-1 ${isDark ? 'bg-jazen-gold' : 'bg-jazen-red'}`}></div>
      </div>
    </button>
  );
};