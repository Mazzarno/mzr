"use client";
import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export default function Background() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const lastMoveTime = useRef(Date.now());

  const springConfig = useMemo(
    () => ({
      stiffness: 100,
      damping: 35,
      mass: 0.8,
      restDelta: 0.002,
    }),
    []
  );

  const mouse = {
    x: useMotionValue(0.5),
    y: useMotionValue(0.5),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime.current < 32) return;

      lastMoveTime.current = now;

      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;

      mouse.x.set(x);
      mouse.y.set(y);
    },
    [mouse.x, mouse.y]
  );

  useEffect(() => {
    const throttledMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 200], zoom: 10 }}
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <Model mouse={smoothMouse} currentTheme={currentTheme} />
        <Environment preset="city" background={false} blur={0.5} />
      </Suspense>
    </Canvas>
  );
}
