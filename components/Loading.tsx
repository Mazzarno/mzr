"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

export default function Loading({ onComplete }: { onComplete?: () => void }) {
  const titleRef = useRef(null);
  const progressBarRef = useRef(null);
  const loadingContainerRef = useRef(null);
  const { resolvedTheme } = useTheme(); // 🔥 Récupère le thème actuel

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });

    tl.to(progressBarRef.current, {
      duration: 2,
      width: "100%",
      ease: "power2.out",
    });

    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min((elapsed / 2000) * 100, 100);
      document.documentElement.style.setProperty(
        "--loading-progress",
        `${progress}%`
      );
      if (progress === 100) clearInterval(interval);
    }, 50);

    setTimeout(() => {
      gsap.to(loadingContainerRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onComplete,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={loadingContainerRef}
      className={`fixed inset-0 flex flex-col items-center justify-center h-screen transition-all duration-500 ${
        resolvedTheme === "dark" ? "bg-base-300" : "bg-base-100"
      } z-50`}
    >
      <h1
        ref={titleRef}
        className="text-5xl font-bold loading-text"
        style={{ fontFamily: "var(--font-despairs)" }}
      >
        Alexis GERMAIN
      </h1>

      <div className="w-full max-w-sm mt-4 h-0.5 bg-base-200 rounded-full">
        <div ref={progressBarRef} className="loading-bar h-full" />
      </div>

      <style jsx>{`
        .loading-text {
          background: linear-gradient(
            90deg,
            var(--color-base-content) var(--loading-progress),
            var(--color-base-100) var(--loading-progress)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .loading-bar {
          background: var(--color-base-content);
          width: 0%;
        }
      `}</style>
    </div>
  );
}
