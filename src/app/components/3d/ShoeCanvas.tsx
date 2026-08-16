"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html, useProgress, Sparkles as AtmosphereParticles } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Sparkles } from "lucide-react";
import ShoeModel from "./ShoeModel";

// Premium Bespoke Spinner Override
function AtelierLoader() {
  const { progress } = useProgress();
  
  return (
    <Html center zIndexRange={[100, 0]}>
      <div className="flex flex-col items-center justify-center space-y-5 bg-transparent pointer-events-none select-none">
        
        {/* Luxury Spinning Ring & Pulsing Icon */}
        <div className="relative flex items-center justify-center w-14 h-14">
          <div 
            className="absolute inset-0 rounded-full border border-accent-gold/20 border-t-accent-gold animate-spin" 
            style={{ animationDuration: '2s' }} 
          />
          <div 
            className="absolute inset-1.5 rounded-full border border-accent-bronze/10 border-b-accent-bronze animate-spin" 
            style={{ animationDuration: '3s', animationDirection: 'reverse' }} 
          />
          <Sparkles className="w-4 h-4 text-accent-gold animate-pulse" />
        </div>
        
        {/* Elegant Typography */}
        <div className="flex flex-col items-center space-y-1.5 whitespace-nowrap">
          <div className="text-accent-gold text-[9px] uppercase tracking-[0.3em] font-mono">
            Preparing Atelier Stage
          </div>
          <div className="text-neutral-500 text-[10px] font-mono tracking-widest">
            {progress.toFixed(0)}%
          </div>
        </div>
        
      </div>
    </Html>
  );
}

function SmoothResetControls() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isInteracting = useRef(false);
  
  // Locked safe distance
  const targetCamPos = useRef(new THREE.Vector3(0, 0.5, 4.0)); 
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!isInteracting.current && controlsRef.current) {
      state.camera.position.lerp(targetCamPos.current, delta * 3);
      controlsRef.current.target.lerp(targetLookAt.current, delta * 3);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      minPolarAngle={Math.PI / 3.5}
      maxPolarAngle={Math.PI / 2.05}
      onStart={() => {
        isInteracting.current = true;
      }}
      onEnd={() => {
        isInteracting.current = false;
      }}
    />
  );
}

export default function ShoeCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, 2]} 
        camera={{ position: [0, 0.5, 4.0], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[6, 10, 6]} intensity={2.8} />
        <directionalLight position={[-6, 6, -4]} intensity={1.5} color="#ebd0b0" />
        <directionalLight position={[0, 4, 6]} intensity={1.0} />
        <pointLight position={[0, -2, 2]} intensity={0.6} />

        <Suspense fallback={<AtelierLoader />}>
          {/* Subtle floating dust particles for atmosphere */}
          <AtmosphereParticles 
            count={60} 
            scale={10} 
            size={1.2} 
            speed={0.15} 
            opacity={0.25} 
            color="#ebd0b0" 
          />
          
          <ShoeModel />
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.5}
            scale={8}
            blur={2.4}
            far={3}
          />
        </Suspense>

        <SmoothResetControls />
      </Canvas>
    </div>
  );
}