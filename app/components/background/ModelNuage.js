/*import React, { useEffect, useState, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";

export default function ModelNuage({ mouse, currentTheme }) {
  const { nodes } = useGLTF('/3d/nuage.glb');

  const [scaleFactor, setScaleFactor] = useState(1);

  const computeScale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (w < 768) {
      return Math.min(w, h) / 850;
    }
    else if (w < 1280) {
      return Math.min(w, h) / 1000;
    }
    else {
      return Math.min(w, h) / 900;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(computeScale());
    };
    handleResize(); // set au mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeShape, setActiveShape] = useState(1);
  const isDarkTheme = currentTheme === "dark";
  const intervalRef = useRef(null);
  const isVisibleRef = useRef(true);
  const lightThemeColor = "#FFFFFF";
  const darkThemeColor = "#212529";

  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = setTimeout(() => {
      if (isVisibleRef.current) {
        setActiveShape((prev) => (prev === 10 ? 1 : prev + 1));
      }
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [activeShape]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <motion.group
      initial={{ scaleX: 0, y: 500 }}
      animate={{ scaleX: 1, y: 0 }}
      transition={{
        duration: 1.5,
        ease: [0.215, 0.61, 0.355, 1],

      }}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
    >
      <Mesh
        node={nodes.LeftAxe}
        multiplier={2.4}
        mouse={mouse}
        isActive={activeShape === 1}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.RightAxe}
        multiplier={2.4}
        mouse={mouse}
        isActive={activeShape === 2}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.DualShock}
        multiplier={1.2}
        mouse={mouse}
        isActive={activeShape === 3}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.AirForce1Droite}
        multiplier={1}
        mouse={mouse}
        isActive={activeShape === 4}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.AirForce1Gauche}
        multiplier={1.8}
        mouse={mouse}
        isActive={activeShape === 5}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.Macbook}
        multiplier={1.8}
        mouse={mouse}
        isActive={activeShape === 6}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.ReactLogo}
        multiplier={2}
        mouse={mouse}
        isActive={activeShape === 7}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.Backdrop}
        multiplier={1.2}
        mouse={mouse}
        isActive={activeShape === 8}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.JSIco}
        multiplier={1.6}
        mouse={mouse}
        isActive={activeShape === 9}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
      <Mesh
        node={nodes.BlenderIco}
        multiplier={1.8}
        mouse={mouse}
        isActive={activeShape === 10}
        isDarkTheme={isDarkTheme}
        lightColor={lightThemeColor}
        darkColor={darkThemeColor}
      />
    </motion.group>
  )
}

useGLTF.preload('/3d/nuage.glb');

function Mesh({ 
  node,
  multiplier,
  mouse,
  isActive,
  isDarkTheme,
  lightColor,
  darkColor,
}) {
  const { geometry, position, scale, rotation, material, children } = node;
  const a = multiplier / 2;

  const rotationX = useTransform(
    mouse.x,
    [0, 1],
    [rotation.x - a / 2, rotation.x + a / 2]
  );
  const rotationY = useTransform(
    mouse.y,
    [0, 1],
    [rotation.y - a / 2, rotation.y + a / 2]
  );
  const positionX = useTransform(
    mouse.x,
    [0, 1],
    [position.x - multiplier, position.x + multiplier]
  );
  const positionY = useTransform(
    mouse.y,
    [0, 1],
    [position.y + multiplier, position.y - multiplier]
  );

  const getRandomMultiplier = () => {
    return (
      Math.floor(Math.random() * 1.5) * (Math.round(Math.random()) ? 1 : -1)
    );
  };

  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.traverse((child) => {
        if (child.isMesh) {
            const originalColor = child.material.color.clone();
            child.material = child.material.clone();
            child.material.color.set(isDarkTheme ? darkColor : lightColor);
            child.userData.originalColor = originalColor;
        }
      });
    }
    return () => {
        if (meshRef.current) {
            meshRef.current.traverse((child) => {
                if (child.isMesh && child.userData.originalColor) {
                    child.material.color.set(child.userData.originalColor);
                }
            });
        }
    }
  }, [isDarkTheme, darkColor, lightColor]);

  return (
    <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.group
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        rotation-y={rotationX}
        rotation-x={rotationY}
        position-x={positionX}
        position-y={positionY}
        animate={{
          rotateZ: isActive ? rotation.z + getRandomMultiplier() : rotation.z,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 80, mass: 2 }}
      >
        {children && children.length > 0 ? (
          children.map((child, i) => (
            <primitive object={child.clone(true)} key={i} />
          ))
        ) : (
          <mesh geometry={geometry} material={material} />
        )}
      </motion.group>
    </Float>
  );
}
*/