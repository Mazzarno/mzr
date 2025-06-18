import React, { useRef, useLayoutEffect, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export function Iphone(props) {
  const { nodes } = useGLTF('/medias/iphone.glb');
  const { viewport, size } = useThree();
  const { theme, resolvedTheme } = useTheme();
  const responsiveFactor = size.width / 1920;
  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDarkTheme = currentTheme === 'dark';
  const lightColor = '#FFFFFF';
  const darkColor = '#212529';
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
    <group {...props} dispose={null} scale={scale}>
      <group name="Scene">
        <mesh
          name="Frame"
          castShadow
          receiveShadow
          geometry={nodes.Frame.geometry}
        >
          <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} roughness={0.6} metalness={0.9} />
        </mesh>
        <mesh
          name="Screen"
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
          ref={screenRef} 
        >
         <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} />

    
        {screenBounds.width > 0 && (
          <Html
            transform
            occlude
            position={[
              screenBounds.center.x + (props.screenOffsetX || 0),
              screenBounds.center.y + (0.6 * responsiveFactor) + (props.screenOffsetY || 0),
              screenBounds.center.z + 0.02 + (props.screenOffsetZ || 0)
            ]}
            style={{
              width: `${screenBounds.width * 0.912}px`,
              height: `${screenBounds.height * 0.915}px`,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
              overflow: 'hidden',
              borderRadius: '80px',
              aspectRatio: '9/19.5',
            }}
            distanceFactor={1}
            zIndexRange={[0, 1000]}
          >
            <iframe
              src="https://alexis-germain.fr/"
              title="alexis-germain.fr"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-popups"
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </Html>
        )}
      
        </mesh>
        <mesh
          name="Logo"
          castShadow
          receiveShadow
          geometry={nodes.Logo.geometry}
        >
          <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} roughness={0.6} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/medias/iphone.glb')
