'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const points = useRef();
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x += 0.0005;
      points.current.rotation.y += 0.0005;
    }
  });

  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={0xffffff}
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function ThreeJSBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}