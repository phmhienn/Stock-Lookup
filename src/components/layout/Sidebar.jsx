import React from "react";
import Text from "../ui/Text";
import Button from "../ui/Button";

export default function Sidebar({ children }) {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-3 border-r border-neutral-200/60 bg-white/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-neutral-900/30">
      {children /* bạn truyền các Item/Group vào */}
      <div className="mt-auto">
        <Text variant="caption">Theme</Text>
        <div className="mt-2 flex gap-2">
          <Button variant="secondary" size="sm">
            Light
          </Button>
          <Button variant="secondary" size="sm">
            Dark
          </Button>
        </div>
      </div>
    </aside>
  );
}
