"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import Loading from "@/components/Loading";

interface TransitionProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  children: React.ReactNode;
}

const Transition: React.FC<TransitionProps> = ({
  isLoading,
  setIsLoading,
  children,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const handleLoadComplete = () => {
    if (loaderRef.current && !hasAnimated.current) {
      hasAnimated.current = true;

      // Animation de sortie du loader
      gsap.to(loaderRef.current, {
        y: "100vh",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          setIsLoading(false);
          
          // Animation des éléments de la page d'accueil
          if (childrenRef.current) {
            gsap.from(childrenRef.current.children, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.2
            });
          }
        }
      });
    }
  };

  return (
    <>
      <div 
        ref={childrenRef} 
        className="relative z-40" 
        aria-hidden={isLoading}
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {children}
      </div>
      
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 bg-base-100 flex items-center justify-center overflow-hidden"
          role="progressbar"
          aria-label="Chargement du site"
        >
          <Loading duration={3} onLoadComplete={handleLoadComplete} />
        </div>
      )}
    </>
  );
};

export default Transition;
