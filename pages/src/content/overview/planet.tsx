// @ts-nocheck
import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  useRef,
} from 'react';
import * as THREE from 'three';
import {
  Box,
  Button,
  Container,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Text, meshBounds } from '@react-three/drei';
import { useSpring, config } from 'react-spring';
// We take the "a" element from /three here because we want to animate threejs objects
import { a, animated } from '@react-spring/three';

const texture = new THREE.TextureLoader().load(
  '/static/images/textures/jupiter.jpg',
);
export function Sun({
  inst,
  size,
  toggle,
  set,
  dialogue,
  setDialogue,
  bottomRef,
  sidebar,
  setSidebar,
}) {
  const planetRef = useRef();
  useFrame(() => {
    // @ts-ignore
    planetRef.current.rotation.y += 0.005;
  });
  const [{ x }] = useSpring(
    {
      x: toggle,
      config: { mass: 5, tension: 10, friction: 10, precision: 0.0001 },
    },
    [toggle],
  );
  const [hovered, setHover] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'),
    [hovered],
  );
  // Events
  const onClick = useCallback(() => {
    if (inst === 0) {
      set((toggle) => Number(!toggle));
      setDialogue((dialogue) => Number(dialogue + 1));
      setTimeout(() => {
        setSidebar(sidebar === 1 ? 0 : 1);
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    }
  }, []);
  const onPointerOver = useCallback(() => setHover(true), []);
  const onPointerOut = useCallback(() => setHover(false), []);
  // Interpolations
  const pY = x.to([0, 1], [1, 1]);
  const rX = x.to([0, 1], [0, 1.5]); // Math.PI * 0.3]);
  const color = x.to([0, 1], ['#FF9833', '#FFA54D']);

  // ?planetRef.current.rotation.x -= 0.1;

  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null} position={[0, 0, 0]}>
      <a.directionalLight position={[30, 30, 30]} intensity={2} color={color} />
      <a.pointLight
        position={[0, 0, 0]}
        distance={0}
        intensity={toggle === 0 ? 8 : 15}
        color={color}
      />
      <a.group>
        <a.mesh
          ref={planetRef}
          receiveShadow
          castShadow
          raycast={meshBounds}
          rotation-y={rX}
          onClick={onClick}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <a.meshStandardMaterial roughness={0.5} map={texture} />
        </a.mesh>
      </a.group>
    </group>
  );
}
