"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getTitleInfo } from "./getTitleInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { TransitionContext } from "./TransitionLink";

interface TransitionProps {
  children: React.ReactNode;
}

interface Pixel {
  id: number;
  delay: number;
  gridX: number;
  gridY: number;
}


const Transition: React.FC<TransitionProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPath = useRef(pathname);
  const isInitialRender = useRef(true);
  
  
  const gridCols = 12; 
  const gridRows = 8; 
  
 
  const generatePixels = () => {
    const pixels: Pixel[] = [];
    const totalPixels = gridCols * gridRows;
    

    const indices = Array.from({ length: totalPixels }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((index, i) => {
      const gridX = index % gridCols;
      const gridY = Math.floor(index / gridCols);
      
      pixels.push({
        id: index,
        delay: i * 0.003,
        gridX,
        gridY
      });
    });
    
    return pixels;
  };


  const pixelsRef = useRef<Pixel[] | undefined>(undefined);
  
  
  if (!pixelsRef.current) {
    pixelsRef.current = generatePixels();
  }


  const startTransition = (to: string) => {
    if (isTransitioning || to === pathname) return;
    setNextPath(to);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning && nextPath && nextPath !== pathname) {
      const timer = setTimeout(() => {
        router.push(nextPath);
      }, 800); 
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPath, pathname, router]);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      prevPath.current = pathname;
      setDisplayChildren(children);
      return;
    }
    if (pathname !== prevPath.current) {
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        prevPath.current = pathname;
        setNextPath(null);
      }, 700); 
      return () => clearTimeout(timer);
    }
  }, [pathname, children]);

  const pixels = pixelsRef.current || [];

  
  const rawChildrenArray = React.Children.toArray(displayChildren);

let childrenArray: React.ReactNode[];
if (
  rawChildrenArray.length === 1 &&
  React.isValidElement(rawChildrenArray[0]) &&
  (rawChildrenArray[0] as React.ReactElement).type === React.Fragment
) {
  const fragment = rawChildrenArray[0] as React.ReactElement;
  if (
    fragment.props &&
    Object.prototype.hasOwnProperty.call(fragment.props, "children") &&
    fragment.props.children !== undefined
  ) {
    childrenArray = React.Children.toArray(fragment.props.children);
  } else {
    childrenArray = [];
  }
} else {
  childrenArray = rawChildrenArray;
}
  const navChild = childrenArray[0];
  const contentChild = childrenArray[1];
  const footerChild = childrenArray[2];

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-1 z-40 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gridTemplateRows: `repeat(${gridRows}, 1fr)`,
    
              }}
            >
              {pixels.map((pixel) => (
                <motion.div
                  key={`pixel-${pixel.id}`}
                  className="w-full h-full bg-base-300 shadow-sm"
                  style={{
                    gridColumn: pixel.gridX + 1,
                    gridRow: pixel.gridY + 1,
                    originX: 0.5,
                    originY: 0.5,
             
                  }}
                  initial={{ y: "100vh", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100vh", opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: pixel.delay,
                    exit: { 
                      delay: pixel.delay * 0.2,
                      duration: 0.3
                    }
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 5, opacity: 0 }}
                transition={{   
                  duration: 0.4   ,
                  delay: 0.1,
                  exit: { delay: 0.1 }
                }}
                className="text-4xl font-bold text-base-content drop-shadow-lg pointer-events-none"
                style={{ fontFamily: "var(--font-despairs)" }}
              >
                {getTitleInfo(nextPath || pathname)}
              </motion.span>
            </div>
          </div>
        )}
      </AnimatePresence>
      {/* Navigation above transition */}
      {navChild}
      {/* Main content fades */}
      <div 
        className="transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0.3 : 1 }}
      >
        {contentChild}
      </div>
      {/* Footer above transition */}
      {footerChild}
    </TransitionContext.Provider>
  );
};

export default Transition;