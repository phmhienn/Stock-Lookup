import React, { useState } from "react";
import { PanelLeft } from "lucide-react";
import Sidebar from "./layout/Sidebar";
import RightBar from "./layout/RightBar";
import Card from "./ui/Card";
import Block from "./ui/Block";
import Text from "./ui/Text";
import Button from "./ui/Button";
import IconText from "./composite/IconText";
import BackToTop from "./ui/BackToTop";

export default function StockLookup() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // <-- state điều khiển

  //  const fakeWatchlist = ["FPT", "VNM", "ACB"];
  // const fakeRecent = (
  //   <div className="mt-2 flex flex-wrap gap-2">
  //     {fakeWatchlist.map((k) => (
  //       <Button key={k} variant="secondary" size="sm">
  //         {k}
  //       </Button>
  //     ))}
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* 3 cột: sidebar | main | rightbar ; 2 hàng: header | body  */}
      <div className="grid min-h-screen grid-cols-[auto_1fr_360px] grid-rows-[auto_1fr]">
        {/* ===== Sidebar (luôn render, nhưng ANIMATE width) ===== */}
        <aside
          className={[
            "col-start-1 col-end-2 row-span-2 overflow-hidden", // layout
            "border-r border-neutral-200/70 dark:border-neutral-800", // viền
            "bg-white/80 dark:bg-neutral-900/60", // nền
            "transition-all duration-300 ease-in-out", // ANIMATION
            sidebarOpen ? "w-[280px] p-4" : "w-0 p-0 border-r-0", // width & padding
          ].join(" ")}
          aria-hidden={!sidebarOpen}
        >
          {/* fade/slide nhẹ cho nội dung bên trong */}
          <div
            className={[
              "h-full transition-all duration-300",
              sidebarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-3",
            ].join(" ")}
          >
            <Sidebar />
          </div>
        </aside>

        {/* ===== Header: chỉ phủ phần nội dung (cột 2-3) ===== */}
        <header
          className="col-start-2 col-end-3 row-start-1 z-30
                           flex items-center gap-3 border-b border-neutral-200/70
                           bg-white/70 px-4 py-3 backdrop-blur
                           dark:border-neutral-800 dark:bg-neutral-900/60"
        >
          {/* Nút 3 gạch để toggle */}
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
            aria-pressed={sidebarOpen}
            className="rounded-lg p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <PanelLeft className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <Text variant="body" className="text-neutral-500">
              Stock Lookup Demo
            </Text>
          </div>

          <Button variant="secondary" size="md">
            Lookup
          </Button>
        </header>

        {/* ===== Main ===== */}
        <main className="col-start-2 col-end-3 row-start-2 p-6">
          <Card
            header={
              <IconText title="Welcome" subtitle="Figma-inspired layout" />
            }
          >
            <Block className="mt-2">
              <Text variant="body">
                Đây là khu vực nội dung chính. Bạn có thể nhúng biểu đồ/tra cứu
                mã ở đây.
              </Text>
              <div className="mt-3">
                <Button variant="primary">Action</Button>
              </div>
            </Block>
          </Card>

          <Card
            className="mt-4"
            header={
              <Text variant="subtitle" weight="semibold">
                Latest News
              </Text>
            }
          >
            <Text variant="body" className="text-neutral-500">
              Tin tức demo…
            </Text>
          </Card>
        </main>

        {/* ===== Rightbar ===== */}
        <aside className="col-start-3 col-end-4 row-start-1 row-span-2 p-6">
          <RightBar featuredSymbols={["FPT", "VNM", "ACB"]} />
        </aside>
      </div>
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
        {/* grid / nội dung của bạn */}
        <BackToTop threshold={240} />
      </div>
    </div>
  );
}
