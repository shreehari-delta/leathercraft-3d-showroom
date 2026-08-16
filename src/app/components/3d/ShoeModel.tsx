"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function ShoeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/shoe.glb");

  // Bulletproof normalization: forces ANY broken 3D model into the center of the screen
  const normalizedScene = useMemo(() => {
    const cloned = scene.clone();
    
    // 1. Find the true mathematical bounding box of the mesh
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // 2. Forcibly strip the offset and center the raw geometry
    cloned.position.x = -center.x;
    cloned.position.y = -center.y;
    cloned.position.z = -center.z;

    // 3. Create a wrapper group to apply the scale independently
    const wrapper = new THREE.Group();
    wrapper.add(cloned);

    // 4. Force the longest dimension of the shoe to be exactly 2.5 units wide
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2.5 / maxDim;
      wrapper.scale.setScalar(scale);
    }

    return wrapper;
  }, [scene]);

  // Gentle turntable rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive 
        object={normalizedScene} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </group>
  );
}

useGLTF.preload("/shoe.glb");