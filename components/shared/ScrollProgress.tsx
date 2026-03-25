"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    try {
      const storedDismissed = window.sessionStorage.getItem(
        "scrollProgressDismissed"
      );
      const dismissed = storedDismissed === "true";
      setIsDismissed(dismissed);
      if (dismissed) return;
    } catch {
      setIsDismissed(false);
    }

    const container = document.getElementById("content");
    if (!container) return;
    containerRef.current = container;

    const updateProgress = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      const next = maxScroll > 0 ? Math.round((container.scrollTop / maxScroll) * 100) : 0;
      if (next !== lastProgressRef.current) {
        lastProgressRef.current = next;
        setProgress(next);
      }
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    updateProgress();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const safeProgress = clamp(progress, 0, 100);
  const isVisible = safeProgress > 2;
  const showTop = safeProgress > 12;

  const handleBackToTop = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("scrollProgressDismissed", "true");
      } catch { }
    }
  };

  if (isDismissed) return null;


}
