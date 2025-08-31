import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({ threshold = 240 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll(); // khởi tạo trạng thái đúng ngay từ đầu
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={goTop}
      aria-label="Back to top"
      className={[
        "fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50",
        "rounded-full p-3 shadow-lg transition-all",
        "bg-neutral-900 text-white hover:bg-black",
        "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
