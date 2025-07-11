'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

interface LoadingProps {
  duration?: number;
  onLoadComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({
  duration = 1.5,
  onLoadComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'fake' | 'real'>('fake');
  const [isComplete, setIsComplete] = useState(false);
  const { progress: r3fProgress } = useProgress();
  const [domLoaded, setDomLoaded] = useState(false);

  const text = 'ALEXIS GERMAIN';

  useEffect(() => {
    if (phase !== 'fake') return;

    let current = 0;
    const start = Date.now();
    const durationMs = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const fakeProgress = Math.min((elapsed / durationMs) * 69, 69);
      current = Math.floor(fakeProgress);
      setProgress(current);

      if (current >= 69) {
        clearInterval(interval);
        setPhase('real');
      }
    }, 30);

    return () => clearInterval(interval);
  }, [phase, duration]);

  useEffect(() => {
    const handleLoad = () => setDomLoaded(true);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (phase !== 'real') return;

    const interval = setInterval(() => {
      const target = 69 + (r3fProgress * 0.31);
      const capped = Math.min(Math.floor(target), 100);
      setProgress(capped);

      if (domLoaded && r3fProgress >= 100 && capped >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          if (onLoadComplete) setTimeout(onLoadComplete, 400);
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, r3fProgress, domLoaded, onLoadComplete]);

  const commonTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: commonTransition },
    exit: { opacity: 0, transition: { ...commonTransition, duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: commonTransition },
    exit: { opacity: 0, y: -10, transition: commonTransition }
  };

  const progressVariants = {
    hidden: { width: '0%' },
    visible: {
      width: `${progress}%`,
      transition: { duration: 0.3, ease: 'linear' }
    },
    exit: {
      width: '100%',
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
          className="flex flex-col items-center justify-center min-h-screen min-w-full bg-gradient-to-bl from-base-200/50 to-base-100 px-2 sm:px-0"
        >
          <motion.div
            className="flex flex-col items-center space-y-10"
            variants={itemVariants}
          >
            <motion.div
              className="relative font-bold text-3xl sm:text-5xl text-transparent text-center leading-tight sm:leading-[1.1] px-2"
              style={{ fontFamily: 'var(--font-despairs)' }}
              variants={itemVariants}
            >
              <span className="opacity-0">{text}</span>

              <motion.div
                className="absolute inset-0 overflow-hidden whitespace-nowrap"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration }}
              >
                {text}
              </motion.div>
            </motion.div>

            <div className="w-full flex flex-col items-center space-y-3">
              <div className="w-full max-w-[90vw] sm:max-w-sm h-[2.5px] bg-base-300/30 rounded-full overflow-hidden">
                <motion.div
                  variants={progressVariants}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>

              <motion.div
                className="text-xs sm:text-sm font-medium text-base-content/70 text-center"
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
