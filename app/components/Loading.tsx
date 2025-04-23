"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  duration?: number;
  onLoadComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ 
  duration = 3, 
  onLoadComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  
  const text = "ALEXIS GERMAIN";  
  
  useEffect(() => {
    // Calculer la progression du chargement
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 100 / (duration * 10);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Déclencher immédiatement l'animation de sortie
          setTimeout(() => {
            setIsComplete(true);
            // Appeler onLoadComplete après un court délai pour permettre à l'animation de sortie de commencer
            if (onLoadComplete) setTimeout(onLoadComplete, 400);
          }, 300);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);
  
  // Animation commune pour tous les éléments
  const commonTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  };
  
  // Animation de conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: commonTransition 
    },
    exit: { 
      opacity: 0,
      transition: {
        ...commonTransition,
        duration: 0.6
      }
    }
  };
  
  // Animation du texte et de tous les éléments
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: commonTransition
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: commonTransition
    }
  };
  
  // Animation de la barre de progression
  const progressVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: `${progress}%`,
      transition: { 
        duration: 0.3,
        ease: "linear"
      }
    },
    exit: {
      width: "100%",
      opacity: 0,
      transition: commonTransition
    }
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
          className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-bl from-base-200/50 to-base-100"
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
              
              <motion.div
                className="absolute inset-0 overflow-hidden whitespace-nowrap"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration }}
              >
                {text}
              </motion.div>
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