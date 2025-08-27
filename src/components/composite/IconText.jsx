import React from "react";
import Text from "../ui/Text";

export default function IconText({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 grid place-items-center text-white">
        {icon}
      </div>
      <div className="leading-tight">
        <Text variant="body" weight="semibold" className="tracking-tight">
          {title}
        </Text>
        {subtitle && <Text variant="caption">{subtitle}</Text>}
      </div>
    </div>
  );
}
