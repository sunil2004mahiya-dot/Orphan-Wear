"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { Group, Primitive } from "@/app/components/three/elements";

/**
 * A garment mesh with:
 *  - idle float
 *  - "magnet" tilt toward the pointer (lerped, never React state)
 *  - an optional scroll-driven dissolve (noise threshold + bright edge)
 *
 * `progress` is a mutable ref (0..1) written by the scroll loop. The dissolve
 * shader is patched into every material via onBeforeCompile so the GLB keeps
 * its textures.
 */
export type GarmentProps = {
  url: string;
  progress?: { current: number };
  hover?: { current: number };
  scale?: number;
  floatAmp?: number;
  spin?: number;
  magnet?: number;
  edgeColor?: string;
  yOffset?: number;
};

const DISSOLVE_PARS = /* glsl */ `
  uniform float uDissolve;
  uniform vec3 uEdge;
  varying vec3 vWorldPos;
  float hash3(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash3(i + vec3(0, 0, 0)), hash3(i + vec3(1, 0, 0)), f.x),
          mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x),
          mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
`;

export function Garment({
  url,
  progress,
  hover,
  scale = 1,
  floatAmp = 0.06,
  spin = 0.12,
  magnet = 0.45,
  edgeColor = "#e9c400",
  yOffset = 0,
}: GarmentProps) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(
    () => ({
      uDissolve: { value: 0 },
      uEdge: { value: new THREE.Color(edgeColor) },
    }),
    [edgeColor],
  );
  const { pointer } = useThree();
  const tilt = useRef({ x: 0, y: 0 });

  // Center + normalize the model once; patch materials for the dissolve.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = 1.6 / Math.max(size.x, size.y, size.z);
    clone.position.sub(center).multiplyScalar(s);
    clone.scale.setScalar(s);
    clone.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        mat.side = THREE.DoubleSide;
        mat.onBeforeCompile = (shader) => {
          shader.uniforms.uDissolve = uniforms.uDissolve;
          shader.uniforms.uEdge = uniforms.uEdge;
          shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vWorldPos;")
            .replace(
              "#include <worldpos_vertex>",
              "#include <worldpos_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;",
            );
          shader.fragmentShader = shader.fragmentShader
            .replace("#include <common>", "#include <common>\n" + DISSOLVE_PARS)
            .replace(
              "#include <dithering_fragment>",
              /* glsl */ `
              #include <dithering_fragment>
              if (uDissolve > 0.0) {
                float n = vnoise(vWorldPos * 9.0) * 0.6 + vnoise(vWorldPos * 31.0) * 0.4;
                float t = uDissolve * 1.15 - 0.075;
                if (n < t) discard;
                float edge = smoothstep(t, t + 0.08, n);
                gl_FragColor.rgb = mix(uEdge, gl_FragColor.rgb, edge);
              }`,
            );
        };
        mat.needsUpdate = true;
      });
    });
    return clone;
  }, [scene, uniforms]);

  useEffect(() => () => void useGLTF.clear(url), [url]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = progress?.current ?? 0;
    const h = hover?.current ?? 1;
    // magnet: ease toward pointer
    const k = 1 - Math.exp(-dt * 4);
    tilt.current.x += (pointer.y * magnet * h - tilt.current.x) * k;
    tilt.current.y += (pointer.x * magnet * 1.4 * h - tilt.current.y) * k;
    g.rotation.x = -tilt.current.x * 0.42 + Math.sin(t * 0.7) * 0.018;
    g.rotation.y = tilt.current.y * 0.82 + Math.sin(t * spin) * 0.08;
    g.position.x = pointer.x * magnet * 0.08 * h;
    g.position.y = yOffset + Math.sin(t * 1.1) * floatAmp + p * 0.35;
    // dissolve on the second half of the header scroll
    const d = THREE.MathUtils.clamp((p - 0.45) / 0.5, 0, 1);
    uniforms.uDissolve.value = d;
    const sc = scale * (1 + Math.min(p, 0.45) * 0.55);
    g.scale.setScalar(sc);
  });

  return (
    <Group ref={group}>
      <Primitive object={model} />
    </Group>
  );
}
