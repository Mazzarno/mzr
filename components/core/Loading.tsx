"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import BlurText from "../shared/BlurText";

interface LoadingProps {
  duration?: number;
  onLoadComplete?: () => void;
}
const Loading: React.FC<LoadingProps> = ({
  duration = 1.5,
  onLoadComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"fake" | "wait" | "done">("fake");
  const [isComplete, setIsComplete] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const { progress: r3fProgress } = useProgress();
  const [isTitleAnimationComplete, setIsTitleAnimationComplete] =
    useState(false);

  const handleAnimationComplete = () => {
    setIsTitleAnimationComplete(true);
  };

  useEffect(() => {
    if (phase !== "fake" || !isTitleAnimationComplete) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 50) {
          clearInterval(interval);
          setPhase("wait");
          return 50;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase, isTitleAnimationComplete]);

  useEffect(() => {
    const handleLoad = () => setDomLoaded(true);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (phase !== "wait") return;
    if (!domLoaded || r3fProgress < 100) return;

    const start = performance.now();
    const durationMs = duration * 1000;

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);

      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const newProgress = 50 + eased * 50;
      setProgress(newProgress);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setPhase("done");
        if (onLoadComplete) setTimeout(onLoadComplete, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [phase, domLoaded, r3fProgress, duration, onLoadComplete]);

  const commonTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: commonTransition },
    exit: { opacity: 0, transition: { ...commonTransition, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: commonTransition },
    exit: { opacity: 0, y: -10, transition: commonTransition },
  };

  const barContainerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { ...commonTransition, duration: 0.8, delay: 0.2 },
    },
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${progress}%`,
      transition: { duration: 0.3, ease: "linear" },
    },
    exit: {
      width: "100%",
      opacity: 0,
      transition: commonTransition,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="loading"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center justify-center min-h-screen min-w-screen max-h-screen max-w-screen bg-gradient-to-bl from-base-200/50 to-base-100 px-2 sm:px-0 z-[9999]"
        >
          <motion.div
            className="flex flex-col items-center space-y-10"
            variants={itemVariants}
          >
            <BlurText
              text="Alexis Germain"
              delay={90}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="content-title tracking-wider"
            />
            <motion.div
              className="w-full flex flex-col items-center space-y-3"
              variants={barContainerVariants}
              initial="hidden"
              animate={isTitleAnimationComplete ? "visible" : "hidden"}
            >
              <div className="w-full max-w-[90vw] sm:max-w-sm h-[2.5px] bg-base-300/30 rounded-full overflow-hidden">
                <motion.div
                  variants={progressVariants}
                  className="h-full bg-gradient-to-r from-base-content/10 to-base-content/100 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
