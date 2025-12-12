import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Sun, Moon, Activity } from 'lucide-react';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDark = theme === 'dark';

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Header', href: '#header', id: 'header' },
    { name: 'Scenes', href: '#scenes', id: 'scenes' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Tools', href: '#tools', id: 'tools' },
    { name: 'Panels', href: '#panels', id: 'panels' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      setScrolled(window.scrollY > 50);

      // Scroll Progress Calculation
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      
      // Scroll Spy Logic
      let current = 'home';
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to trigger earlier/later as needed
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = link.id;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? (isDark ? 'bg-[#050608]/90 border-jazen-gray/50' : 'bg-white/95 border-gray-200') + ' backdrop-blur-md py-3 shadow-lg'
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        {/* Scrolled Texture Overlay */}
        {scrolled && (
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
        )}

        {/* Scroll Progress Bar */}
        <div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-jazen-red via-jazen-gold to-jazen-red transition-all duration-100 ease-out z-50"
            style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 1 : 0 }}
        />

        {/* Decorative Top Line (only when scrolled) */}
        <div className={`absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-jazen-red/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`relative w-10 h-10 flex items-center justify-center border transition-all duration-500 overflow-hidden ${isDark ? 'border-jazen-gray bg-black' : 'border-gray-300 bg-white'} group-hover:border-jazen-red group-hover:shadow-[0_0_15px_rgba(217,22,54,0.4)]`}>
               {/* Glitchy background on hover */}
               <div className="absolute inset-0 bg-jazen-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               
               {/* Animated SVG Logo */}
               <svg viewBox="0 0 24 24" className={`w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'fill-white' : 'fill-black'} group-hover:fill-jazen-red`}>
                    <path d="M12 2L1 22H23L12 2ZM12 6.5L18.5 19H5.5L12 6.5Z" fillRule="evenodd" />
                    <rect x="11" y="12" width="2" height="6" className={`transition-opacity duration-300 ${isDark ? 'fill-black' : 'fill-white'} group-hover:fill-white`} />
               </svg>

               {/* Corner accents */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-jazen-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-jazen-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden sm:flex flex-col">
               <span className={`text-lg font-bold tracking-widest leading-none transition-colors ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-jazen-red`}>ABIR</span>
               <span className="text-[0.6rem] text-jazen-red uppercase tracking-[0.3em] leading-none mt-1 group-hover:tracking-[0.4em] transition-all">Design_Sys</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
             {navLinks.map((link) => (
               <a 
                 key={link.name} 
                 href={link.href}
                 className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 group flex items-center gap-1 overflow-hidden ${
                   activeSection === link.id 
                     ? 'text-jazen-red' 
                     : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
                 }`}
               >
                 {/* Hover Background */}
                 <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${activeSection === link.id ? 'opacity-[0.03]' : ''}`}></div>

                 {/* Left Bracket */}
                 <span className={`opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-jazen-red font-mono ${activeSection === link.id ? 'opacity-100 translate-x-0' : ''}`}>[</span>
                 
                 <span className={`transition-all duration-300 ${activeSection === link.id ? 'drop-shadow-[0_0_8px_rgba(217,22,54,0.5)]' : 'group-hover:tracking-widest'}`}>{link.name}</span>
                 
                 {/* Right Bracket */}
                 <span className={`opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-jazen-red font-mono ${activeSection === link.id ? 'opacity-100 translate-x-0' : ''}`}>]</span>

                 {/* Active Indicator Dot */}
                 {activeSection === link.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-jazen-red shadow-[0_0_5px_#d91636]"></span>
                 )}
               </a>
             ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-6">
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className={`transition-all duration-300 hover:rotate-12 hover:scale-110 hover:text-jazen-red ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
             >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             {/* CTA Button */}
             <a 
               href="#contact"
               className="relative overflow-hidden group px-6 py-2.5 bg-jazen-red text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-white hover:text-jazen-red transition-all duration-300 clip-path-button shadow-[0_0_15px_rgba(217,22,54,0.3)] hover:shadow-[0_0_25px_rgba(217,22,54,0.6)]"
             >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></div>
                
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                <Zap size={14} className="group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Initialize</span>
             </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`xl:hidden p-2 transition-colors relative z-50 ${isDark ? 'text-white hover:text-jazen-red' : 'text-black hover:text-jazen-red'} ${isOpen ? 'text-white' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
             {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`xl:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col h-full pt-24 px-8 relative overflow-hidden">
              {/* Background Tech Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-jazen-red/10 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-jazen-red/50 to-transparent"></div>
              
              {/* Grid Background for Mobile Menu */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              {/* Decorative vertical line */}
              <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-white/10"></div>

              <div className="flex flex-col gap-6 pl-8 overflow-y-auto max-h-[70vh] relative z-10">
                {navLinks.map((link, idx) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 hover:to-jazen-red transition-all duration-300 transform translate-x-0 hover:translate-x-4 flex items-center group py-2"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <span className={`w-0 h-[2px] bg-jazen-red mr-0 group-hover:w-8 group-hover:mr-4 transition-all duration-300 ${activeSection === link.id ? 'w-8 mr-4' : ''}`}></span>
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto mb-12 pl-8 border-t border-white/10 pt-8 flex items-center justify-between relative z-10">
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">System Status</span>
                    <div className="flex items-center gap-2 text-jazen-red">
                       <Activity size={16} className="animate-pulse" />
                       <span className="font-mono text-sm tracking-wider">ONLINE // STABLE</span>
                    </div>
                 </div>
                 <button onClick={() => { toggleTheme(); setIsOpen(false); }} className="p-4 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-jazen-red transition-all group">
                    {isDark ? <Sun size={24} className="group-hover:rotate-90 transition-transform duration-500" /> : <Moon size={24} className="group-hover:-rotate-12 transition-transform duration-500" />}
                 </button>
              </div>
           </div>
        </div>
      </nav>
      
      <style>{`
        .clip-path-button {
           clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
      `}</style>
    </>
  );
};