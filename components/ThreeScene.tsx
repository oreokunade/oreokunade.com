import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.cos(time / 4) * 0.2;
      mesh.current.rotation.y = Math.sin(time / 4) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[1, 128, 128]} scale={1.8}>
        <MeshDistortMaterial
          color="#171717"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

const ThreeScene = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <FloatingSphere />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute inset-0 bg-neutral-50/80 dark:bg-neutral-950/90 -z-20" />
      <div className="absolute inset-0 noise-bg opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10" />
    </div>
  );
};

export default ThreeScene;
