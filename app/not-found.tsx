export default function NotFound() {
  return (
    <main className="ow ow-grid" style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ maxWidth: "34rem", textAlign: "center" }}>
        <p className="ow-eyebrow">404 / ORPHAN WEAR</p>
        <h1 className="ow-h2">Page not found.</h1>
        <p className="ow-lede" style={{ marginInline: "auto" }}>The piece you are looking for has moved off the table.</p>
        <a className="ow-cta-shop" href="/" style={{ marginTop: "2rem" }}>Return home <span aria-hidden="true">→</span></a>
      </div>
    </main>
  );
}
