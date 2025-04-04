import React, { useEffect, useState, useRef } from "react";
import { useGLTF, Float, } from "@react-three/drei";
import { useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

export default function Model({mouse, currentTheme}) {
    const [activeShape, setActiveShape] = useState(1);
    const isDarkTheme = currentTheme === 'dark';
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
          setActiveShape(prev => prev === 11 ? 1 : prev + 1);
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
        isVisibleRef.current = document.visibilityState === 'visible';
      };
  
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
    const { nodes } = useGLTF('/medias/gun.glb')
    return (
        <motion.group              
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: -50 }}
        transition={{
          delay: 3,
          duration: 1.5, 
          ease: [0.215, 0.61, 0.355, 1],
        }}>
        <Mesh
          node={nodes.gun_left}
          multiplier={3} mouse={mouse} isActive={activeShape == 11} isDarkTheme={isDarkTheme} lightColor={lightThemeColor} darkColor={darkThemeColor}
        />
        <Mesh
          node={nodes.gun_right}
          multiplier={1.5} mouse={mouse} isActive={activeShape == 11} isDarkTheme={isDarkTheme} lightColor={lightThemeColor} darkColor={darkThemeColor}
        />
      </motion.group>
    )
  }
  
  useGLTF.preload('/medias/gun.glb')


function Mesh({node, multiplier, mouse, isActive, isDarkTheme, lightColor, darkColor}) {
  const { geometry, position,  rotation } = node;
  const a = multiplier / 2;
  
  const rotationX = useTransform(mouse.x, [0,1], [rotation.x - a/2, rotation.x + a/2]);
  const rotationY = useTransform(mouse.y, [0,1], [rotation.y - a/2, rotation.y + a/2]);
  const positionX = useTransform(mouse.x, [0,1], [position.x - multiplier, position.x + multiplier]);
  const positionY = useTransform(mouse.y, [0,1], [position.y + multiplier, position.y - multiplier]);

  const getRandomMultiplier = () => {
    return Math.floor(Math.random() * 1.5) * (Math.round(Math.random()) ? 1 : -1);
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.mesh
        castShadow={false} 
        receiveShadow={false}
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={0.1}
        rotation-y={rotationX}
        rotation-x={rotationY}
        position-x={positionX}
        position-y={positionY}
        animate={{rotateZ: isActive ? rotation.z + getRandomMultiplier() : null}}
        transition={{type: "spring", stiffness: 50, damping: 80, mass: 2}} 
      >
        <meshStandardMaterial 
          color={isDarkTheme ? darkColor : lightColor} 
          roughness={0.6} 
          metalness={0.1}
          flatShading={true} 
        />
      </motion.mesh>
    </Float>
  )
}
