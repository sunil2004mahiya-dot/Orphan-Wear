import { lazy, Suspense, useEffect, useState } from "react";

const ProductCanvas = lazy(() => import("@/components/three/product-canvas"));

/** Poster on the server and for reduced motion; the 3D viewer once mounted. */
export function Product3D({ model, poster, alt }: { model: string; poster: string; alt: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setReady(true);
  }, []);
  return (
    <div className="ow-card__media ow-card__media--3d">
      <img alt={alt} data-hidden={ready ? "true" : "false"} height={1152} loading="lazy" src={poster} width={928} />
      {ready ? (
        <Suspense fallback={null}>
          <ProductCanvas url={model} />
        </Suspense>
      ) : null}
    </div>
  );
}
