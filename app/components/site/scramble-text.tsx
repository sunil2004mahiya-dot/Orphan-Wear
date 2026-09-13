"use client";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\|=+";

/**
 * Terminal-style text scramble (the reference site's glitch transition).
 * SSR renders the final text, so nothing is ever hidden; the scramble runs on
 * mount (once) and again on hover. Respects prefers-reduced-motion.
 */
export function ScrambleText({
  text,
  as: Tag = "span",
  className = "",
  onMount = true,
  duration = 520,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  onMount?: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);
  const reduce = useRef(false);

  const run = () => {
    if (reduce.current) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    const start = performance.now();
    const chars = text.split("");
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * chars.length);
      const next = chars
        .map((c, i) => {
          if (c === " " || i < settled) return c;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);
      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        frame.current = null;
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (onMount) run();
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag aria-label={text} className={`ow-scramble ${className}`} onMouseEnter={run}>
      {display}
    </Tag>
  );
}
