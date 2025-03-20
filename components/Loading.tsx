"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingProps {
  duration?: number;
  onLoadComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ 
  duration = 3, 
  onLoadComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);  
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  
  useEffect(() => {
    tl.current = gsap.timeline();

    tl.current.from(titleRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });
    
    if (titleRef.current) {
      titleRef.current.style.setProperty('--loading-progress', '0%');
    }
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration * 10);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          if (progressBarRef.current && titleRef.current) {
            gsap.to(progressBarRef.current, {
              width: "100%",
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                if (onLoadComplete) setTimeout(onLoadComplete, 300);
              }
            });
            
            titleRef.current.style.setProperty('--loading-progress', '100%');
          }
          
          return 100;
        }
        
        if (titleRef.current) {
          titleRef.current.style.setProperty('--loading-progress', `${newProgress}%`);
        }
        
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${newProgress}%`,
            duration: 0.2,
            ease: "power1.out"
          });
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1
        ref={titleRef}
        className="text-5xl font-bold loading-text"
        style={{ fontFamily: "var(--font-despairs)" }}
      >
        Alexis GERMAIN
      </h1>

      <div 
        ref={progressContainerRef}
        className="w-full max-w-sm mt-4 h-0.5 bg-base-200 rounded-full"
      >
        <div 
          ref={progressBarRef} 
          className="loading-bar h-full rounded-full" 
        />
      </div>

      <style jsx>{`
        .loading-text {
          background: linear-gradient(
            90deg,
            var(--color-base-content) var(--loading-progress),
            var(--color-base-100) var(--loading-progress)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .loading-bar {
          background: var(--color-base-content);
          width: 0%;
        }
      `}</style>
    </div>
  );
};

export default Loading;