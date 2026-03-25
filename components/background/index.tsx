"use client";
import React, { useEffect, useMemo, Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import ModelShapes from "./ModelShapes";
import { Environment } from "@react-three/drei";
import { useMotionValue, useSpring, useScroll, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

interface BackgroundProps {
  onShapesReady?: () => void;
}

export default function Background({ onShapesReady }: BackgroundProps) {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const frameCount = useRef(0);

  const { scrollYProgress } = useScroll();

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      mouse.x.set(x);
      mouse.y.set(y);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      frameCount.current++;
      if (frameCount.current % 2 !== 0) return;

      const clamp = (val: number, min: number, max: number) =>
        Math.max(Math.min(val, max), min);
      const beta = clamp(e.beta, -45, 45);
      const gamma = clamp(e.gamma, -45, 45);

      const x = (gamma + 45) / 90;
      const y = (beta + 45) / 90;

      mouse.x.set(x);
      mouse.y.set(y);
    };

    const requestOrientationPermission = () => {
      const doe = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof doe.requestPermission === "function") {
        doe
          .requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    if (isMobile) {
      document.body.addEventListener("click", requestOrientationPermission, { once: true });
      document.body.addEventListener("touchend", requestOrientationPermission, { once: true });

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        document.body.removeEventListener("click", requestOrientationPermission);
        document.body.removeEventListener("touchend", requestOrientationPermission);
      };
    } else {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMobile, mouse.x, mouse.y, prefersReducedMotion]);

  const chromaticOffset = useMemo(() => new Vector2(0.0005, 0.0005), []);

  const enableEffects = !prefersReducedMotion && !isMobile;
  const dpr = prefersReducedMotion || isMobile ? 1 : 2;

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 200], zoom: 10 }}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      dpr={dpr}
      gl={{
        antialias: !prefersReducedMotion && !isMobile,
        powerPreference: prefersReducedMotion || isMobile ? "low-power" : "high-performance",
        stencil: false,
        depth: true,
        alpha: true,
      }}
    >
      <Suspense fallback={null}>
        {enableEffects && (
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={chromaticOffset}
              radialModulation={false}
              modulationOffset={0}
            />
            <Noise
              premultiply
              blendFunction={BlendFunction.SOFT_LIGHT}
              opacity={0.015}
            />
            <Vignette
              offset={0.5}
              darkness={0.3}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        )}
        <ModelShapes
          mouse={smoothMouse}
          currentTheme={currentTheme}
          scrollProgress={scrollProgress}
          isMobile={isMobile}
          isReducedMotion={Boolean(prefersReducedMotion)}
          onShapesReady={onShapesReady}
        />
        <Environment preset="city" background={false} environmentIntensity={0.25} />
      </Suspense>
    </Canvas>
  );
}
