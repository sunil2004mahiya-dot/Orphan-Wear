import type { ThreeElements } from "@react-three/fiber";
import type { ComponentType } from "react";

/**
 * Typed aliases for R3F intrinsic elements. A string tag rendered through
 * these still becomes createElement("group", …), which R3F resolves, but we
 * avoid augmenting the global JSX namespace (it breaks the template's
 * polymorphic Typography typings).
 */
const el = <K extends keyof ThreeElements>(tag: K) =>
  tag as unknown as ComponentType<ThreeElements[K]>;

export const Group = el("group");
export const Primitive = el("primitive");
export const Mesh = el("mesh");
export const BoxGeometry = el("boxGeometry");
export const SphereGeometry = el("sphereGeometry");
export const MeshBasicMaterial = el("meshBasicMaterial");
export const AmbientLight = el("ambientLight");
export const DirectionalLight = el("directionalLight");
export const PointLight = el("pointLight");
