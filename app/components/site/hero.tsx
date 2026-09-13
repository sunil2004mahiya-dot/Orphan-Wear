"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { CustomCta, ShopCta } from "./ctas";
import { ScrambleText } from "./scramble-text";

const HeroCanvas = lazy(() => import("@/app/components/three/hero-canvas"));

export const HERO_MODEL = "/assets/models/box-logo-tee.glb";
export const HERO_POSTER = "/assets/products/box-logo-tee.jpg";

/**
 * Header: 200dvh of scroll, a sticky stage. Beat 1 (top half): the tee floats
 * and follows the cursor. Beat 2 (bottom half): the tee dissolves while the
 * second line of copy slides in. Progress is written to a ref for the WebGL
 * loop and to a CSS variable for the copy; never React state per frame.
 */
export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tracer = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);

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
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      progress.current = p;
      el.style.setProperty("--p", p.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // White tracer: a soft light that chases the cursor across the hero (the
  // reference's magnet glow). Rendered in DOM, under the copy layer.
  useEffect(() => {
    const st = stage.current;
    const tr = tracer.current;
    if (!st || !tr) return;
    let raf = 0;
    let tx = -200;
    let ty = -200;
    let x = -200;
    let y = -200;
    const move = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      tr.style.transform = `translate3d(${x - 170}px, ${y - 170}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    st.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      st.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ow-hero" ref={wrap}>
      <div className="ow-hero__stage" ref={stage}>
        <div aria-hidden="true" className="ow-hero__logo">
          <img alt="" height={1024} src="/assets/brand/orphan-mark.png" width={1024} />
        </div>
        <div className="ow-hero__canvas">
          <img
            alt="Orphan Wear Box Logo tee"
            className="ow-hero__poster"
            data-hidden={ready ? "true" : "false"}
            height={1152}
            src={HERO_POSTER}
            width={928}
          />
          {ready ? (
            <Suspense fallback={null}>
              <HeroCanvas progress={progress} url={HERO_MODEL} />
            </Suspense>
          ) : null}
        </div>

        <div aria-hidden="true" className="ow-hero__tracer" ref={tracer} />

        <div className="ow-hero__copy ow-hero__copy--one">
          <h1 className="ow-hero__title">
            <ScrambleText as="span" text="Started" />
            <br />
            <ScrambleText as="span" text="in last." />
          </h1>
          <p className="ow-hero__line">
            <ScrambleText as="span" text="Heavyweight. Hand bleached. Signed 1 of 1." />
          </p>
          <ShopCta />
        </div>

        <div className="ow-hero__copy ow-hero__copy--two">
          <h2 className="ow-hero__title">
            <ScrambleText as="span" onMount={false} text="Made once." />
            <br />
            <ScrambleText as="span" onMount={false} text="Then gone." />
          </h2>
          <p className="ow-hero__line">
            <ScrambleText as="span" onMount={false} text="When it sells, the number is closed for good." />
          </p>
          <CustomCta />
        </div>

        <div aria-hidden="true" className="ow-hero__meter">
          <span>01</span>
          <i />
          <span>02</span>
        </div>
      </div>
    </div>
  );
}
