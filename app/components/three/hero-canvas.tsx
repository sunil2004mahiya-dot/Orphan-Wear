"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { AmbientLight, DirectionalLight, PointLight } from "@/app/components/three/elements";
import { Garment } from "@/app/components/three/garment";
import { Lightformers } from "@/app/components/three/lightformers";

/** White key light that follows the cursor across the garment (the magnet). */
function CursorLight() {
  const light = useRef<THREE.PointLight>(null);
  const { pointer, viewport } = useThree();
  useFrame((_, dt) => {
    const l = light.current;
    if (!l) return;
    const k = 1 - Math.exp(-dt * 6);
    l.position.x += (pointer.x * viewport.width * 0.5 - l.position.x) * k;
    l.position.y += (pointer.y * viewport.height * 0.5 - l.position.y) * k;
  });
  return <PointLight ref={light} color="#ffffff" intensity={18} distance={7} decay={2} position={[0, 0, 2.2]} />;
}

export default function HeroCanvas({
  url,
  progress,
}: {
  url: string;
  progress: { current: number };
}) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 32 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <AmbientLight intensity={0.4} />
        <DirectionalLight position={[-3, 4, 4]} intensity={2.2} color="#f1efe8" />
        <DirectionalLight position={[4, -2, -3]} intensity={0.8} color="#9fb7ff" />
        <CursorLight />
        <Suspense fallback={null}>
          <Environment
            background={false}
            environmentIntensity={0.9}
            frames={1}
            resolution={128}
          >
            <Lightformers />
          </Environment>
          <Garment url={url} progress={progress} scale={1} spin={0.18} magnet={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}