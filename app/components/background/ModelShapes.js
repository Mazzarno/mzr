import React, { useEffect, useState, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";

export default function Model({ mouse, currentTheme }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  const computeScale = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (w < 768) {
      return Math.min(w, h) / 850;
    } else if (w < 1280) {
      return Math.min(w, h) / 1000;
    } else {
      return Math.min(w, h) / 900;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(computeScale());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        setActiveShape((prev) => (prev === 11 ? 1 : prev + 1));
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

  const { nodes } = useGLTF("/3d/shapes.glb");

  const meshes = [
    { node: nodes.Sphere001, multiplier: 2.4, initialPosition: { x: 0, y: 15, z: 0 }, delay: 0.50 },
    { node: nodes.Sphere002, multiplier: 2.4, initialPosition: { x: 5, y: -10, z: 2 }, delay: 0.55 },
    { node: nodes.Cylinder002, multiplier: 1.2, initialPosition: { x: -5, y: -8, z: -2 }, delay: 0.60 },
    { node: nodes.Sphere003, multiplier: 1, initialPosition: { x: 10, y: 5, z: -5 }, delay: 0.65 },
    { node: nodes.Cylinder003, multiplier: 1.8, initialPosition: { x: -10, y: 8, z: 5 }, delay: 0.70 },
    { node: nodes.Cylinder005, multiplier: 1.8, initialPosition: { x: 8, y: -12, z: 3 }, delay: 0.75 },
    { node: nodes.Cube002, multiplier: 2, initialPosition: { x: -8, y: 12, z: -3 }, delay: 0.80 },
    { node: nodes.Cylinder006, multiplier: 1.2, initialPosition: { x: 4, y: 10, z: 4 }, delay: 0.85 },
    { node: nodes.Cylinder007, multiplier: 1.6, initialPosition: { x: -4, y: -10, z: -4 }, delay: 0.90 },
    { node: nodes.Cylinder009, multiplier: 1.8, initialPosition: { x: 12, y: 0, z: 0 }, delay: 0.95 },
    { node: nodes.Sphere, multiplier: 1.5, initialPosition: { x: -12, y: 0, z: 0 }, delay: 1.00 },
  ];

  return (
    <motion.group scale={[scaleFactor, scaleFactor, scaleFactor]}>
       {meshes.map((meshData, index) => (
        <Mesh
          key={index}
          node={meshData.node}
          multiplier={meshData.multiplier}
          mouse={mouse}
          isActive={activeShape === index + 1}
          isDarkTheme={isDarkTheme}
          lightColor={lightThemeColor}
          darkColor={darkThemeColor}
          initialPosition={meshData.initialPosition}
          delay={meshData.delay}
        />
      ))}
    </motion.group>
  );
}

useGLTF.preload("/3d/shapes.glb");

function Mesh({
  node,
  multiplier,
  mouse,
  isActive,
  isDarkTheme,
  lightColor,
  darkColor,
  initialPosition,
  delay,
}) {
  const { geometry, position, scale, rotation } = node;
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

  return (
    <motion.group
      initial={{ ...initialPosition, scale: 0 }}
      animate={{ x: 0, y: 0, z: 0, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    >
      <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <motion.mesh
          castShadow={false}
          receiveShadow={false}
          geometry={geometry}
          position={position}
          rotation={rotation}
          scale={scale}
          rotation-y={rotationX}
          rotation-x={rotationY}
          position-x={positionX}
          position-y={positionY}
          animate={{
            rotateZ: isActive ? rotation.z + getRandomMultiplier() : null,
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
    </motion.group>
  );
}
