"use client";

import { useEffect, useState, useRef, memo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedTextProps = {
  translationKey?: string;
  text?: string;
  className?: string;
  animated?: boolean; 
};

const AnimatedText = memo(({ 
  translationKey, 
  text, 
  className = "",
  animated = true 
}: AnimatedTextProps) => {
  const t = useTranslations();
  const [displayText, setDisplayText] = useState("");
  const prevTextRef = useRef("");
  
  useEffect(() => {
    let newText = "";
    if (translationKey) {
      newText = t(translationKey);
    } else if (text) {
      newText = text;
    }
    if (newText !== prevTextRef.current) {
      setDisplayText(newText);
      prevTextRef.current = newText;
    }
  }, [translationKey, text, t]);

  if (!animated) {
    return <span className={className}>{displayText}</span>;
  }

  const words = displayText.split(" ");
  
  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 3,
      scale: 0.98
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut",
        delay: Math.min(i * 0.03, 0.15)
      }
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <span className={`inline-flex relative ${className}`} key={displayText}>
        {words.map((word, index) => (
          <motion.span

            key={`${index}-${word}`}
            custom={index}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="inline-block text-base-content"
            style={{ 
              display: "inline-block",
              marginRight: "0.3em",
              position: "relative",
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </AnimatePresence>
  );
});

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
