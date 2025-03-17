"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Loading() {
  useEffect(() => {
    // Animation GSAP pour faire apparaître le texte
    gsap.from(".loading-text", {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });

    // Animation GSAP sur la barre de chargement (sur 2 secondes)
    gsap.to(".loading-bar", {
      duration: 2,
      width: "100%",
      ease: "linear",
    });

    // Mise à jour de la variable CSS --loading-progress pour le gradient du texte
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const prog = Math.min((elapsed / 2000) * 100, 100);
      document.documentElement.style.setProperty(
        "--loading-progress",
        `${prog}%`
      );
      if (prog === 100) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base">
      <h1
        style={{ fontFamily: "var(--font-despairs)" }}
        className="text-5xl font-bold loading-text"
      >
        Alexis GERMAIN
      </h1>
      <div className="w-full max-w-sm mt-4 h-0.5 bg-base-200 rounded-full">
        <div className="loading-bar h-full" />
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
      `}</style>
    </div>
  );
}
