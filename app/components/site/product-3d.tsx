"use client";
/** Stable product poster. Keep the image centered and free from transform-driven hover jumps. */
export function Product3D({ poster, alt }: { model: string; poster: string; alt: string }) {
  return (
    <div className="ow-card__media ow-card__media--3d">
      <img alt={alt} height={1152} loading="lazy" src={poster} width={928} />
    </div>
  );
}
