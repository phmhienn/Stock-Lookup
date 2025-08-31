import React, { useMemo } from "react";
import Card from "../ui/Card";
import {
  Bell,
  TrendingUp,
  Activity as ActivityIcon,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";

/**
 * RightBar: Notifications • Featured Prices • Activities
 * props:
 *  - featuredSymbols?: string[]  // mặc định: ["FPT","VNM","ACB"]
 */
export default function RightBar({ featuredSymbols = ["FPT", "VNM", "ACB"] }) {
  // mock notifications
  const notifications = [
    { id: 1, icon: "🛠️", title: "You fixed a bug.", time: "Just now" },
    {
      id: 2,
      icon: "👤",
      title: "New user registered.",
      time: "59 minutes ago",
    },
    { id: 3, icon: "📈", title: "Watchlist moved +2.1%.", time: "Today" },
  ];

  // mock activities (timeline)
  const activities = [
    { id: 1, text: "Synced prices for HOSE tickers.", time: "10:24" },
    { id: 2, text: "Alert set: FPT > 105,000đ.", time: "09:50" },
    { id: 3, text: "Added VNM to watchlist.", time: "Yesterday" },
  ];

  // tạo series giả cho sparkline
  const featured = useMemo(() => {
    return featuredSymbols.map((sym) => {
      const series = generateSparkSeries(sym);
      const last = series.at(-1).close;
      const prev = series.at(-2)?.close ?? last;
      const change = +(last - prev).toFixed(2);
      const changePct = +((change / prev) * 100).toFixed(2);
      return { symbol: sym, price: last, change, changePct, series };
    });
  }, [featuredSymbols]);

  return (
    <div className="space-y-4">
      {/* Notifications */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <div className="font-semibold">Notifications</div>
          </div>
        }
      >
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <div className="h-8 w-8 grid place-items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl text-lg">
                {n.icon}
              </div>
              <div className="text-sm">
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-neutral-500">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Featured Prices */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <div className="font-semibold">Featured Prices</div>
          </div>
        }
      >
        <div className="space-y-3">
          {featured.map((f) => (
            <button
              key={f.symbol}
              className="w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
              onClick={() => console.log("open", f.symbol)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    {f.symbol}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {f.change >= 0 ? "+" : ""}
                    {f.change} ({f.changePct}%)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {formatCurrency(f.price)}
                  </div>
                  <div
                    className={[
                      "inline-flex items-center gap-1 text-xs",
                      f.change >= 0 ? "text-emerald-600" : "text-rose-600",
                    ].join(" ")}
                  >
                    <ArrowUpRight
                      className={`h-3 w-3 ${f.change < 0 ? "rotate-180" : ""}`}
                    />
                    {f.changePct}%
                  </div>
                </div>
              </div>

              <div className="mt-2 h-14">
                <MiniSparkline data={f.series} up={f.change >= 0} />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Activities */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-4 w-4" />
            <div className="font-semibold">Activities</div>
          </div>
        }
      >
        <div className="relative pl-4">
          {/* đường dọc timeline */}
          <div className="absolute left-1 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-indigo-500" />
                <div className="text-sm">{a.text}</div>
                <div className="text-xs text-neutral-500">{a.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

/* ---- Mini sparkline chart ---- */
function MiniSparkline({ data, up }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="date" hide />
        <YAxis dataKey="close" hide domain={["dataMin", "dataMax"]} />
        <Tooltip
          contentStyle={{
            background: "#111827",
            color: "white",
            border: "1px solid #1f2937",
            borderRadius: 12,
            padding: 10,
          }}
          formatter={(v) => [v, "Close"]}
          labelFormatter={(l) => `Date: ${l}`}
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke={up ? "rgb(16,185,129)" : "rgb(244,63,94)"} // Tailwind emerald-500 / rose-500
          fill={up ? "rgba(16,185,129,0.12)" : "rgba(244,63,94,0.12)"}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ---- helpers ---- */
function formatCurrency(v, currency = "VND") {
  try {
    return new Intl.NumberFormat(currency === "VND" ? "vi-VN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(v);
  } catch {
    return String(v);
  }
}

function generateSparkSeries(symbol) {
  const n = 30; // 30 điểm gần nhất
  const today = new Date();
  let base = 100 + Math.random() * 40;
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    base = Math.max(5, base + (Math.random() - 0.5) * 2);
    out.push({
      date: d.toISOString().slice(0, 10),
      close: +base.toFixed(2),
      symbol,
    });
  }
  return out;
}
