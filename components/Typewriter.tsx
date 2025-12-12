import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "",
  cursorClassName = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      let currentIndex = 0;
      
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, speed);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, hasStarted, text, speed, delay]);

  return (
    <p ref={elementRef} className={className} aria-label={text}>
      {displayedText}
      <span className={`inline-block w-[2px] h-[1em] ml-1 align-middle animate-blink ${cursorClassName}`}></span>
    </p>
  );
};