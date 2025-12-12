import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Instagram, 
  Twitter, 
  DollarSign, 
  Crown, 
  Cpu, 
  MessageSquare, 
  Gamepad2, 
  Sparkles,
  Zap,
  Radio,
  Wifi,
  Monitor,
  Send,
  X,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Quote,
  Mouse,
  ChevronDown,
  Terminal
} from 'lucide-react';
import { CloudDecor, DragonIcon } from './components/CloudDecor';
import { SectionHeader } from './components/SectionHeader';
import { PanelButton } from './components/PanelButton';
import { Navbar } from './components/Navbar';
import { RevealOnScroll } from './components/RevealOnScroll';
import { Typewriter } from './components/Typewriter';
import { generateStreamIdeas } from './services/geminiService';
import { HeroParticles } from './components/HeroParticles';
import { HeroGeometric } from './components/HeroGeometric';
import { ThunderOverlay } from './components/ThunderOverlay';
import { DecryptionText } from './components/DecryptionText';
import { StreamIdea, Project } from './types';

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Neon Ronin',
    category: 'Esports Branding',
    description: 'A complete identity overhaul for a top-tier Valorant organization.',
    fullDescription: 'The Neon Ronin project required a balance between traditional Japanese aesthetics and modern cyberpunk grit. We developed a comprehensive visual language including logo motion, stream overlays, and social media templates. The goal was to intimidate opponents while providing a clean viewing experience for fans.',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511882150382-421056ac8d97?q=80&w=2070&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2070&auto=format&fit=crop'
    ],
    client: 'Team Ronin',
    year: '2024',
    tags: ['Branding', 'Motion Graphics', 'UI/UX'],
    challenge: 'The client needed a visual identity that felt "dangerous yet disciplined," merging the chaotic energy of cyberpunk glitch art with the structured elegance of feudal Japanese heraldry.',
    solution: 'We created a custom typography system based on katana strokes and paired it with a dynamic "digital corruption" animation style. The result is a brand that looks stable at rest but aggressive in motion.',
    testimonial: {
      text: "The new branding completely revitalized our viewership. The energy is palpable, and the merchandise sales have tripled since launch.",
      author: "Alex K.",
      role: "CEO, Team Ronin"
    }
  },
  {
    id: '2',
    title: 'Velocity X',
    category: 'Racing Overlay',
    description: 'High-speed telemetry data integration for sim-racers.',
    fullDescription: 'Velocity X pushes the boundaries of real-time data visualization. Designed for competitive sim-racing, this overlay suite integrates directly with game telemetry to display tire heat, lap deltas, and fuel usage in a sleek, non-intrusive HUD inspired by fighter jet interfaces.',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop'
    ],
    client: 'Apex Predators',
    year: '2023',
    tags: ['Data Viz', 'Sim Racing', 'Overlay'],
    challenge: 'Sim-racers need critical data in milliseconds without taking their eyes off the track. Standard overlays were too cluttered and distracted from the racing line.',
    solution: 'We developed a modular "Glass Cockpit" HUD using semi-transparent vector graphics. Critical alerts use color-coded pulsing animations that register in peripheral vision, allowing the driver to stay focused.',
    testimonial: {
      text: "It feels like I'm actually in the cockpit of a fighter jet. The lag is non-existent, and the data is always exactly where I need it.",
      author: "Sarah J.",
      role: "Pro Sim Racer"
    }
  },
  {
    id: '3',
    title: 'Void Walker',
    category: 'RPG Package',
    description: 'Immersive atmospheric overlays for dark fantasy streamers.',
    fullDescription: 'For the Void Walker package, we stepped away from clean vectors and embraced texture and atmosphere. Using dynamic lighting effects and particle systems, this package reacts to in-game events, dimming during stealth sequences and flaring up during combat.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2068&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1637822766324-4a648b29c054?q=80&w=2066&auto=format&fit=crop'
    ],
    client: 'Private Commission',
    year: '2024',
    tags: ['Illustration', 'Animation', 'Fantasy'],
    challenge: 'The streamer wanted an overlay that felt "alive" and part of the game world, rather than a static frame sitting on top of the footage.',
    solution: 'We implemented a "smoke-and-shadow" particle system using WebM video transparency. The borders of the cam box appear to be made of shifting ethereal smoke that reacts to audio levels.',
    testimonial: {
        text: "My chat went wild when they saw the health bar pulse in sync with my character's heartbeat. Truly next-level immersion.",
        author: "Eldric",
        role: "RPG Streamer"
    }
  }
];

const SKILLS = [
  { name: "Branding Identity", level: 98 },
  { name: "Motion Graphics", level: 92 },
  { name: "UI/UX Design", level: 85 },
  { name: "3D Composition", level: 78 }
];

