"use client";

import { useEffect, useState, useRef, memo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedTextProps = {
  translationKey?: string;
  text?: string;
  className?: string;
};

// Utiliser memo pour éviter les re-rendus inutiles
const AnimatedText = memo(({ translationKey, text, className = "" }: AnimatedTextProps) => {
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
    
    // Ne mettre à jour que si le texte a changé
    if (newText !== prevTextRef.current) {
      setDisplayText(newText);
      prevTextRef.current = newText;
    }
  }, [translationKey, text, t]);

  // Animation variants pour chaque caractère - simplifiées pour de meilleures performances
  const letterVariants = {
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
        delay: Math.min(i * 0.01, 0.3) // Limiter le délai maximum à 300ms
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

  // Diviser le texte en caractères pour l'animation
  const characters = displayText.split("");

  return (
    <AnimatePresence mode="wait">
      <span className={`inline-flex relative ${className}`} key={displayText} style={{ minWidth: `${characters.length * 0.5}em` }}>
        {characters.map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            custom={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="inline-block"
            style={{ 
              display: "inline-block",
              width: char === " " ? "0.3em" : "auto",
              position: "relative",
              height: "1em"
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </AnimatePresence>
  );
});

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
