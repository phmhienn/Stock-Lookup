import React from "react";
import {
  LogIn,
  Star,
  Clock,
  LayoutDashboard,
  FileText,
  User,
  Building2,
  Newspaper,
  Share2,
} from "lucide-react";

export default function Sidebar({ active = "Dashboard", onSelect, onLogin }) {
  return (
    <aside
      className=" shrink-0 rounded-2xl border border-neutral-200/70 bg-white/70 p-3
                       dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      {/* Top: Login */}
      <button
        onClick={onLogin}
        className="w-full mb-3 inline-flex items-center justify-center gap-2 rounded-xl
                   border border-neutral-200/70 bg-white px-3 py-2 text-sm font-medium
                   hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <LogIn className="h-4 w-4" />
        Đăng nhập
      </button>

      {/* Favorites / Recently */}
      <Section title="Favorites">
        <Item
          label="Favorites"
          icon={<Star className="h-4 w-4" />}
          active={active === "Favorites"}
          onClick={() => onSelect?.("Favorites")}
        />
        <Item
          label="Recently"
          icon={<Clock className="h-4 w-4" />}
          active={active === "Recently"}
          onClick={() => onSelect?.("Recently")}
        />
      </Section>

      {/* Main nav */}
      <Section>
        <Item
          label="Dashboard"
          icon={<LayoutDashboard className="h-4 w-4" />}
          active={active === "Dashboard"}
          onClick={() => onSelect?.("Dashboard")}
        />
        <Item
          label="Pages"
          icon={<FileText className="h-4 w-4" />}
          active={active === "Pages"}
          onClick={() => onSelect?.("Pages")}
        />
        <Item
          label="Account"
          icon={<User className="h-4 w-4" />}
          active={active === "Account"}
          onClick={() => onSelect?.("Account")}
        />
        <Item
          label="Corporate"
          icon={<Building2 className="h-4 w-4" />}
          active={active === "Corporate"}
          onClick={() => onSelect?.("Corporate")}
        />
        <Item
          label="Blog"
          icon={<Newspaper className="h-4 w-4" />}
          active={active === "Blog"}
          onClick={() => onSelect?.("Blog")}
        />
        <Item
          label="Social"
          icon={<Share2 className="h-4 w-4" />}
          active={active === "Social"}
          onClick={() => onSelect?.("Social")}
        />
      </Section>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-3">
      {title && (
        <div className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
          {title}
        </div>
      )}
      <nav className="space-y-1">{children}</nav>
    </div>
  );
}

function Item({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