const SkillBar: React.FC<{ name: string; level: number; isDark: boolean }> = ({ name, level, isDark }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-end mb-2">
        <span className={`font-bold uppercase tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </span>
        <span className="text-jazen-red font-mono text-xs font-bold">
          {width > 0 ? width : 0}%
        </span>
      </div>
      <div className={`h-2 w-full relative overflow-hidden ${isDark ? 'bg-jazen-gray' : 'bg-gray-200'}`}>
        <div className={`absolute inset-0 opacity-20 bg-[length:10px_100%] ${isDark ? 'bg-[linear-gradient(90deg,transparent_90%,#000_90%)]' : 'bg-[linear-gradient(90deg,transparent_90%,#fff_90%)]'}`}></div>
        <div 
          className="h-full bg-jazen-red relative transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void; isDark: boolean }> = ({ project, onClose, isDark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') changeImage('prev');
        if (e.key === 'ArrowRight') changeImage('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentImageIndex, project.images.length]);

  const changeImage = useCallback((direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      
      // Wait for fade out
      setTimeout(() => {
          setCurrentImageIndex((prev) => {
              if (direction === 'next') return (prev + 1) % project.images.length;
              return (prev - 1 + project.images.length) % project.images.length;
          });
          // Allow fade in
          setTimeout(() => setIsAnimating(false), 50);
      }, 300);
  }, [project.images.length, isAnimating]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-7xl h-[90vh] flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-300 border overflow-hidden ${isDark ? 'bg-[#0a0c10] border-jazen-red/30' : 'bg-white border-gray-200'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-jazen-red text-white hover:bg-white hover:text-jazen-red transition-colors z-50 rounded-sm"
        >
          <X size={24} />
        </button>

        {/* Image Section (Carousel) */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-full relative bg-black group select-none">
          <img 
            src={project.images[currentImageIndex]} 
            alt={project.title} 
            className={`w-full h-full object-cover transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80 md:via-transparent pointer-events-none"></div>
          
          {/* Navigation Controls */}
          {project.images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); changeImage('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-jazen-red transition-all rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300 border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); changeImage('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-jazen-red transition-all rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300 border border-white/10"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {project.images.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        if (idx !== currentImageIndex) {
                            setIsAnimating(true);
                            setTimeout(() => {
                                setCurrentImageIndex(idx);
                                setTimeout(() => setIsAnimating(false), 50);
                            }, 300);
                        }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-jazen-red' : 'w-2 bg-white/50 hover:bg-white'}`} 
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            <div>
              <div className="flex items-center space-x-2 text-jazen-red text-xs font-mono tracking-widest uppercase mb-4">
                <span>Case File: {project.id.padStart(3, '0')}</span>
                <span className="w-4 h-[1px] bg-jazen-red"></span>
                <span>{project.category}</span>
              </div>
              
              <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h2>

              <p className={`font-serif text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.fullDescription}
              </p>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 gap-8 mb-8">
                 <div className={`p-6 border-l-2 relative overflow-hidden group/card ${isDark ? 'border-jazen-gray bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/card:opacity-20 transition-opacity">
                        <Zap size={48} />
                    </div>
                    <h4 className="text-jazen-red uppercase tracking-widest text-xs font-bold mb-3 flex items-center gap-2 relative z-10">
                       <Zap size={14} /> The Challenge
                    </h4>
                    <p className={`text-sm leading-relaxed relative z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                       {project.challenge}
                    </p>
                 </div>
                 
                 <div className={`p-6 border-l-2 relative overflow-hidden group/card ${isDark ? 'border-jazen-gray bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/card:opacity-20 transition-opacity">
                        <Sparkles size={48} />
                    </div>
                    <h4 className="text-jazen-red uppercase tracking-widest text-xs font-bold mb-3 flex items-center gap-2 relative z-10">
                       <Sparkles size={14} /> The Solution
                    </h4>
                    <p className={`text-sm leading-relaxed relative z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                       {project.solution}
                    </p>
                 </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${isDark ? 'border-jazen-gray text-jazen-gold/70 hover:border-jazen-gold hover:text-jazen-gold' : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="relative mt-8 mb-4 group/quote">
                   <Quote className={`absolute -top-4 -left-2 opacity-20 transform -scale-x-100 transition-colors ${isDark ? 'text-jazen-red' : 'text-gray-400'}`} size={40} />
                   <div className={`relative z-10 p-6 border italic transition-colors ${isDark ? 'border-jazen-red/20 bg-jazen-red/5 text-gray-300 group-hover/quote:border-jazen-red/40' : 'border-jazen-red/10 bg-jazen-red/5 text-gray-700'}`}>
                      <p className="mb-4 text-sm md:text-base leading-relaxed">"{project.testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-[1px] ${isDark ? 'bg-jazen-gold' : 'bg-jazen-red'}`}></div>
                         <div className="flex flex-col">
                            <span className={`font-bold not-italic text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.testimonial.author}</span>
                            <span className={`text-[10px] uppercase tracking-wider opacity-70 not-italic ${isDark ? 'text-jazen-gold' : 'text-gray-500'}`}>{project.testimonial.role}</span>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className={`p-8 border-t flex items-center justify-between shrink-0 ${isDark ? 'border-jazen-gray bg-[#0a0c10]' : 'border-gray-200 bg-white'}`}>
            <div className="flex gap-8">
              <div>
                <span className={`block text-[10px] uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Client</span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.client}</span>
              </div>
               <div>
                <span className={`block text-[10px] uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Year</span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.year}</span>
              </div>
            </div>
             <button className={`flex items-center space-x-2 text-sm font-bold uppercase tracking-widest transition-colors group ${isDark ? 'text-jazen-red hover:text-white' : 'text-jazen-red hover:text-gray-900'}`}>
               <span>Live View</span>
               <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeIdea, setActiveIdea] = useState<StreamIdea | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [customVibe, setCustomVibe] = useState("Cyberpunk Dragon");
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Ref for the Title Element to allow precise spotlight tracking
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const ideas = await generateStreamIdeas(customVibe);
      if (ideas && ideas.length > 0) {
        setActiveIdea(ideas[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized for 3D rotation (based on container center)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    setMousePos({ x: normX, y: normY });
    
    // Calculate spotlight position relative to the title element
    if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleX = e.clientX - titleRect.left;
        const titleY = e.clientY - titleRect.top;
        
        // Update CSS variables specifically on the title element
        titleRef.current.style.setProperty('--mouse-x', `${titleX}px`);
        titleRef.current.style.setProperty('--mouse-y', `${titleY}px`);
    }
  };
  
  const handleHeroLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-jazen-red selection:text-white overflow-x-hidden relative transition-colors duration-500 ${isDark ? 'bg-jazen-dark text-jazen-gold' : 'bg-gray-100 text-gray-800'}`}>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          isDark={isDark} 
        />
      )}

      {/* --- GLOBAL TEXTURE --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* --- HERO SECTION --- */}
      <header 
        id="home" 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroLeave}
        className={`relative w-full h-[100vh] flex flex-col items-center justify-center border-b overflow-hidden pt-16 transition-colors duration-500 group/hero ${isDark ? 'border-jazen-gray' : 'border-gray-200 bg-white'}`}
      >
        
        {/* Animated Particle Field */}
        <HeroParticles isDark={isDark} />
        
        {/* Complex Geometric Ring */}
        <HeroGeometric isDark={isDark} />

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none animate-grid-flow"></div>
        
        {/* HUD Elements - Left */}
        <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 opacity-50 z-20 pointer-events-none select-none">
            <div className={`w-[1px] h-32 ${isDark ? 'bg-gradient-to-b from-transparent via-jazen-gold to-transparent' : 'bg-gray-400'}`}></div>
            <span className={`vertical-text text-xs font-mono tracking-widest ${isDark ? 'text-jazen-gold' : 'text-gray-500'}`}>EST. 2025 // SYSTEM V.1.0</span>
            <div className={`w-[1px] h-32 ${isDark ? 'bg-gradient-to-b from-transparent via-jazen-gold to-transparent' : 'bg-gray-400'}`}></div>
        </div>
        
        {/* HUD Elements - Right */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 opacity-50 z-20 pointer-events-none select-none">
             <div className="flex flex-col gap-2">
                 {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-1 h-1 rounded-full ${isDark ? 'bg-jazen-red' : 'bg-jazen-red'}`} style={{ opacity: (5-i) * 0.2 }}></div>
                 ))}
             </div>
             <span className={`vertical-text text-xs font-mono tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>SCROLL TARGET</span>
        </div>

        {/* Main Content Container with 3D Tilt */}
        <div 
            className="z-20 text-center relative flex flex-col items-center transition-transform duration-100 ease-out will-change-transform"
            style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`
            }}
        >
          {/* Top Line Accent */}
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-jazen-red to-jazen-red mb-6 opacity-80"></div>
          
          {/* Main Title Group */}
          <div className="relative cursor-default select-none">
            
            {/* Thunder Effect Overlay */}
            <ThunderOverlay />

            {/* Spotlight Text Effect */}
            <h1 
                ref={titleRef}
                className={`text-[12rem] md:text-[18rem] leading-[0.75] font-bold tracking-tighter text-transparent bg-clip-text relative z-30 transition-opacity duration-300 ${isDark ? 'opacity-90' : 'opacity-100'}`}
                style={{
                  backgroundImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isDark ? '#ffffff' : '#000000'} 0%, ${isDark ? '#333333' : '#444444'} 30%, ${isDark ? '#1a1a1a' : '#777777'} 100%)`,
                  WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.1)' : '1px rgba(0,0,0,0.1)'
                }}
            >
              ABIR
            </h1>

            {/* Rear Glow Layer */}
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] leading-[0.75] font-bold tracking-tighter text-jazen-red blur-[120px] opacity-20 pointer-events-none z-0">
              ABIR
            </h1>

            {/* Glitch Layer 1 */}
            <h1 className="absolute inset-0 text-[12rem] md:text-[18rem] leading-[0.75] font-bold tracking-tighter text-jazen-red mix-blend-screen opacity-0 group-hover/hero:opacity-20 animate-glitch-1 pointer-events-none z-10">
              ABIR
            </h1>

            {/* Glitch Layer 2 */}
            <h1 className="absolute inset-0 text-[12rem] md:text-[18rem] leading-[0.75] font-bold tracking-tighter text-cyan-400 mix-blend-screen opacity-0 group-hover/hero:opacity-20 animate-glitch-2 pointer-events-none z-10">
              ABIR
            </h1>
          </div>
          
          {/* Subtitle / Description */}
          <div className="mt-8 flex items-center justify-center space-x-6 relative z-20">
             <div className="flex items-center opacity-70">
                <div className="w-1 h-1 bg-jazen-red rotate-45"></div>
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-jazen-red to-transparent"></div>
             </div>
             
             <div className={`px-6 py-2 border-l border-r backdrop-blur-sm transition-colors relative group/subtitle overflow-hidden ${isDark ? 'border-jazen-red/50 bg-jazen-red/5' : 'border-gray-400 bg-white/50'}`}>
                 <div className={`absolute inset-0 bg-jazen-red/10 translate-x-[-100%] group-hover/subtitle:translate-x-0 transition-transform duration-500 ease-out`}></div>
                 <div className={`text-xl md:text-2xl uppercase tracking-[0.5em] font-serif font-medium whitespace-nowrap relative z-10 ${isDark ? 'text-jazen-gold' : 'text-gray-700'}`}>
                   <DecryptionText text="Stream Graphics" speed={40} initialDelay={1000} />
                 </div>
             </div>

             <div className="flex items-center opacity-70">
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-jazen-red to-transparent"></div>
                <div className="w-1 h-1 bg-jazen-red rotate-45"></div>
             </div>
          </div>
          
          {/* Primary CTA Button */}
          <div className="mt-12 relative z-30">
            <a 
              href="#projects" 
              className={`group/btn relative px-8 py-4 border flex items-center gap-3 overflow-hidden transition-all duration-300 ${isDark ? 'border-jazen-gold/30 text-white hover:border-jazen-red' : 'border-gray-800 text-gray-900 hover:border-jazen-red'}`}
            >
               <div className="absolute inset-0 bg-jazen-red translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
               <Terminal size={16} className="relative z-10 group-hover/btn:text-white transition-colors" />
               <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors">Initialize System</span>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity delay-100"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity delay-100"></div>
            </a>
          </div>

          {/* Technical Metadata Badge */}
          <div className="mt-12 flex flex-col items-center space-y-3 opacity-40 hover:opacity-100 transition-opacity">
            <div className={`flex items-center space-x-3 text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-jazen-gold/50' : 'text-gray-500'}`}>
                <span>SYS.ID.992</span>
                <span className="text-jazen-red">///</span>
                <span>EST.2025</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 opacity-70 hover:opacity-100 transition-opacity pointer-events-none">
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${isDark ? 'border-jazen-gold/50' : 'border-gray-400'}`}>
                <div className={`w-1 h-2 rounded-full animate-[bounce_2s_infinite] ${isDark ? 'bg-jazen-red' : 'bg-jazen-red'}`}></div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-jazen-gold/50' : 'text-gray-400'}`}>Scroll</span>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className={`absolute bottom-0 left-0 w-full h-14 border-t flex justify-between items-center px-8 backdrop-blur-sm z-30 transition-colors duration-500 ${isDark ? 'border-jazen-gray bg-jazen-dark/90' : 'border-gray-200 bg-white/90'}`}>
           <div className={`flex items-center space-x-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase ${isDark ? 'text-jazen-gold/40' : 'text-gray-400'}`}>
              <span className="hidden md:inline">Project: Identity Refinement</span>
              <span className="flex items-center gap-2"><span className={`w-1 h-1 rounded-full ${isDark ? 'bg-jazen-gold' : 'bg-gray-800'}`}></span>Client: Personal</span>
           </div>
           <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                 <div className="w-1 h-3 bg-jazen-red animate-pulse"></div>
                 <div className="w-1 h-3 bg-jazen-red/50"></div>
                 <div className="w-1 h-3 bg-jazen-red/20"></div>
              </div>
              <span className="text-jazen-red text-[10px] font-bold tracking-widest uppercase">Online</span>
           </div>
        </div>
      </header>

      {/* --- CAPA / HEADER PREVIEW --- */}
      <section id="header" className="container mx-auto px-4 relative pt-12 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="HEADER" subtitle="TWITCH BANNER" theme={theme} />
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className={`w-full max-w-6xl mx-auto aspect-[5/1.5] relative border shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group ${isDark ? 'border-jazen-gray' : 'border-gray-300'}`}>
            {/* Header Background */}
            <div className="absolute inset-0 bg-[#0f0f12]">
              {/* Abstract Shapes */}
              <div className="absolute right-0 top-0 h-full w-2/3 bg-jazen-red clip-path-slant opacity-90"></div>
              <div className="absolute right-20 top-0 h-full w-1/2 bg-[#050608] clip-path-slant"></div>
              
              {/* Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>
            
            {/* Left Side Content */}
            <div className="absolute left-12 bottom-12 z-10">
              <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-jazen-gold text-jazen-dark px-2 py-1 text-xl font-bold uppercase tracking-widest">Live</div>
                  <div className="text-jazen-gold/80 font-serif italic">Every day at 8PM</div>
              </div>
              <h3 className="text-8xl font-bold text-white tracking-tighter uppercase leading-none drop-shadow-md">
                ABIR HASAN <span className="text-jazen-red">SIAM</span>
              </h3>
            </div>

            {/* Right Side Socials */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end space-y-4 z-20">
              {['twitter', 'instagram', 'youtube'].map((social) => (
                <div key={social} className="flex items-center space-x-3 text-white/80">
                  <span className="text-xl uppercase tracking-widest font-bold">{social}</span>
                  <div className="w-8 h-8 bg-jazen-red flex items-center justify-center">
                      <span className="text-xs">/</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Japanese Text Decor */}
            <div className="absolute right-4 top-4 vertical-text text-jazen-gold/20 text-6xl font-bold pointer-events-none">
              クリエイティブ
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* --- CENAS / SCENES --- */}
      <section id="scenes" className="container mx-auto px-4 pt-12 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="SCENES" subtitle="OVERLAYS" theme={theme} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              
              {/* Scene 1: Starting Soon (Large) */}
              <div className={`col-span-1 md:col-span-2 aspect-[21/9] bg-[#0a0c10] border relative overflow-hidden flex shadow-2xl ${isDark ? 'border-jazen-gray' : 'border-gray-300'}`}>
                {/* Left Bar */}
                <div className="w-24 h-full bg-jazen-red flex flex-col items-center py-8 justify-between border-r border-jazen-dark z-10">
                    <DragonIcon className="w-12 h-12 text-white" />
                    <div className="vertical-text text-jazen-dark font-bold text-2xl tracking-widest">STARTING SOON</div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                    <div className="text-center z-10">
                        <h3 className="text-9xl font-bold text-white uppercase tracking-tighter leading-none mb-4">
                          STREAM <span className="text-jazen-red">STARTING</span>
                        </h3>
                        <div className="inline-flex items-center border border-jazen-gold/30 bg-jazen-dark/50 px-6 py-2 backdrop-blur-md">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                            <span className="text-jazen-gold font-bold tracking-[0.3em]">SYSTEM INITIALIZATION...</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Scene 2: BRB */}
              <div className={`aspect-video bg-[#0a0c10] border relative overflow-hidden flex flex-col items-center justify-center group ${isDark ? 'border-jazen-gray' : 'border-gray-300'}`}>
                <div className="absolute inset-0 border-[20px] border-jazen-dark z-10 pointer-events-none"></div>
                <div className="absolute top-8 w-full flex justify-center space-x-2">
                    <div className="w-16 h-1 bg-jazen-red"></div>
                    <div className="w-16 h-1 bg-jazen-gold/50"></div>
                    <div className="w-16 h-1 bg-jazen-red"></div>
                </div>
                
                <h3 className="text-7xl font-bold text-white uppercase tracking-tight z-20">
                    {activeIdea ? activeIdea.title.split(':')[0] : "BE RIGHT BACK"}
                </h3>
                <p className="text-jazen-red font-serif italic text-xl mt-2 z-20">
                    {activeIdea ? activeIdea.brbMessage : "Do not go anywhere"}
                </p>
                
                {/* Animated Background Element */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-jazen-red/10 to-transparent"></div>
              </div>

              {/* Scene 3: Offline */}
              <div className="aspect-video bg-jazen-red relative overflow-hidden flex flex-col items-center justify-center text-jazen-dark">
                <div className="absolute inset-0 bg-[#050608] opacity-90 mix-blend-multiply"></div>
                <DragonIcon className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 rotate-12" />
                
                <div className="z-10 text-center border-4 border-jazen-gold p-8">
                  <h3 className="text-8xl font-bold text-white uppercase tracking-tighter leading-none">
                      OFFLINE
                  </h3>
                  <div className="mt-4 flex justify-center space-x-8 text-jazen-gold font-bold text-xl tracking-widest">
                    <span>THANKS FOR WATCHING</span>
                  </div>
                </div>
              </div>

              {/* Scene 4: Intermission */}
              <div className={`aspect-video border relative overflow-hidden flex items-center justify-center ${isDark ? 'bg-[#0a0c10] border-jazen-gray' : 'bg-white border-gray-300'}`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-jazen-red opacity-50"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-jazen-red opacity-50"></div>
                  
                  <div className="text-center z-10 relative">
                     <div className={`absolute -inset-8 bg-jazen-red/5 blur-xl rounded-full ${isDark ? '' : 'opacity-0'}`}></div>
                     <h3 className={`text-6xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        INTERMISSION
                     </h3>
                     <div className="flex items-center justify-center space-x-3 text-jazen-red font-mono text-sm tracking-widest">
                        <span>///</span>
                        <span>CHATTING</span>
                        <span>///</span>
                     </div>
                  </div>
              </div>

              {/* Scene 5: Stream Ending */}
              <div className={`aspect-video border relative overflow-hidden flex flex-col items-center justify-center ${isDark ? 'bg-[#050608] border-jazen-gray' : 'bg-gray-100 border-gray-300'}`}>
                   {/* Scanlines Effect Overlay */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50"></div>
                   
                   <div className="z-10 text-center space-y-4">
                      <h3 className={`text-5xl md:text-6xl font-bold uppercase tracking-tight ${isDark ? 'text-jazen-gold' : 'text-gray-800'}`}>
                         STREAM ENDING
                      </h3>
                      <div className="w-24 h-[1px] bg-jazen-red mx-auto"></div>
                      <p className={`text-sm tracking-[0.3em] font-serif italic ${isDark ? 'text-jazen-gold/50' : 'text-gray-500'}`}>
                          See you in the next broadcast
                      </p>
                   </div>
              </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="container mx-auto px-4 pt-24 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="PROJECTS" subtitle="SELECTED WORKS" theme={theme} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PROJECTS_DATA.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer relative aspect-video overflow-hidden border transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,22,54,0.15)] ${isDark ? 'border-jazen-gray bg-[#0a0c10]' : 'border-gray-300 bg-white'}`}
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                   <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 filter grayscale-[0.5] group-hover:grayscale-0" 
                   />
                   <div className="absolute inset-0 bg-jazen-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="px-8 py-3 border border-jazen-red/50 bg-black/50 backdrop-blur-sm text-white font-bold uppercase tracking-[0.2em] transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-jazen-red hover:border-jazen-red">View Case</span>
                   </div>
                </div>

                {/* Info Bar */}
                <div className={`absolute bottom-0 left-0 w-full p-4 border-t backdrop-blur-md transition-colors ${isDark ? 'bg-black/80 border-jazen-gray' : 'bg-white/90 border-gray-200'}`}>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className={`text-xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                      <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-jazen-red' : 'text-jazen-red'}`}>{project.category}</p>
                    </div>
                    <ArrowRight className={`transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ${isDark ? 'text-jazen-gold' : 'text-gray-500'}`} size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="container mx-auto px-4 pt-24 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="ABOUT" subtitle="THE ARTIST" theme={theme} />
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
              {/* Image Container */}
              <div className="w-full md:w-1/3 relative group">
                  <div className="absolute inset-0 bg-jazen-red/20 translate-x-4 translate-y-4 border border-jazen-red/50 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <div className={`relative aspect-[3/4] overflow-hidden border grayscale group-hover:grayscale-0 transition-all duration-500 ${isDark ? 'bg-jazen-gray border-jazen-gray' : 'bg-gray-200 border-gray-300'}`}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" alt="Abir Hasan Siam" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jazen-dark via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4">
                          <p className="text-white text-2xl font-bold uppercase tracking-widest">ABIR HASAN</p>
                          <p className="text-jazen-red text-sm font-mono tracking-wider">LEAD DESIGNER</p>
                      </div>
                  </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-2/3 space-y-12">
                  <div>
                      <h3 className={`text-4xl font-bold uppercase tracking-wide mb-6 flex items-center gap-4 ${isDark ? 'text-jazen-contrast' : 'text-gray-900'}`}>
                          <span className="w-12 h-[2px] bg-jazen-red"></span>
                          Biography
                      </h3>
                      <p className={`text-xl md:text-2xl leading-loose font-serif ${isDark ? 'text-jazen-gold/90' : 'text-gray-800'}`}>
                          Abir Hasan Siam is a visionary graphic designer specializing in high-impact stream branding. With over 5 years of experience in the esports industry, he crafts visual identities that define champions. His work bridges the gap between raw gaming energy and sophisticated broadcast design.
                      </p>
                  </div>
                  
                  <div>
                      <h3 className={`text-4xl font-bold uppercase tracking-wide mb-6 flex items-center gap-4 ${isDark ? 'text-jazen-contrast' : 'text-gray-900'}`}>
                          <span className="w-12 h-[2px] bg-jazen-red"></span>
                          Philosophy
                      </h3>
                      <div className={`relative pl-8 border-l-4 ${isDark ? 'border-jazen-gray' : 'border-gray-300'}`}>
                          <p className={`text-xl md:text-2xl leading-relaxed italic ${isDark ? 'text-jazen-gold/70' : 'text-gray-600'}`}>
                              "Design is not just about aesthetics; it's about creating an immersive atmosphere that resonates with the audience. Every pixel serves a purpose in the greater narrative of the broadcast."
                          </p>
                      </div>
                  </div>

                  {/* Skills Section with Dynamic Bars */}
                  <div className={`pt-8 border-t ${isDark ? 'border-jazen-gray/30' : 'border-gray-200'}`}>
                      <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Technical Proficiency // SYSTEM DIAGNOSTICS
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          {SKILLS.map((skill) => (
                              <SkillBar key={skill.name} name={skill.name} level={skill.level} isDark={isDark} />
                          ))}
                      </div>
                  </div>
              </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* --- AI TERMINAL SECTION --- */}
      <section id="tools" className="container mx-auto px-4 py-24 scroll-mt-20">
         <RevealOnScroll>
            <div className={`max-w-4xl mx-auto border relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#080a0f] border-jazen-gray' : 'bg-gray-900 border-gray-700 shadow-2xl'}`}>
                {/* Terminal Header */}
                <div className={`px-4 py-2 flex items-center justify-between border-b ${isDark ? 'bg-jazen-gray/50 border-jazen-gray' : 'bg-gray-800 border-gray-700'}`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-mono text-jazen-gold/50">AI_ARCHITECT_V2.exe</span>
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex items-center space-x-4 mb-8">
                      <Zap className="text-jazen-red w-8 h-8" />
                      <h2 className="text-4xl font-bold text-white tracking-wide">THEME GENERATOR</h2>
                  </div>

                  <div className={`flex flex-col md:flex-row gap-0 border ${isDark ? 'border-jazen-gray' : 'border-gray-700'}`}>
                      <input 
                        type="text" 
                        value={customVibe}
                        onChange={(e) => setCustomVibe(e.target.value)}
                        className="flex-1 bg-black/50 text-white px-6 py-4 focus:outline-none font-mono text-lg placeholder-gray-500"
                        placeholder="ENTER VIBE PARAMETERS..."
                      />
                      <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-jazen-red hover:bg-white hover:text-jazen-red text-white font-bold px-8 py-4 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                      >
                        {loading ? <span className="animate-pulse">PROCESSING</span> : "EXECUTE"}
                      </button>
                  </div>

                  {activeIdea && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-black/40 border-l-2 border-jazen-gold p-4">
                          <span className="text-xs text-jazen-gold/50 font-mono block mb-1">OUTPUT_TITLE</span>
                          <p className="text-2xl text-white font-bold uppercase">{activeIdea.title}</p>
                        </div>
                        <div className="bg-black/40 border-l-2 border-jazen-gold p-4">
                          <span className="text-xs text-jazen-gold/50 font-mono block mb-1">OUTPUT_BRB</span>
                          <p className="text-xl text-jazen-red font-serif italic">{activeIdea.brbMessage}</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-black/40 border-l-2 border-jazen-gray p-4">
                          <span className="text-xs text-jazen-gold/50 font-mono block mb-1">VISUAL_ANALYSIS</span>
                          <p className="text-gray-400 font-mono text-sm">{activeIdea.themeDescription}</p>
                        </div>
                    </div>
                  )}
                </div>
            </div>
         </RevealOnScroll>
      </section>

      {/* --- PAINEIS / PANELS --- */}
      <section id="panels" className="container mx-auto px-4 pb-32 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="PANELS" subtitle="INFO TILES" theme={theme} />
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <PanelButton icon={<Instagram size={20} />} label="instagram" theme={theme} />
            <PanelButton icon={<Twitter size={20} />} label="twitter" theme={theme} />
            <PanelButton icon={<DollarSign size={20} />} label="donate" theme={theme} />
            <PanelButton icon={<Crown size={20} />} label="sub perks" theme={theme} />
            <PanelButton icon={<Monitor size={20} />} label="setup" theme={theme} />
            <PanelButton icon={<MessageSquare size={20} />} label="discord" theme={theme} />
          </div>
        </RevealOnScroll>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="container mx-auto px-4 pb-32 scroll-mt-20">
        <RevealOnScroll>
          <SectionHeader title="CONTACT" subtitle="WORK WITH ME" theme={theme} />
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className={`max-w-4xl mx-auto border relative overflow-hidden group transition-colors duration-500 ${isDark ? 'bg-[#080a0f] border-jazen-gray' : 'bg-white border-gray-300 shadow-xl'}`}>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-jazen-red/50 z-10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-jazen-red/50 z-10"></div>
            
            <div className="p-8 md:p-12 relative z-20">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group/input">
                    <label className={`text-xs font-mono tracking-widest uppercase ml-1 transition-colors ${isDark ? 'text-jazen-gold group-focus-within/input:text-jazen-red' : 'text-gray-500 group-focus-within/input:text-jazen-red'}`}>Name</label>
                    <input type="text" className={`w-full border px-6 py-4 focus:outline-none focus:border-jazen-red transition-colors font-sans text-xl ${isDark ? 'bg-[#050608] border-jazen-gray text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} placeholder="ENTER YOUR NAME" />
                  </div>
                  <div className="space-y-2 group/input">
                    <label className={`text-xs font-mono tracking-widest uppercase ml-1 transition-colors ${isDark ? 'text-jazen-gold group-focus-within/input:text-jazen-red' : 'text-gray-500 group-focus-within/input:text-jazen-red'}`}>Email</label>
                    <input type="email" className={`w-full border px-6 py-4 focus:outline-none focus:border-jazen-red transition-colors font-sans text-xl ${isDark ? 'bg-[#050608] border-jazen-gray text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} placeholder="ENTER YOUR EMAIL" />
                  </div>
                </div>
                
                <div className="space-y-2 group/input">
                    <label className={`text-xs font-mono tracking-widest uppercase ml-1 transition-colors ${isDark ? 'text-jazen-gold group-focus-within/input:text-jazen-red' : 'text-gray-500 group-focus-within/input:text-jazen-red'}`}>Message</label>
                    <textarea rows={6} className={`w-full border px-6 py-4 focus:outline-none focus:border-jazen-red transition-colors font-sans text-xl resize-none ${isDark ? 'bg-[#050608] border-jazen-gray text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} placeholder="DESCRIBE YOUR PROJECT..."></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="button" className="bg-jazen-red hover:bg-white hover:text-jazen-red text-white font-bold px-12 py-4 uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-3 group/btn">
                    <span>SEND REQUEST</span>
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Background Tech Lines */}
            <div className={`absolute top-1/2 left-0 w-full h-[1px] pointer-events-none ${isDark ? 'bg-jazen-gray/20' : 'bg-gray-200'}`}></div>
            <div className={`absolute left-1/2 top-0 w-[1px] h-full pointer-events-none ${isDark ? 'bg-jazen-gray/20' : 'bg-gray-200'}`}></div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className={`w-full py-12 border-t transition-colors duration-500 ${isDark ? 'bg-[#020202] border-jazen-gray' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 flex flex-col items-center">
           <RevealOnScroll>
              <h2 className={`text-5xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white/10' : 'text-gray-200'}`}>ABIR</h2>
           </RevealOnScroll>
           <Typewriter 
             text="Designed & Developed by Gemini AI"
             className={`text-xs tracking-widest uppercase flex items-center justify-center gap-0 ${isDark ? 'text-jazen-gold' : 'text-gray-400'}`}
             cursorClassName={isDark ? 'bg-jazen-red' : 'bg-gray-400'}
             speed={50}
             delay={500}
           />
        </div>
      </footer>

      <style>{`
        .clip-path-slant {
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default App;