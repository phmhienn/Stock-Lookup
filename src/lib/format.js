const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const NUM = new Intl.NumberFormat("en-US");

export const fmtCurrency = (v, c = "VND") =>
  v == null || Number.isNaN(v)
    ? "—"
    : c === "USD"
    ? USD.format(v)
    : VND.format(v);

export const fmtNumber = (v) =>
  v == null || Number.isNaN(v) ? "—" : NUM.format(v);

export const cx = (...cls) => cls.filter(Boolean).join(" ");
