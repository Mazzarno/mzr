import React, { useEffect, useState, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";

import { motion } from "framer-motion-3d";

export default function Model({ motionValues, currentTheme }) {
  const [scaleFactor, setScaleFactor] = useState(1);
  const computeScale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 768) return Math.min(w, h) / 850;
    if (w < 1280) return Math.min(w, h) / 1000;
    return Math.min(w, h) / 900;
  };

  useEffect(() => {
    const handleResize = () => setScaleFactor(computeScale());
    handleResize();
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
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => {
      if (isVisibleRef.current) {
        setActiveShape((prev) => (prev === 11 ? 1 : prev + 1));
      }
    }, 3000);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [activeShape]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const { nodes } = useGLTF("/medias/shapes.glb");

  return (
    <motion.group
      rotation-y={motionValues.tilt.x}
      rotation-x={motionValues.tilt.y}
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
      scale={scaleFactor}
    >
      {Object.values(nodes).filter(node => node.isMesh).map((node, index) => (
         <Mesh
            key={node.uuid}
            node={node}
            isActive={activeShape === index + 1}
            isDarkTheme={isDarkTheme}
            lightColor={lightThemeColor}
            darkColor={darkThemeColor}
        />
      ))}
    </motion.group>
  );
}

useGLTF.preload("/medias/shapes.glb");

function Mesh({ node, isActive, isDarkTheme, lightColor, darkColor }) {
  const { geometry, position, scale, rotation } = node;

  const getRandomMultiplier = () => {
    return Math.floor(Math.random() * 1.5) * (Math.round(Math.random()) ? 1 : -1);
  };

  return (
    <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.mesh
        castShadow={false}
        receiveShadow={false}
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        animate={{
          rotateZ: isActive ? rotation.z + getRandomMultiplier() : rotation.z,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 80, mass: 2 }}
      >
        <meshStandardMaterial
          color={isDarkTheme ? darkColor : lightColor}
          roughness={0.6}
          metalness={0.1}
          flatShading={true}
        />
      </motion.mesh>
    </Float>
  );
}
