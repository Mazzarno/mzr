"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTransform, MotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";

interface ModelProps {
  mouse: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  currentTheme: string | undefined;
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  onShapesReady?: () => void;
}

interface MeshData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;
  multiplier: number;
  initialPosition: { x: number; y: number; z: number };
  delay: number;
}

interface MeshProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;
  multiplier: number;
  mouse: ModelProps["mouse"];
  isActive: boolean;
  material: THREE.MeshStandardMaterial;
  initialPosition: { x: number; y: number; z: number };
  delay: number;
  scrollProgress: MotionValue<number>;
  floatConfig: {
    speed: number;
    rotationIntensity: number;
    floatIntensity: number;
  };
  randomOffset: number;
}

const LIGHT_THEME_COLOR = "#FFFFFF";
const DARK_THEME_COLOR = "#212529";

function Model({
  mouse,
  currentTheme,
  scrollProgress,
  isMobile,
  onShapesReady,
}: ModelProps) {
  const [scaleFactor, setScaleFactor] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupRef = useRef<any>(null);

  const computeScale = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (w < 768) {
      return Math.min(w, h) / 850;
    } else if (w < 1280) {
      return Math.min(w, h) / 1000;
    } else {
      return Math.min(w, h) / 900;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(computeScale());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeScale]);

  const [activeShape, setActiveShape] = useState(1);
  const isDarkTheme = currentTheme === "dark";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(true);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/3d/shapes.glb") as any;

  const meshes: MeshData[] = useMemo(
    () => [
      { node: nodes.Sphere001, multiplier: 2.4, initialPosition: { x: 0, y: 15, z: 0 }, delay: 0 },
      { node: nodes.Sphere002, multiplier: 2.4, initialPosition: { x: 5, y: -10, z: 2 }, delay: 0.1 },
      { node: nodes.Cylinder002, multiplier: 1.2, initialPosition: { x: -5, y: -8, z: -2 }, delay: 0.2 },
      { node: nodes.Sphere003, multiplier: 1, initialPosition: { x: 10, y: 5, z: -5 }, delay: 0.3 },
      { node: nodes.Cylinder003, multiplier: 1.8, initialPosition: { x: -10, y: 8, z: 5 }, delay: 0.4 },
      { node: nodes.Cylinder005, multiplier: 1.8, initialPosition: { x: 8, y: -12, z: 3 }, delay: 0.5 },
      { node: nodes.Cube002, multiplier: 2, initialPosition: { x: -8, y: 12, z: -3 }, delay: 0.6 },
      { node: nodes.Cylinder006, multiplier: 1.2, initialPosition: { x: 4, y: 10, z: 4 }, delay: 0.7 },
      { node: nodes.Cylinder007, multiplier: 1.6, initialPosition: { x: -4, y: -10, z: -4 }, delay: 0.8 },
      { node: nodes.Cylinder009, multiplier: 1.8, initialPosition: { x: 12, y: 0, z: 0 }, delay: 0.9 },
      { node: nodes.Sphere, multiplier: 1.5, initialPosition: { x: -12, y: 0, z: 0 }, delay: 1.0 },
    ],
    [nodes]
  );

  // Appeler onShapesReady après la dernière animation (1.0s delay + 1s duration = 2s)
  useEffect(() => {
    if (onShapesReady) {
      const timer = setTimeout(onShapesReady, 2000);
      return () => clearTimeout(timer);
    }
  }, [onShapesReady]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDarkTheme ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
      roughness: 0.6,
      metalness: 0.1,
      flatShading: true,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Target color for smooth transition
  const targetColor = useMemo(
    () => new THREE.Color(isDarkTheme ? DARK_THEME_COLOR : LIGHT_THEME_COLOR),
    [isDarkTheme]
  );

  // Animate material color on theme change
  useFrame(() => {
    if (material.color && !material.color.equals(targetColor)) {
      material.color.lerp(targetColor, 0.05);
    }
  });

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  const floatConfig = useMemo(() => {
    if (isMobile) {
      return { speed: 0.4, rotationIntensity: 0.4, floatIntensity: 0.4 };
    }
    return { speed: 0.5, rotationIntensity: 0.5, floatIntensity: 0.5 };
  }, [isMobile]);

  const randomOffsets = useMemo(
    () => meshes.map(() => Math.random() * Math.PI * 2),
    [meshes]
  );

  const scrollRotation = useTransform(scrollProgress, [0, 1], [0, Math.PI * 0.5]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollRotation.get();
    }
  });

  return (
    <motion.group ref={groupRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      {meshes.map((meshData, index) => (
        <MemoizedMesh
          key={index}
          node={meshData.node}
          multiplier={meshData.multiplier}
          mouse={mouse}
          isActive={activeShape === index + 1}
          material={material}
          initialPosition={meshData.initialPosition}
          delay={meshData.delay}
          scrollProgress={scrollProgress}
          floatConfig={floatConfig}
          randomOffset={randomOffsets[index]}
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
  material,
  initialPosition,
  delay,
  scrollProgress,
  floatConfig,
  randomOffset,
}: MeshProps) {
  const { geometry, position, scale, rotation } = node;
  const a = multiplier / 2;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshRef = useRef<any>(null);

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

  const scrollZ = useTransform(
    scrollProgress,
    [0, 1],
    [0, multiplier * 2 * Math.sin(randomOffset)]
  );

  const cachedRandomMultiplier = useMemo(() => {
    return Math.floor(Math.random() * 1.5) * (Math.round(Math.random()) ? 1 : -1);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z = position.z + scrollZ.get();
    }
  });

  return (
    <motion.group
      initial={{ ...initialPosition, scale: 0 }}
      animate={{ x: 0, y: 0, z: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: "easeInOut" }}
    >
      <Float
        speed={floatConfig.speed}
        rotationIntensity={floatConfig.rotationIntensity}
        floatIntensity={floatConfig.floatIntensity}
      >
        <motion.mesh
          ref={meshRef}
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
          material={material}
          animate={{
            rotateZ: isActive ? rotation.z + cachedRandomMultiplier : rotation.z,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 80, mass: 2 }}
        />
      </Float>
    </motion.group>
  );
}

const MemoizedMesh = memo(Mesh, (prevProps, nextProps) => {
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.material === nextProps.material &&
    prevProps.floatConfig === nextProps.floatConfig
  );
});

export default memo(Model);
