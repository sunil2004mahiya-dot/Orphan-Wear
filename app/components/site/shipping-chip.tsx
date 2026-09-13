"use client";

import { Ship } from "./ship-icon";

/** Corner chip: crosshair + "Worldwide shipping / fast & secure delivery". */
export function ShippingChip() {
  return (
    <div aria-hidden="true" className="ow-ship">
      <span className="ow-ship__icon">
        <Ship />
      </span>
      <span>
        Worldwide shipping
        <br />
        fast &amp; secure delivery
      </span>
    </div>
  );
}