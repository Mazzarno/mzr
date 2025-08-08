"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getTitleInfo } from "./getTitleInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { TransitionContext } from "../TransitionLink";

interface TransitionProps {
  children: React.ReactNode;
  transitionDuration?: number;
  pixelDensity?: "low" | "medium" | "high";
}

interface Pixel {
  id: number;
  delay: number;
  gridX: number;
  gridY: number;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  transitionDuration = 800,
  pixelDensity = "medium",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionEnded, setTransitionEnded] = useState(true);
  const prevPath = useRef(pathname);
  const isInitialRender = useRef(true);

  const getGridConfig = useCallback(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const isTablet =
      typeof window !== "undefined" &&
      window.innerWidth >= 640 &&
      window.innerWidth < 1024;

    let cols, rows;

    const densityMultiplier =
      pixelDensity === "low" ? 0.7 : pixelDensity === "high" ? 1.5 : 1;

    if (isMobile) {
      cols = Math.floor(6 * densityMultiplier);
      rows = Math.floor(12 * densityMultiplier);
    } else if (isTablet) {
      cols = Math.floor(10 * densityMultiplier);
      rows = Math.floor(10 * densityMultiplier);
    } else {
      cols = Math.floor(12 * densityMultiplier);
      rows = Math.floor(8 * densityMultiplier);
    }

    return { cols, rows };
  }, [pixelDensity]);

  const [gridConfig, setGridConfig] = useState(() => getGridConfig());

  const generatePixels = useCallback((cols: number, rows: number) => {
    const pixels: Pixel[] = [];
    const totalPixels = cols * rows;

    const indices = Array.from({ length: totalPixels }, (_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((index, i) => {
      const gridX = index % cols;
      const gridY = Math.floor(index / cols);
      const baseDelay = i * 0.003;
      const randomVariation = Math.random() * 0.001;

      pixels.push({
        id: index,
        delay: baseDelay + randomVariation,
        gridX,
        gridY,
      });
    });

    return pixels;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setGridConfig(getGridConfig());
      pixelsRef.current = generatePixels(gridConfig.cols, gridConfig.rows);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getGridConfig, gridConfig.cols, gridConfig.rows, generatePixels]);

  const pixelsRef = useRef<Pixel[] | null>(null);

  if (!pixelsRef.current) {
    pixelsRef.current = generatePixels(gridConfig.cols, gridConfig.rows);
  }

  const startTransition = useCallback(
    (to: string) => {
      if (isTransitioning || to === pathname) return;
      setNextPath(to);
      setIsTransitioning(true);
      setTransitionEnded(false);
    },
    [isTransitioning, pathname]
  );

  const animationDuration = 0.3;

  useEffect(() => {
    if (isTransitioning && nextPath && nextPath !== pathname) {
      const timer = setTimeout(() => {
        router.push(nextPath);
      }, transitionDuration * 0.75);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPath, pathname, router, transitionDuration]);

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

        setTimeout(() => {
          setTransitionEnded(true);
        }, 100);
      }, transitionDuration * 0.7);

      return () => clearTimeout(timer);
    }
  }, [pathname, children, transitionDuration]);

  const pixels = pixelsRef.current || [];

  const childrenArray = React.Children.toArray(displayChildren);
  const navChild = childrenArray[0];
  const contentChild = childrenArray[1];
  const footerChild = childrenArray[2];

  // Calculate title for the page
  const pageTitle = getTitleInfo(nextPath || pathname);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <div
              className="w-full h-full overflow-hidden"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
                gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
              }}
            >
              {pixels.map((pixel) => (
                <motion.div
                  key={`pixel-${pixel.id}`}
                  className="w-full h-full bg-base-300"
                  style={{
                    gridColumn: pixel.gridX + 1,
                    gridRow: pixel.gridY + 1,
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  initial={{ y: "100vh", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100vh", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: animationDuration,
                    delay: pixel.delay,
                    exit: {
                      type: "tween",
                      ease: "easeIn",
                      delay: pixel.delay * 0.3,
                      duration: animationDuration,
                    },
                  }}
                />
              ))}
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.1,
              }}
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.2, opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                  exit: { delay: 0.1, duration: 0.3 },
                }}
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-base-content drop-shadow-lg pointer-events-none text-center px-4 py-2 rounded-lg"
                style={{
                  fontFamily: "var(--font-despairs)",
                  textShadow: "0 0 10px rgba(0,0,0,0.15)",
                }}
              >
                {pageTitle}
              </motion.span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {navChild}

      <motion.div
        initial={isInitialRender.current ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: isTransitioning ? 0.3 : 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: transitionEnded ? 0 : 0.1,
        }}
      >
        {contentChild}
      </motion.div>

      {footerChild}
    </TransitionContext.Provider>
  );
};

export default Transition;
