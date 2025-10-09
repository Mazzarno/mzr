"use client";
import React, { useEffect, useMemo, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import ModelShapes from "./ModelShapes";
import { Environment } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export default function Background() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
        navigator.userAgent
      );
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
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      mouse.x.set(x);
      mouse.y.set(y);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
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
        // Non-iOS 13+ devices
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    if (isMobile) {
      document.body.addEventListener("click", requestOrientationPermission, {
        once: true,
      });
      document.body.addEventListener("touchend", requestOrientationPermission, {
        once: true,
      });

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        document.body.removeEventListener(
          "click",
          requestOrientationPermission
        );
        document.body.removeEventListener(
          "touchend",
          requestOrientationPermission
        );
      };
    } else {
      const throttledMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => handleMouseMove(e));
      };
      window.addEventListener("mousemove", throttledMouseMove);
      return () => {
        window.removeEventListener("mousemove", throttledMouseMove);
      };
    }
  }, [isMobile, mouse.x, mouse.y]);

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
        <EffectComposer enableNormalPass={false}>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new Vector2(0.0005, 0.0005)}
          />
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.01}
          />
        </EffectComposer>
        <ModelShapes mouse={smoothMouse} currentTheme={currentTheme} />
        {/* <ModelNuage mouse={smoothMouse} currentTheme={currentTheme} /> */}
        <Environment preset="city" background={false} />
      </Suspense>
    </Canvas>
  );
}
