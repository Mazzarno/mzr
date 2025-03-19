"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import Loading from "./Loading";

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
      gsap.set(loaderRef.current, {
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
      });
      gsap.to(loaderRef.current, {
        y: "100vh",
        boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.3)",
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          setIsLoading(false);
        },
      });
    }
  };

  return (
    <>
      <div ref={childrenRef} className="relative z-40" aria-hidden={isLoading}>
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
