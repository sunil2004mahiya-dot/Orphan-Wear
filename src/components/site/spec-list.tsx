const SPECS = [
  {
    n: "01",
    t: "Heavyweight cotton",
    d: "Boxy, garment-dyed blanks that hold their shape after the bleach and the wash.",
  },
  {
    n: "02",
    t: "Hand bleached",
    d: "Every splatter is poured by hand, so no two chests carry the same map.",
  },
  {
    n: "03",
    t: "In-house embroidery",
    d: "Crosses, skulls, aliens and rangers stitched at the Orphan table, never outsourced.",
  },
  {
    n: "04",
    t: "Signed and numbered",
    d: "Each one of one is numbered on the hem and signed before it ships.",
  },
  {
    n: "05",
    t: "Customizable on purchase",
    d: "Name, number or scripture added on request. Message us before checkout.",
  },
];

export function SpecList() {
  return (
    <ol className="ow-specs">
      {SPECS.map((s) => (
        <li key={s.n}>
          <span className="ow-specs__n">{s.n}</span>
          <div>
            <div className="ow-specs__t">{s.t}</div>
            <p className="ow-specs__d">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
