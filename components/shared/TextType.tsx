"use client";

import { ElementType, useEffect, useRef, useState, createElement, useCallback } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import AnimatedText from "../core/AnimatedText";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text?: string | string[];
  translationKeys?: string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  translationKeys,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const t = useTranslations();
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  // Build the array of texts, resolving translations if translationKeys are provided
  const textArrayRaw =
    translationKeys && translationKeys.length > 0
      ? translationKeys.map((key) => t(key))
      : Array.isArray(text)
        ? text
        : typeof text === "string"
          ? [text]
          : [];
  // Ensure at least one safe item to prevent undefined access
  const textArray = textArrayRaw.length > 0 ? textArrayRaw : [""];

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const currentText = textArray[currentTextIndex] ?? "";
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < (processedText?.length ?? 0)) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + (processedText?.[currentCharIndex] ?? "")
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  // On locale/keys change, keep the same phrase index, but reset the typing of that phrase.
  useEffect(() => {
    setDisplayedText("");
    setCurrentCharIndex(0);
    setIsDeleting(false);
    // Keep the same phrase index, but clamp to new array length if needed
    setCurrentTextIndex((prev) => {
      const maxIndex = Math.max(0, textArray.length - 1);
      return Math.min(prev, maxIndex);
    });
  }, [translationKeys, t, textArray.length]);

  const currentFullText = textArray[currentTextIndex] ?? "";
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < currentFullText.length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <AnimatedText
      text={displayedText}
      animated={false}
      className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pretty font-bold bg-gradient-to-t from-base-content/60 via-base-content/80 to-base-content/100 inline-block text-transparent bg-clip-text"
    />,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 opacity-100 text-lg sm:text-xl md:text-2xl lg:text-3xl text-pretty font-bold bg-gradient-to-t from-base-content/60 via-base-content/80 to-base-content/100 inline-block text-transparent bg-clip-text ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
