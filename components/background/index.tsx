'use client';
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Model from '@/components/background/Model';
import { Environment } from '@react-three/drei'
import { useMotionValue, useSpring } from "framer-motion"
import { useTheme } from 'next-themes'
import { throttle } from 'lodash';

export default function Background() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastMoveTime = useRef(Date.now());

  const mouse = {
    x: useMotionValue(0.5),
    y: useMotionValue(0.5)
  }

  // Réduire la raideur et l'amortissement pour des animations plus fluides et moins gourmandes
  const smoothMouse = {
    x: useSpring(mouse.x, {stiffness: 50, damping: 80, mass: 2}),
    y: useSpring(mouse.y, {stiffness: 50, damping: 80, mass: 2})
  }

  // Détecter les performances du système
  useEffect(() => {
    // Vérifier si l'appareil est mobile (généralement moins performant)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Vérifier le nombre de cœurs CPU comme indicateur de performance
    const cpuCores = navigator.hardwareConcurrency || 4;
    
    // Activer le mode basse performance si mobile ou peu de cœurs CPU
    if (isMobile || cpuCores <= 4) {
      setLowPerformanceMode(true);
    }
  }, []);


  const manageMouse = useCallback((e: MouseEvent) => {
    throttle((event: MouseEvent) => {
      const now = Date.now();

      if (now - lastMoveTime.current > 16) { 
        const { innerWidth, innerHeight } = window;
        const { clientX, clientY } = event;
        const x = clientX / innerWidth;
        const y = clientY / innerHeight;
        
   
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        
        frameRef.current = requestAnimationFrame(() => {
          mouse.x.set(x);
          mouse.y.set(y);
        });
        
        lastMoveTime.current = now;
      }
    }, 16)(e);
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    window.addEventListener("mousemove", manageMouse);
    return () => {
      window.removeEventListener("mousemove", manageMouse);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [manageMouse]);

  return (
    <Canvas 
      orthographic 
      camera={{position: [0, 0, 200], zoom: 10}}
      frameloop={lowPerformanceMode ? "demand" : "always"}
      dpr={[1, lowPerformanceMode ? 1.5 : 2]}
    >
        <Model mouse={smoothMouse} currentTheme={currentTheme} />
        <Environment preset="city" />
    </Canvas>
  )
}
