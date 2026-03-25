import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 1,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId: number | null = null;

    const resize = () => {
      if (!canvas) return;
      const width = Math.max(1, Math.round(patternSize * patternScaleX));
      const height = Math.max(1, Math.round(patternSize * patternScaleY));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    const drawGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const alpha = Math.max(0, Math.min(255, patternAlpha));

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = alpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (!isVisibleRef.current || prefersReducedMotion) return;
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
      if (isVisibleRef.current && !prefersReducedMotion) {
        animationId = window.requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    drawGrain();

    if (!prefersReducedMotion) {
      animationId = window.requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, [
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha,
    prefersReducedMotion,
  ]);

  return (
    <canvas
      className="pointer-events-none absolute top-0 left-0 h-screen w-screen"
      ref={grainRef}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
};

export default Noise;
