import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes';

export function Iphone(props) {
  const { nodes } = useGLTF('/medias/iphone.glb');
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

  return (
    <group {...props} dispose={null} scale={scale}>
      <group name="Scene">
        <mesh
          name="Frame"
          castShadow
          receiveShadow
          geometry={nodes.Frame.geometry}
        >
          <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} />
        </mesh>
        <mesh
          name="Screen"
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
        >
          <meshStandardMaterial />
        </mesh>
        <mesh
          name="Logo"
          castShadow
          receiveShadow
          geometry={nodes.Logo.geometry}
        >
          <meshStandardMaterial color={isDarkTheme ? darkColor : lightColor} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/medias/iphone.glb')
