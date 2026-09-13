"use client";
import { useMemo } from "react";
import * as THREE from "three";

import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from "@/app/components/three/elements";

const PANELS: Array<{
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
  rot?: [number, number, number];
}> = [
  { pos: [0, 2.2, -2.8], size: [6, 2.6, 0.08], color: "#ffffff" },
  { pos: [-4, 0.6, 2], size: [0.08, 2.8, 7], color: "#ffffff" },
  { pos: [4, 0.2, 2], size: [0.08, 3, 7], color: "#cfe0ff" },
  { pos: [0, -2.6, -1], size: [5, 0.08, 4], color: "#ffffff" },
];

/**
 * Lightformers: a few emissive panels that only exist in the environment map.
 * They give the garment soft studio reflections WITHOUT the visible box
 * backdrop of an Environment preset (the user reported a white box around
 * the tee). No background is rendered, so the canvas stays transparent.
 */
export function Lightformers() {
  const materials = useMemo(
    () =>
      PANELS.map(
        (p) =>
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(p.color),
            toneMapped: false,
          }),
        [],
      ),
    [],
  );
  return (
    <Group>
      {PANELS.map((p, i) => (
        <Mesh key={i} material={materials[i]} position={p.pos} rotation={p.rot}>
          <BoxGeometry args={p.size} />
        </Mesh>
      ))}
      {/* inside-out sphere: a soft blending dome instead of a flat backdrop */}
      <Mesh>
        <SphereGeometry args={[18, 16, 12]} />
        <MeshBasicMaterial
          color="#0f0f0f"
          side={THREE.BackSide}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </Mesh>
    </Group>
  );
}