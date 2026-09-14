"use client";
import { useEffect, useRef } from "react";

/** Stable product poster with a cursor-reactive live parallax treatment. */
export function Product3D({ poster, alt }: { model: string; poster: string; alt: string }) {
  const media = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = media.current;
    if (!el) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const leave = () => { targetX = 0; targetY = 0; };
    const frame = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.setProperty("--card-x", x.toFixed(3));
      el.style.setProperty("--card-y", y.toFixed(3));
      raf = requestAnimationFrame(frame);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(frame);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="ow-card__media ow-card__media--3d" ref={media}>
      <img alt={alt} height={1152} loading="lazy" src={poster} width={928} />
    </div>
  );
}
