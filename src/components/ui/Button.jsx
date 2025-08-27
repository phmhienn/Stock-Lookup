import React from "react";
import { cx } from "../../lib/format";

/**
 * Button: theo Figma
 * - variant: "primary" | "secondary" | "ghost"
 * - size: "sm" | "md" | "lg"
 * - iconLeft / iconRight: optional React nodes
 */
export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl transition-colors";
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-3.5 py-2 text-sm",
    lg: "px-4 py-2.5 text-sm md:text-base",
  };
  const styles = {
    primary:
      "bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
    secondary:
      "border border-neutral-200/70 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800",
    ghost:
      "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
  };
  return (
    <Tag
      className={cx(base, sizes[size], styles[variant], className)}
      {...rest}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </Tag>
  );
}
