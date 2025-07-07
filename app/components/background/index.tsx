"use client";
import React, {
  useEffect,
  useMemo,
  Suspense,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";


export default function Background() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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

  const motionValues = {
    tilt: {
      x: useSpring(0, springConfig), // gamma
      y: useSpring(0, springConfig), // beta
    },
    touch: {
      x: useMotionValue(0.5),
      y: useMotionValue(0.5),
    },
  };

  const smoothTouch = {
    x: useSpring(motionValues.touch.x, springConfig),
    y: useSpring(motionValues.touch.y, springConfig),
  };

  useEffect(() => {
    // Handler for mouse movement on desktop
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      motionValues.touch.x.set(x);
      motionValues.touch.y.set(y);
    };

    // Handler for touch movement on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = touch.clientX / innerWidth;
      const y = touch.clientY / innerHeight;
      motionValues.touch.x.set(x);
      motionValues.touch.y.set(y);
    };

    // Handler for device orientation on mobile
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      // Use a wider range for more pronounced movement and convert to radians
      const clamp = (val: number, min: number, max: number) => Math.max(Math.min(val, max), min);
      const beta = clamp(e.beta, -90, 90);  // front-to-back tilt
      const gamma = clamp(e.gamma, -90, 90); // left-to-right tilt

      // Convert degrees to radians for direct use in rotation
      motionValues.tilt.y.set(beta * (Math.PI / 180));
      motionValues.tilt.x.set(gamma * (Math.PI / 180));
    };

    const requestOrientationPermission = () => {
      // iOS 13+ requires user permission for DeviceOrientation events
      const doe = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof doe.requestPermission === 'function') {
        doe.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    if (isMobile) {
      // For mobile, add listeners for both orientation and touch
      document.body.addEventListener('click', requestOrientationPermission, { once: true });
      document.body.addEventListener('touchend', requestOrientationPermission, { once: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
        document.body.removeEventListener('click', requestOrientationPermission);
        document.body.removeEventListener('touchend', requestOrientationPermission);
        window.removeEventListener("touchmove", handleTouchMove);
      };

    } else {
      // For desktop, use mouse move with throttling
      const throttledMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => handleMouseMove(e));
      };
      window.addEventListener('mousemove', throttledMouseMove);
      return () => {
        window.removeEventListener('mousemove', throttledMouseMove);
      };
    }
  }, [isMobile, motionValues.tilt, motionValues.touch]);

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
          <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.01} />
        </EffectComposer>
        <Model motionValues={{...motionValues, touch: smoothTouch}} currentTheme={currentTheme} />
        <Environment preset="city" background={false} />
      </Suspense>
    </Canvas>
  );
}
