"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

import { AmbientLight, DirectionalLight } from "@/app/components/three/elements";
import { Garment } from "@/app/components/three/garment";
import { Lightformers } from "@/app/components/three/lightformers";

/** Small floating 3D viewer for a product card; tilts toward the cursor on hover. */
export default function ProductCanvas({ url }: { url: string }) {
  const hover = useRef(0.25);
  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onPointerEnter={() => {
        hover.current = 1;
      }}
      onPointerLeave={() => {
        hover.current = 0.25;
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <AmbientLight intensity={0.45} />
        <DirectionalLight position={[-3, 4, 4]} intensity={2} color="#f1efe8" />
        <DirectionalLight position={[4, -2, -3]} intensity={0.7} color="#9fb7ff" />
        <Suspense fallback={null}>
          <Environment
            background={false}
            environmentIntensity={1.15}
            frames={1}
            resolution={128}
          >
            <Lightformers />
          </Environment>
          <Garment url={url} hover={hover} scale={0.62} spin={0.25} magnet={0.6} floatAmp={0.04} />
        </Suspense>
      </Canvas>
    </div>
  );
}