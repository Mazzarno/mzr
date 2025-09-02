"use client";
import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children?: ReactNode;
  html?: string;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  html,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const isStringChildren = typeof children === "string" && !html;

  const splitText = useMemo(() => {
    const text = isStringChildren ? (children as string) : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children, isStringChildren]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Prefer provided ref; else try Lenis wrapper (#content); fallback to window
    const scroller =
      (scrollContainerRef && scrollContainerRef.current) ||
      (typeof document !== "undefined"
        ? (document.getElementById("content") as HTMLElement | null)
        : null) ||
      window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");
    const hasWords = wordElements && wordElements.length > 0;
    const textContainer =
      (el.querySelector(".scroll-reveal-text") as HTMLElement | null) || el;

    gsap.fromTo(
      hasWords ? wordElements : textContainer,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        ...(hasWords ? { stagger: 0.05 } : {}),
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        hasWords ? wordElements : textContainer,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          ...(hasWords ? { stagger: 0.05 } : {}),
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      {html ? (
        <p
          className={`scroll-reveal-text ${textClassName}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className={`scroll-reveal-text ${textClassName}`}>
          {isStringChildren ? splitText : children}
        </p>
      )}
    </h2>
  );
};

export default ScrollReveal;
