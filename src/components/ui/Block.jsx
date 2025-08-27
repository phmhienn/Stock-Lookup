import React from "react";
import { cx } from "../../lib/format";

/** Block: container đơn giản hơn Card, dùng cho section/chunk */
export default function Block({ className, children }) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-neutral-200/60 p-4 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </section>
  );
}
