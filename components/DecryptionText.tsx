import React, { useState, useEffect, useRef } from 'react';

interface DecryptionTextProps {
  text: string;
  className?: string;
  speed?: number;
  initialDelay?: number;
  animateOnHover?: boolean;
}

export const DecryptionText: React.FC<DecryptionTextProps> = ({
  text,
  className = "",
  speed = 30,
  initialDelay = 500,
  animateOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Mixed character set for cyberpunk aesthetic
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|";

  const startAnimation = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " "; // Preserve spaces
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Resolve speed
    }, speed);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
        startAnimation();
    }, initialDelay);

    return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, initialDelay]);

  return (
    <span 
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => {
        if (animateOnHover) startAnimation();
      }}
    >
      {displayText}
    </span>
  );
};
