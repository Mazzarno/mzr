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
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

interface ModelProps {
  mouse: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  currentTheme: string | undefined;
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  isReducedMotion?: boolean;
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
  isReducedMotion: boolean;
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
const LIGHT_THEME_OPACITY = 1;
const DARK_THEME_OPACITY = 1;
const INTRO_DURATION_SECONDS = 1;
const GROUP_ROTATION_MAX = Math.PI * 0.5;
const GROUP_ROTATION_DAMPING = 7;
const COLOR_DAMPING = 6;
const POSITION_DAMPING = 10;
const ROTATION_DAMPING = 10;
const ACTIVE_ROTATION_DAMPING = 7;

function Model({
  mouse,
  currentTheme,
  scrollProgress,
  isMobile,
  isReducedMotion = false,
  onShapesReady,
}: ModelProps) {
  const reducedMotion = Boolean(isReducedMotion);
  const [scaleFactor, setScaleFactor] = useState(1);
  const groupRef = useRef<THREE.Group>(null);

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
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (reducedMotion) {
      setActiveShape(1);
      return;
    }
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
  }, [activeShape, reducedMotion]);

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
      transparent: true,
      opacity: isDarkTheme ? DARK_THEME_OPACITY : LIGHT_THEME_OPACITY,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Target color for smooth transition
  const targetColor = useMemo(
    () => new THREE.Color(isDarkTheme ? DARK_THEME_COLOR : LIGHT_THEME_COLOR),
    [isDarkTheme]
  );

  useEffect(() => {
    material.opacity = isDarkTheme ? DARK_THEME_OPACITY : LIGHT_THEME_OPACITY;
    material.transparent = true;
    material.needsUpdate = true;
  }, [isDarkTheme, material]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  const floatConfig = useMemo(() => {
    if (reducedMotion) {
      return { speed: 0, rotationIntensity: 0, floatIntensity: 0 };
    }
    if (isMobile) {
      return { speed: 0.4, rotationIntensity: 0.4, floatIntensity: 0.4 };
    }
    return { speed: 0.5, rotationIntensity: 0.5, floatIntensity: 0.5 };
  }, [isMobile, reducedMotion]);

  const randomOffsets = useMemo(
    () => meshes.map(() => Math.random() * Math.PI * 2),
    [meshes]
  );

  useFrame((_, delta) => {
    const colorAlpha = 1 - Math.exp(-COLOR_DAMPING * delta);
    material.color.lerp(targetColor, colorAlpha);

    if (groupRef.current) {
      const targetRotationY = reducedMotion
        ? 0
        : THREE.MathUtils.clamp(scrollProgress.get(), 0, 1) * GROUP_ROTATION_MAX;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotationY,
        GROUP_ROTATION_DAMPING,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      {meshes.map((meshData, index) => (
        <MemoizedMesh
          key={index}
          node={meshData.node}
          multiplier={meshData.multiplier}
          mouse={mouse}
          isActive={activeShape === index + 1}
          isReducedMotion={reducedMotion}
          material={material}
          initialPosition={meshData.initialPosition}
          delay={meshData.delay}
          scrollProgress={scrollProgress}
          floatConfig={floatConfig}
          randomOffset={randomOffsets[index]}
        />
      ))}
    </group>
  );
}

useGLTF.preload("/3d/shapes.glb");

function Mesh({
  node,
  multiplier,
  mouse,
  isActive,
  isReducedMotion,
  material,
  initialPosition,
  delay,
  scrollProgress,
  floatConfig,
  randomOffset,
}: MeshProps) {
  const { geometry, position, scale, rotation } = node;
  const entryGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const introElapsedRef = useRef(0);
  const introDoneRef = useRef(Boolean(isReducedMotion));
  const rotationSpread = multiplier / 4;
  const scrollAmplitude = multiplier * 2 * Math.sin(randomOffset);
  const initialGroupPosition: [number, number, number] = isReducedMotion
    ? [0, 0, 0]
    : [initialPosition.x, initialPosition.y, initialPosition.z];
  const initialGroupScale = isReducedMotion ? 1 : 0;

  const cachedRandomMultiplier = useMemo(() => {
    return Math.floor(Math.random() * 1.5) * (Math.round(Math.random()) ? 1 : -1);
  }, []);

  useEffect(() => {
    const group = entryGroupRef.current;
    if (!group) {
      return;
    }

    introElapsedRef.current = 0;
    introDoneRef.current = Boolean(isReducedMotion);

    if (isReducedMotion) {
      group.position.set(0, 0, 0);
      group.scale.setScalar(1);
      return;
    }

    group.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    group.scale.setScalar(0);
  }, [initialPosition, isReducedMotion]);

  useFrame((_, delta) => {
    const group = entryGroupRef.current;
    const mesh = meshRef.current;

    if (!group || !mesh) {
      return;
    }

    if (!introDoneRef.current) {
      introElapsedRef.current += delta;
      const introProgress = THREE.MathUtils.clamp(
        (introElapsedRef.current - delay) / INTRO_DURATION_SECONDS,
        0,
        1
      );
      const easedProgress = THREE.MathUtils.smootherstep(introProgress, 0, 1);

      group.position.set(
        THREE.MathUtils.lerp(initialPosition.x, 0, easedProgress),
        THREE.MathUtils.lerp(initialPosition.y, 0, easedProgress),
        THREE.MathUtils.lerp(initialPosition.z, 0, easedProgress)
      );
      group.scale.setScalar(easedProgress);

      if (introProgress >= 1) {
        introDoneRef.current = true;
      }
    }

    const mouseX = THREE.MathUtils.clamp(mouse.x.get(), 0, 1);
    const mouseY = THREE.MathUtils.clamp(mouse.y.get(), 0, 1);
    const scroll = THREE.MathUtils.clamp(scrollProgress.get(), 0, 1);

    const targetPositionX = THREE.MathUtils.lerp(
      position.x - multiplier,
      position.x + multiplier,
      mouseX
    );
    const targetPositionY = THREE.MathUtils.lerp(
      position.y + multiplier,
      position.y - multiplier,
      mouseY
    );
    const targetPositionZ = position.z + (isReducedMotion ? 0 : scroll * scrollAmplitude);

    mesh.position.x = THREE.MathUtils.damp(
      mesh.position.x,
      targetPositionX,
      POSITION_DAMPING,
      delta
    );
    mesh.position.y = THREE.MathUtils.damp(
      mesh.position.y,
      targetPositionY,
      POSITION_DAMPING,
      delta
    );
    mesh.position.z = THREE.MathUtils.damp(
      mesh.position.z,
      targetPositionZ,
      POSITION_DAMPING,
      delta
    );

    // Preserve the original axis mapping from the previous implementation.
    const targetRotationY = THREE.MathUtils.lerp(
      rotation.x - rotationSpread,
      rotation.x + rotationSpread,
      mouseX
    );
    const targetRotationX = THREE.MathUtils.lerp(
      rotation.y - rotationSpread,
      rotation.y + rotationSpread,
      mouseY
    );

    mesh.rotation.x = THREE.MathUtils.damp(
      mesh.rotation.x,
      targetRotationX,
      ROTATION_DAMPING,
      delta
    );
    mesh.rotation.y = THREE.MathUtils.damp(
      mesh.rotation.y,
      targetRotationY,
      ROTATION_DAMPING,
      delta
    );

    const targetRotationZ = isReducedMotion
      ? rotation.z
      : isActive
        ? rotation.z + cachedRandomMultiplier
        : rotation.z;

    mesh.rotation.z = THREE.MathUtils.damp(
      mesh.rotation.z,
      targetRotationZ,
      ACTIVE_ROTATION_DAMPING,
      delta
    );
  });

  return (
    <group ref={entryGroupRef} position={initialGroupPosition} scale={initialGroupScale}>
      <Float
        speed={floatConfig.speed}
        rotationIntensity={floatConfig.rotationIntensity}
        floatIntensity={floatConfig.floatIntensity}
      >
        <mesh
          ref={meshRef}
          castShadow={false}
          receiveShadow={false}
          geometry={geometry}
          position={position}
          rotation={rotation}
          scale={scale}
          material={material}
        />
      </Float>
    </group>
  );
}

const MemoizedMesh = memo(Mesh, (prevProps, nextProps) => {
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.isReducedMotion === nextProps.isReducedMotion &&
    prevProps.material === nextProps.material &&
    prevProps.floatConfig === nextProps.floatConfig
  );
});

export default memo(Model);
