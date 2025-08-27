import React from "react";
import { cx } from "../../lib/format";

/**
 * Text: typography atom theo Figma
 * - variant: "title" | "subtitle" | "body" | "caption"
 * - weight: "regular" | "medium" | "semibold" | "bold"
 */
export default function Text({
  as: Tag = "div",
  variant = "body",
  weight = "regular",
  className,
  children,
}) {
  const mapVariant = {
    title: "text-2xl md:text-3xl tracking-tight",
    subtitle: "text-lg md:text-xl",
    body: "text-sm md:text-base",
    caption: "text-xs text-neutral-500",
  };
  const mapWeight = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  return (
    <Tag className={cx(mapVariant[variant], mapWeight[weight], className)}>
      {children}
    </Tag>
  );
}
