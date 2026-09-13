"use client";

import { useMemo } from "react";
import * as THREE from "three";

import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from "./elements";

const PANELS: Array<{
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
  intensity: number;
}> = [
  { pos: [0, 2.4, -2.9], size: [7, 2.8, 0.08], color: "#ffffff", intensity: 3 },
  { pos: [-4.2, 0.8, 1.8], size: [0.08, 3, 8], color: "#ffffff", intensity: 1.6 },
  { pos: [4.2, 0.4, 1.8], size: [0.08, 3.2, 8], color: "#bcd0ff", intensity: 0.7 },
  { pos: [0, -2.8, -1.2], size: [5.5, 0.08, 4.5], color: "#444444", intensity: 0.3 },
  { pos: [-2.2, 1.4, -3.1], size: [1.6, 1.6, 0.06], color: "#e9c400", intensity: 0.35 },
  { pos: [3.1, -1.2, -2.6], size: [1.2, 1.2, 0.06], color: "#a9c4ff", intensity: 0.4 },
];

/**
 * Lightformers: emissive panels + an inside-out dome that only exist in the
 * environment map. They give the garment the smooth, glossy mirror look of
 * the reference film WITHOUT a visible box backdrop. The canvas stays
 * transparent, so the tee floats on the page background.
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
        <Mesh key={i} material={materials[i]} position={p.pos}>
          <BoxGeometry args={p.size} />
        </Mesh>
      ))}
      <Mesh>
        <SphereGeometry args={[18, 16, 12]} />
        <MeshBasicMaterial
          color="#0d0d0d"
          side={THREE.BackSide}
          transparent
          opacity={0.92}
          toneMapped={false}
        />
      </Mesh>
    </Group>
  );
}