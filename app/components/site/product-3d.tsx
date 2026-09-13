"use client";

import { lazy, Suspense, useEffect, useState } from "react";

import { GlBoundary } from "./gl-boundary";

const ProductCanvas = lazy(() => import("@/app/components/three/product-canvas"));

/**
 * Product media: the poster JPEG is ALWAYS in the DOM first, so the card can
 * never be blank (previews, WebGL stalls, slow networks). The 3D viewer
 * fades in above it once a WebGL context is confirmed.
 */
export function Product3D({
  model,
  poster,
  alt,
}: {
  model: string;
  poster: string;
  alt: string;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = (() => {
      try {
        const c = document.createElement("canvas");
        return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!reduce && gl) setReady(true);
    else setFailed(true);
  }, []);
  return (
    <div className="ow-card__media ow-card__media--3d">
      {/* Poster is the guaranteed layer; never removed. */}
      <img alt={alt} className="ow-card__poster" height={1152} loading="lazy" src={poster} width={928} />
      {ready && !failed ? (
        <div className="ow-card__viewer">
          <GlBoundary>
            <Suspense fallback={null}>
              <ProductCanvas url={model} />
            </Suspense>
          </GlBoundary>
        </div>
      ) : null}
    </div>
  );
}