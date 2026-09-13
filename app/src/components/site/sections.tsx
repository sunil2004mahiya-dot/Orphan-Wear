import { CustomCta, FollowLink, INSTAGRAM_URL, SHOP_URL, ShopCta } from "./ctas";
import { Product3D } from "./product-3d";
import { ScrambleText } from "./scramble-text";

/* ---------------- Nav ---------------- */
export function SiteNav() {
  return (
    <header className="ow-nav">
      <a className="ow-wordmark" href="/" aria-label="Orphan Wear home">
        Orphan
      </a>
      <nav aria-label="Site" className="ow-nav__links">
        <a href="#drop">
          <ScrambleText onMount={false} text="The drop" />
        </a>
        <a href="#letter">
          <ScrambleText onMount={false} text="Letter" />
        </a>
        <a href="#customs">
          <ScrambleText onMount={false} text="Customs" />
        </a>
        <a href={INSTAGRAM_URL} rel="noreferrer" target="_blank">
          <ScrambleText onMount={false} text="Instagram" />
        </a>
      </nav>
      <span className="ow-nav__meta">Est. 2023</span>
    </header>
  );
}

/* ---------------- The drop ---------------- */
const PRODUCTS = [
  {
    n: "01",
    name: "Skeleton Tee",
    price: "$100",
    img: "/assets/products/skeleton-tee.jpg",
    model: "/assets/models/skeleton-tee.glb",
    alt: "Black tee with a hand painted skeleton rib cage graphic",
    tags: ["1 of 1 #28", "Hand painted"],
  },
  {
    n: "02",
    name: "Golden Ranger Long Sleeve",
    price: "$65",
    img: "/assets/products/golden-ranger-longsleeve.jpg",
    model: "/assets/models/golden-ranger-longsleeve.glb",
    alt: "Black long sleeve with a grid of yellow ranger helmets on the back",
    tags: ["Started in Last", "Black"],
  },
  {
    n: "03",
    name: "Iron Cross Bleach Tee",
    price: "$100",
    img: "/assets/products/iron-cross-bleach-tee.jpg",
    model: "/assets/models/iron-cross-bleach-tee.glb",
    alt: "Black tee with copper bleach splatter and a yellow iron cross embroidery",
    tags: ["1 of 1 #45", "Size S"],
  },
  {
    n: "04",
    name: "Alien Wear Tee",
    price: "$100",
    img: "/assets/products/alien-wear-tee.jpg",
    model: "/assets/models/alien-wear-tee.glb",
    alt: "Black tee with a green alien graphic and red and white embroidery",
    tags: ["1 of 1 #59", "Size S"],
  },
];

export function DropSection() {
  return (
    <section className="ow-section ow-grid" id="drop">
      <h2 className="ow-h2">
        <ScrambleText as="span" text="The drop." />
      </h2>
      <p className="ow-lede">
        The Started in Last collection and the current one of ones. Prices as
        listed on Instagram. Sizes are what is left, not what we can remake.
      </p>
      <div className="ow-rail">
        {PRODUCTS.map((p) => (
          <article className="ow-card" key={p.n}>
            <div className="ow-card__head">
              <span>{p.n}</span>
              <span aria-hidden="true">+</span>
            </div>
            <div className="ow-card__title">
              <span>{p.name}</span>
              <span>{p.price}</span>
            </div>
            <div aria-hidden="true" className="ow-card__dots">
              <i />
              <i />
              <i />
            </div>
            <Product3D alt={p.alt} model={p.model} poster={p.img} />
            <div className="ow-card__foot">
              <div className="ow-card__tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div aria-hidden="true" className="ow-card__shop">
                <span>Shop the drop</span>
                <span>&rarr;</span>
              </div>
            </div>
            <a
              aria-label={`Shop the drop: ${p.name}`}
              className="ow-card__link"
              href={SHOP_URL}
              rel="noreferrer"
              target="_blank"
            />
          </article>
        ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <ShopCta />
      </div>
    </section>
  );
}

/* ---------------- Letter ---------------- */
export function LetterSection() {
  return (
    <section className="ow-section" id="letter">
      <div className="ow-letter">
        <figure className="ow-letter__plate" style={{ margin: 0 }}>
          <img
            alt="Macro of black cotton with copper bleach splatter"
            height={1280}
            loading="lazy"
            src="/assets/plates/bleach-plate.jpg"
            width={1024}
          />
        </figure>
        <div>
          <h2 className="ow-h2">
            <ScrambleText as="span" text="A letter from Orphan." />
          </h2>
          <div className="ow-letter__body" style={{ marginTop: "2.5rem" }}>
            <p>
              The Started in Last collection is for anyone who has ever felt
              overlooked, underestimated, or like they were dealt a different
              hand from the start.
            </p>
            <p>
              These twelve pieces are more than a collection. They are a
              reminder that where you begin does not decide where you are meant
              to end up.
            </p>
            <p>
              Every design was made with love. Every stitch of embroidery,
              every print, every tag and every finishing touch was completed in
              house by Team Orphan. We spend countless hours making sure each
              piece is something we are proud to stand behind before it ever
              reaches your hands.
            </p>
            <p>
              We do not just make clothes. We make pieces with purpose. When
              you put them on, remember that your story is not over and that
              your past does not have the final say.
            </p>
            <p className="ow-letter__sign">Team Orphan</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Customs band ---------------- */
const NUMBERS = ["#43", "#45", "#48", "#56", "#59", "#60", "#61", "#62"];

export function CustomsSection() {
  const track = NUMBERS.map((n) => `Orphan 1 of 1 ${n}`);
  return (
    <section className="ow-section ow-band ow-grid" id="customs">
      <p className="ow-eyebrow">Customs</p>
      <div aria-hidden="true" className="ow-marquee">
        <div className="ow-marquee__track">
          {track.map((t, i) => (
            <span key={`a-${i}`}>{t}</span>
          ))}
        </div>
        <div className="ow-marquee__track">
          {track.map((t, i) => (
            <span key={`b-${i}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="ow-band__row">
        <div>
          <h2 className="ow-h2">
            <ScrambleText as="span" text="Your number is next." />
          </h2>
          <p className="ow-lede">
            Hand bleached, embroidered and signed to order. Send a reference,
            a size and a scripture or a name, and we will quote it in a day.
          </p>
        </div>
        <CustomCta />
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function SiteFooter() {
  return (
    <footer className="ow-footer">
      <div>
        <a className="ow-wordmark" href="/">
          Orphan
        </a>
        <p style={{ marginTop: "1rem", maxWidth: "28ch", lineHeight: 1.7 }}>
          The original Orphan brand. Founded 2023. A Christian brand, made with
          love.
        </p>
      </div>
      <div>
        <h4>Shop</h4>
        <ul>
          <li>
            <a href={SHOP_URL} rel="noreferrer" target="_blank">
              orphanwear.us
            </a>
          </li>
          <li>
            <a href="#drop">The drop</a>
          </li>
        </ul>
      </div>
      <div>
        <h4>Studio</h4>
        <ul>
          <li>
            <a href="#letter">Letter</a>
          </li>
          <li>
            <a href="#customs">Customs</a>
          </li>
        </ul>
      </div>
      <div>
        <h4>Social</h4>
        <ul>
          <li>
            <FollowLink />
          </li>
        </ul>
      </div>
      <div className="ow-footer__legal">
        <span>Orphan Wear. All pieces made in house.</span>
        <span>Every one of one is final sale.</span>
      </div>
    </footer>
  );
}
