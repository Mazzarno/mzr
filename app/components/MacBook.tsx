import React, { useState, useRef, useLayoutEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei';
import { useTheme } from 'next-themes';

interface MacBookProps {
  rotation?: [number, number, number];
  [key: string]: unknown;
}

export function MacBook({ rotation = [0, 0, 0], ...props }: MacBookProps) {
  const { nodes, materials } = useGLTF('medias/macbook.glb') as {
    nodes: any,
    materials: any
  }
  const { viewport } = useThree();
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDarkTheme = currentTheme === 'dark';
  const lightColor = '#FFFFFF';
  const darkColor = '#212529';

  // Responsive scale based on viewport width
  const getResponsiveScale = () => {
    const w = viewport.width;
    if (w < 6) return w / 8;
    if (w < 10) return w / 10;
    return w / 12;
  };
  const scale = [getResponsiveScale(), getResponsiveScale(), getResponsiveScale()];

  const screenRef = useRef<THREE.Mesh>(null)

  const [screenBounds, setScreenBounds] = useState({
    width: 0,
    height: 0,
    center: new THREE.Vector3()
  })

  useLayoutEffect(() => {
    if (screenRef.current) {
      const mesh = screenRef.current
      mesh.geometry.computeBoundingBox()
      const box = mesh.geometry.boundingBox

      if (box) {
        const width = box.max.x - box.min.x
        const height = box.max.y - box.min.y
        const center = new THREE.Vector3()
        box.getCenter(center)
        const scaleFactor = viewport.factor * 10
        setScreenBounds({
          width: width * scaleFactor,
          height: height * scaleFactor,
          center
        })
      }
    }
  }, [screenRef, viewport])

  return (
    <group {...props} rotation={rotation} dispose={null} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group name="Scene" rotation={[0.1, -0.1, 0]}>
        <mesh
          name="Keyboard"
          castShadow
          receiveShadow
          geometry={nodes.Keyboard.geometry}
        >
          <meshStandardMaterial />
          <mesh
            name="Body"
            castShadow
            receiveShadow
            geometry={nodes.Body.geometry}
          >
            <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} roughness={0.6} metalness={0.9} />
          </mesh>
          <mesh
            name="Touchbar"
            castShadow
            receiveShadow
            geometry={nodes.Touchbar.geometry}
          >
            <meshStandardMaterial />
          </mesh>
        </mesh>

        <mesh
          name="Frame"
          castShadow
          receiveShadow
          geometry={nodes.Frame.geometry}
          position={[0, -0.615, 0.05]}
        >
          <meshStandardMaterial  roughness={0.6} metalness={0.9} color={isDarkTheme ? darkColor : lightColor} />

          <mesh
            name="Logo"
            castShadow
            receiveShadow
            geometry={nodes.Logo.geometry}
            material={materials.Logo}
            position={[0, 0.615, -0.05]}
          />

          <mesh
            name="Screen"
            ref={screenRef}
            castShadow
            receiveShadow
            geometry={nodes.Screen.geometry}
            position={[0, 0.753, 0.163]}
          >
            <meshStandardMaterial  roughness={0.6} metalness={0.9} />

            {screenBounds.width > 0 && (
              <Html
                transform
                occlude
                position={[
                  screenBounds.center.x + 1.38,
                  screenBounds.center.y - 0.75,
                  screenBounds.center.z  + 0.01
                ]}
                style={{
                  width: `${screenBounds.width}px`,
                  height: `${screenBounds.height}px`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto' ,
                  zIndex: 1
                }}
                distanceFactor={.94}
  
              >
                <iframe
                  src="https://alexis-germain.fr/"
                  title="alexis-germain.fr"
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'default',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />  
              </Html>
            )}
          </mesh>
        </mesh>
      </group>
      </Float>
    </group>
  )
}

useGLTF.preload('medias/macbook.glb')
