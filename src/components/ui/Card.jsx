import React from "react";
import { cx } from "../../lib/format";

/**
 * UI Light
 * - header, footer optional
 * - tone: "default" | "elevated"
 */
export default function Card({
  className,
  header,
  footer,
  children,
  tone = "default",
}) {
  const toneCls = {
    default:
      "border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-neutral-900",
    elevated:
      "border-neutral-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:supports-[backdrop-filter]:bg-neutral-900/30",
  };
  return (
    <div
      className={cx(
        "rounded-2xl border p-4 shadow-sm",
        toneCls[tone],
        className
      )}
    >
      {header && <div className="mb-3">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
