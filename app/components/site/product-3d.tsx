"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { GlBoundary } from "./gl-boundary";

const ProductCanvas = lazy(() => import("@/app/components/three/product-canvas"));

/** Product media keeps a guaranteed poster while progressively enhancing with 3D and reflection. */
export function Product3D({
  model,
  poster,
  alt,
}: {
  model: string;
  poster: string;
  alt: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = (() => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!reduce && gl) setReady(true);
    else setFailed(true);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame || event.pointerType === "touch") return;
    const bounds = frame.getBoundingClientRect();
    frame.style.setProperty("--reflect-x", `${event.clientX - bounds.left}px`);
    frame.style.setProperty("--reflect-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      className="ow-card__media ow-card__media--3d"
      onPointerEnter={() => frameRef.current?.style.setProperty("--reflect-opacity", "1")}
      onPointerLeave={() => frameRef.current?.style.setProperty("--reflect-opacity", "0")}
      onPointerMove={handlePointerMove}
      ref={frameRef}
    >
      <span aria-hidden="true" className="ow-card__reflection" />
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
