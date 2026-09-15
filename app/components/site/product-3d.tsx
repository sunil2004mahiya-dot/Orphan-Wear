"use client";

import { useRef } from "react";

/** Product poster with a cursor-tracked reflective frame. */
export function Product3D({ poster, alt }: { model: string; poster: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame || event.pointerType === "touch") return;
    const bounds = frame.getBoundingClientRect();
    frame.style.setProperty("--reflect-x", `${event.clientX - bounds.left}px`);
    frame.style.setProperty("--reflect-y", `${event.clientY - bounds.top}px`);
  }

  function resetReflection() {
    frameRef.current?.style.setProperty("--reflect-opacity", "0");
  }

  function showReflection() {
    frameRef.current?.style.setProperty("--reflect-opacity", "1");
  }

  return (
    <div
      className="ow-card__media ow-card__media--3d"
      onPointerEnter={showReflection}
      onPointerLeave={resetReflection}
      onPointerMove={handlePointerMove}
      ref={frameRef}
    >
      <span aria-hidden="true" className="ow-card__reflection" />
      <img alt={alt} height={1152} loading="lazy" src={poster} width={928} />
    </div>
  );
}
