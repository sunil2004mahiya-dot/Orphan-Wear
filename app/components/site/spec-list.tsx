"use client";


const SPECS = [
  {
    n: "01",
    t: "Heavyweight cotton",
    d: "Boxy, garment-dyed blanks that hold their shape after the bleach and the wash.",
    g: "M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm-4 4h2v2H7v-2Zm10-2h2v2h-2v-2Zm-9-7h8v2H8V6Z",
  },
  {
    n: "02",
    t: "Hand bleached",
    d: "Every splatter is poured by hand, so no two chests carry the same map.",
    g: "M6 5h3v2H6zM5 9h6v2H5zm1 4h4v-1h2v3H6v-2zm5-8h3v3h-2V7h-1V5Zm5 2h2v4h-2V7Zm-3 4h5v3h-2v-1h-3v-2Z",
  },
  {
    n: "03",
    t: "In-house embroidery",
    d: "Crosses, skulls, aliens and rangers stitched at the Orphan table, never outsourced.",
    g: "M12 4l1.6 2.6 2.9.6-2 2.2.5 2.9-2.6-1.4L9.8 12l.5-2.9-2-2.2 2.9-.6L12 4Zm-3 9l1.3 1.3L8.7 16 5 18l2-3.7 1.3-4 1.4 1.4L10 11.3Zm6 0l1.6 1.4 1.2 3.9-3.6-2-1.4-1.6 1-1.7.5 2 1.2-1.3-.5-1.7Z",
  },
  {
    n: "04",
    t: "Signed and numbered",
    d: "Each one of one is numbered on the hem and signed before it ships.",
    g: "M5 6h5v2H7v6h3v2H5V6Zm14 0v12h-2v-7l-2 3-2-3v7h-2V6h2l2 4 2-4h2Z",
  },
  {
    n: "05",
    t: "Customizable on purchase",
    d: "Name, number or scripture added on request. Message us before checkout.",
    g: "M12 5c3 0 5 2 5 4 0 3-5 6-5 6s-5-3-5-6c0-2 2-4 5-4Zm0 2c-1.7 0-3 1-3 2 0 1.3 1.3 3.4 3 4.6 1.7-1.2 3-3.3 3-4.6 0-1-1.3-2-3-2ZM8 19h8v2H8v-2Z",
  },
];

/** Numbered spec list with line icons — the reference's feature panel. */
export function SpecList() {
  return (
    <ol className="ow-specs">
      {SPECS.map((s) => (
        <li key={s.n}>
          <span aria-hidden="true" className="ow-specs__icon">
            <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
              <path d={s.g} />
            </svg>
          </span>
          <div className="ow-specs__body">
            <div className="ow-specs__t">
              <span className="ow-specs__n">{s.n}</span>
              {s.t}
            </div>
            <p className="ow-specs__d">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}