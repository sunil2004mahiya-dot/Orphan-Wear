"use client";

import { useEffect, useRef, useState } from "react";

const HEX = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\|=+";

/**
 * The reference's product-title decryption: on hover the name corrupts into
 * hex/random characters, loops a moment, then resolves to the clean yellow
 * name. Price stays static.
 */
export function ProductName({ name }: { name: string }) {
  const [display, setDisplay] = useState(name);
  const frame = useRef<number | null>(null);
  const settled = useRef(false);

  const run = () => {
    if (settled.current) {
      setDisplay(name);
      return;
    }
    if (frame.current) cancelAnimationFrame(frame.current);
    const total = 1400;
    const start = performance.now();
    const chars = name.split("");
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const corrupt = 1 - Math.exp(-p * 5);
      const next = chars
        .map((c, i) => {
          if (c === " ") return i % 3 === 0 ? "_" : " ";
          if (Math.random() < corrupt) {
            return HEX[Math.floor(Math.random() * HEX.length)];
          }
          return c;
        })
        .join("");
      setDisplay(next);
      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        settled.current = true;
        setDisplay(name);
        frame.current = null;
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  return (
    <span
      className="ow-card__name"
      onMouseEnter={run}
      aria-label={name}
      data-settled={settled.current ? "true" : "false"}
    >
      {display}
    </span>
  );
}