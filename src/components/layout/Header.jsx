import React from "react";
import Button from "../ui/Button";
import { Search } from "lucide-react";

export default function Header({ children }) {
  return (
    <header className="relative z-30 border-b border-neutral-200/60 bg-white/70 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-900/30">
      <div className="flex items-center gap-3 px-6 py-3">
        {/* slot cho search hoặc nội dung tuỳ biến */}
        <div className="flex-1">{children}</div>
        <Button
          variant="secondary"
          size="md"
          iconLeft={<Search className="h-4 w-4" />}
        >
          Lookup
        </Button>
      </div>
    </header>
  );
}
