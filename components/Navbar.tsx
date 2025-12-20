import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Sun, Moon, Activity, Command, Terminal } from 'lucide-react';
import { DecryptionText } from './DecryptionText';

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
            ? (isDark ? 'bg-[#050608]/85 border-jazen-gray/60' : 'bg-white/90 border-gray-200') + ' backdrop-blur-xl py-3 shadow-2xl'
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        {/* Scrolled Texture Overlay */}
        {scrolled && (
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
        )}

        {/* Scroll Progress Bar */}
        <div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-jazen-red via-jazen-gold to-jazen-red transition-all duration-100 ease-out z-50 shadow-[0_0_10px_rgba(217,22,54,0.5)]"
            style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 1 : 0 }}
        />

        {/* Decorative Top Line (only when scrolled) */}
        <div className={`absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-jazen-red/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-4 group">
            <div className={`relative w-10 h-10 flex items-center justify-center border transition-all duration-500 overflow-hidden ${isDark ? 'border-jazen-gray bg-black' : 'border-gray-300 bg-white'} group-hover:border-jazen-red group-hover:shadow-[0_0_20px_rgba(217,22,54,0.4)]`}>
               {/* Scanline Animation */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-jazen-red/80 shadow-[0_0_10px_#d91636] animate-[scan_3s_ease-in-out_infinite] opacity-50"></div>

               {/* Glitchy background on hover */}
               <div className="absolute inset-0 bg-jazen-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               
               {/* Animated SVG Logo */}
               <svg viewBox="0 0 24 24" className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'fill-white' : 'fill-black'} group-hover:fill-jazen-red`}>
                    <path d="M12 2L1 22H23L12 2ZM12 6.5L18.5 19H5.5L12 6.5Z" fillRule="evenodd" />
                    <rect x="11" y="12" width="2" height="6" className={`transition-opacity duration-300 ${isDark ? 'fill-black' : 'fill-white'} group-hover:fill-white`} />
               </svg>

               {/* Corner accents */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-jazen-red opacity-100 transition-opacity"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-jazen-red opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden sm:flex flex-col">
               <span className={`text-xl font-bold tracking-[0.2em] leading-none transition-colors ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-jazen-red`}>ABIR</span>
               <span className="text-[0.6rem] text-jazen-red uppercase tracking-[0.4em] leading-none mt-1 opacity-80 group-hover:opacity-100 transition-opacity">System_V2</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5 backdrop-blur-md">
             {navLinks.map((link) => (
               <a 
                 key={link.name} 
                 href={link.href}
                 className={`relative px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 group flex items-center gap-1 overflow-hidden rounded-full ${
                   activeSection === link.id 
                     ? 'text-white bg-jazen-red/10 shadow-[inset_0_0_10px_rgba(217,22,54,0.2)]' 
                     : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5')
                 }`}
               >
                 {/* Left Bracket */}
                 <span className={`opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-jazen-red font-mono ${activeSection === link.id ? 'opacity-100 translate-x-0' : ''}`}>[</span>
                 
                 {/* Text with Decryption Effect */}
                 <span className={`${activeSection === link.id ? 'text-jazen-red drop-shadow-[0_0_8px_rgba(217,22,54,0.5)]' : ''}`}>
                    <DecryptionText 
                      text={link.name} 
                      animateOnHover={true} 
                      speed={20} 
                      className={activeSection === link.id ? 'cursor-pointer' : 'cursor-pointer'}
                    />
                 </span>
                 
                 {/* Right Bracket */}
                 <span className={`opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-jazen-red font-mono ${activeSection === link.id ? 'opacity-100 translate-x-0' : ''}`}>]</span>
               </a>
             ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-6">
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className={`relative w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-300 hover:border-jazen-red group ${isDark ? 'border-white/10 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'}`}
             >
                <div className="absolute inset-0 bg-jazen-red/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             {/* CTA Button */}
             <a 
               href="#contact"
               className="relative overflow-hidden group px-6 py-2.5 bg-transparent border border-jazen-red text-jazen-red text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-white transition-all duration-300 clip-path-button"
             >
                {/* Fill Effect */}
                <div className="absolute inset-0 bg-jazen-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                
                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-500 ease-in-out delay-100 skew-y-12"></div>
                
                <Terminal size={14} className="relative z-10 transition-transform group-hover:rotate-12" />
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
                    <DecryptionText text={link.name} speed={30} initialDelay={200 + idx * 50} />
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
        @keyframes scan {
            0%, 100% { top: 0%; opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </>
  );
};
