"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  duration?: number;
  onLoadComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ duration = 3, onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const text = "ALEXIS GERMAIN";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration * 10);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            if (onLoadComplete) setTimeout(onLoadComplete, 400);
          }, 300);

          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);


  const commonTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: commonTransition,
    },
    exit: {
      opacity: 0,
      transition: {
        ...commonTransition,
        duration: 0.6,
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: commonTransition,
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: commonTransition,
    },
  };


  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "linear",
      },
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
          className="flex flex-col items-center justify-center h-full bg-gradient-to-bl from-base-200/50 to-base-100"
        >
          <motion.div
            className="flex flex-col items-center space-y-10"
            variants={itemVariants}
          >
            <motion.div
              className="relative font-bold text-5xl text-transparent"
              style={{ fontFamily: "var(--font-despairs)" }}
              variants={itemVariants}
            >
          
              <span className="opacity-0">{text}</span>

              <div
                className="absolute inset-0 overflow-hidden whitespace-nowrap"
                style={{
                  width: `${progress}%`,
                  backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {text}
              </div>
            </motion.div>

            <div className="w-full flex flex-col items-center space-y-3">
              <div className="w-full max-w-sm h-[2px] bg-base-300/30 rounded-full overflow-hidden">
                <motion.div
                  variants={progressVariants}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>

              <motion.div
                className="text-xs font-medium text-base-content/70"
                variants={itemVariants}
              >
                {Math.floor(progress)}%
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
