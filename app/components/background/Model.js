import React, { useEffect, useState, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";

// Main component to orchestrate the 3D model scene
export default function Model({ motionValues, currentTheme }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  // Computes scale factor based on window size
  const computeScale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 768) return Math.min(w, h) / 850;
    if (w < 1280) return Math.min(w, h) / 1000;
    return Math.min(w, h) / 900;
  };

  // Handles window resize to adjust model scale
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

  // Switches the active shape every 3 seconds
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

  // Pauses animation when tab is not visible
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
      // Global rotation driven by device tilt
      rotation-y={motionValues.tilt.x} // gamma
      rotation-x={motionValues.tilt.y} // beta
      // Initial animation
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
      scale={scaleFactor}
    >
      {/* Map through all nodes from the GLB file and render a Mesh component */}
      {Object.values(nodes).filter(node => node.isMesh).map((node, index) => (
         <Mesh
            key={node.uuid}
            node={node}
            multiplier={2} // This could be randomized or based on index
            mouse={motionValues.touch} // Pass touch/mouse controls for parallax effect
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

// Component for a single 3D mesh with its own animations
function Mesh({ node, multiplier, mouse, isActive, isDarkTheme, lightColor, darkColor }) {
  const { geometry, position, scale, rotation } = node;
  const a = multiplier / 2;

  // Parallax effect based on touch/mouse position
  const rotationX = useTransform(mouse.y, [0, 1], [rotation.y - a / 4, rotation.y + a / 4]);
  const rotationY = useTransform(mouse.x, [0, 1], [rotation.x - a / 4, rotation.x + a / 4]);
  const positionX = useTransform(mouse.x, [0, 1], [position.x - multiplier, position.x + multiplier]);
  const positionY = useTransform(mouse.y, [0, 1], [position.y + multiplier, position.y - multiplier]);

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
        scale={scale}
        // Apply parallax rotations and positions
        rotation-x={rotationX}
        rotation-y={rotationY}
        position-x={positionX}
        position-y={positionY}
        // Animate Z rotation when active
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
