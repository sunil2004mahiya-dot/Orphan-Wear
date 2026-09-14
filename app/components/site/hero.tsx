"use client";
import { useEffect, useRef } from "react";

import { CustomCta, ShopCta } from "./ctas";
import { ScrambleText } from "./scramble-text";

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
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);
  const targetTime = useRef(0);
  const pointer = useRef({ x: 0, y: 0, speed: 0 });

  useEffect(() => {
    const el = wrap.current;
    const media = video.current;
    if (!el) return;
    media?.load();
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      progress.current = p;
      el.style.setProperty("--p", p.toFixed(4));
      const media = video.current;
      if (media?.readyState >= 1 && Number.isFinite(media.duration)) {
        const dissolveProgress = Math.min(1, Math.max(0, (p - 0.38) / 0.62));
        const safeDuration = Math.max(0, media.duration - 1.0);
        targetTime.current = safeDuration * dissolveProgress;
        const delta = targetTime.current - media.currentTime;
        if (p < 0.38) {
          media.playbackRate = 0.82 + pointer.current.speed * 0.55;
          if (media.paused) void media.play().catch(() => undefined);
        } else {
          media.pause();
          if (Math.abs(delta) > 0.035) media.currentTime += delta * 0.08;
        }
        media.style.setProperty("--video-tilt", `${pointer.current.x * 1.8}deg`);
        media.style.setProperty("--video-drift", `${pointer.current.x * 8}px`);
      }
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
      pointer.current.x = (tx / r.width - 0.5) * 2;
      pointer.current.y = (ty / r.height - 0.5) * 2;
      pointer.current.speed = Math.min(1, Math.hypot(e.movementX, e.movementY) / 24);
    };
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      const speed = Math.hypot(tx - x, ty - y);
      const scale = Math.min(1.28, 0.92 + speed / 420);
      tr.style.transform = `translate3d(${x - 36}px, ${y - 36}px, 0) scale(${scale})`;
      tr.style.setProperty("--magnet-speed", Math.min(1, speed / 80).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      pointer.current.speed = 0;
      tx = st.clientWidth / 2;
      ty = st.clientHeight / 2;
    };
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerleave", leave);
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
          <video
            ref={video}
            aria-hidden="true"
            className="ow-hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="/assets/dissolve.mp4"
          />
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
          <div className="ow-hero__statement">
            <p className="ow-hero__eyebrow">Chapter 02 / The construction</p>
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
          <aside className="ow-hero__details" aria-label="Product details">
            <h3>Details matter.</h3>
            {[
              ["01", "Heavyweight cotton", "Boxy, garment-dyed blanks that hold their shape."],
              ["02", "Hand bleached", "Every splatter is poured by hand. No two are the same."],
              ["03", "In-house embroidery", "Finished at the Orphan table, never outsourced."],
              ["04", "Signed and numbered", "Each one of one is signed before it ships."],
              ["05", "Customizable", "Name, number or scripture added on request."],
            ].map(([number, title, description]) => (
              <div className="ow-hero__detail" key={number}>
                <span className="ow-hero__detail-number">{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </aside>
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
