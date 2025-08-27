// Chuẩn hóa dữ liệu từ các provider khác nhau về 1 shape thống nhất cho UI

/**
 * Shape UI mục tiêu:
 * {
 *   symbol, name, exchange, sector, currency: "VND" | "USD",
 *   price, change, changePct, open, high, low, volume,
 *   pe, eps, week52High, week52Low,
 *   series: [{ date, open, high, low, close, volume, symbol, currency }]
 * }
 */

// VNDirect (ví dụ, bạn map theo field thực tế bạn trả về từ serverless của bạn)
export function adaptQuoteFromVNDirect(api) {
  // Giả định api có dạng bạn tự quy ước ở endpoint của bạn
  // Sửa theo response thật của bạn.
  return {
    symbol: api.code,
    name: api.companyName || api.name || api.code,
    exchange: api.exchange || "HOSE",
    sector: api.sector || "",
    currency: api.currency || "VND",

    price: num(api.price),
    change: num(api.change),
    changePct: num(api.changePercent),
    open: num(api.open),
    high: num(api.high),
    low: num(api.low),
    volume: num(api.volume),

    pe: num(api.peRatio),
    eps: num(api.eps),
    week52High: num(api.week52High),
    week52Low: num(api.week52Low),

    series: Array.isArray(api.history)
      ? api.history.map((h) => ({
          date: h.date, // "YYYY-MM-DD"
          open: num(h.open),
          high: num(h.high),
          low: num(h.low),
          close: num(h.close),
          volume: num(h.volume),
          symbol: api.code,
          currency: api.currency || "VND",
        }))
      : [],
  };
}

// Finnhub (ví dụ: bạn tự chuẩn hóa tại server, hoặc map trực tiếp ở đây)
export function adaptQuoteFromFinnhub(api) {
  // Ví dụ Finnhub trả về quote: { c: price, d: change, dp: changePercent, o: open, h: high, l: low, pc: prevClose }
  // và candles: { t: [timestamps], c: [close], ... }
  return {
    symbol: api.code || api.symbol,
    name: api.companyName || api.profile?.name || api.symbol,
    exchange: api.exchange || api.profile?.exchange || "",
    sector: api.sector || api.profile?.finnhubIndustry || "",
    currency: api.currency || "USD",

    price: num(api.c ?? api.price),
    change: num(api.d ?? api.change),
    changePct: num(api.dp ?? api.changePercent),
    open: num(api.o ?? api.open),
    high: num(api.h ?? api.high),
    low: num(api.l ?? api.low),
    volume: num(api.volume),

    pe: num(api.peRatio || api.metrics?.peBasicExclExtraTTM),
    eps: num(api.eps || api.metrics?.epsBasicExclExtraItemsTTM),
    week52High: num(api.week52High || api.metrics?.fiftyTwoWeekHigh),
    week52Low: num(api.week52Low || api.metrics?.fiftyTwoWeekLow),

    series: adaptFinnhubSeries(api.candles, api.symbol, api.currency || "USD"),
  };
}

// Yahoo/khác — bạn có thể thêm hàm adapt riêng tương tự 2 hàm trên

// ---- Helpers ----
function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function adaptFinnhubSeries(candles, symbol, currency) {
  if (!candles || !Array.isArray(candles.t)) return [];
  const { t, o = [], h = [], l = [], c = [], v = [] } = candles;
  return t.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().slice(0, 10),
    open: num(o[i]),
    high: num(h[i]),
    low: num(l[i]),
    close: num(c[i]),
    volume: num(v[i]),
    symbol,
    currency,
  }));
}

/**
 * Adapter tổng, chọn theo provider bạn truyền vào
 * @param {any} api  Dữ liệu thô từ endpoint của bạn
 * @param {"vndirect"|"finnhub"|"custom"} provider
 */
export function adaptQuote(api, provider = "custom") {
  switch (provider) {
    case "vndirect":
      return adaptQuoteFromVNDirect(api);
    case "finnhub":
      return adaptQuoteFromFinnhub(api);
    default:
      // Nếu bạn đã chuẩn hóa ở serverless rồi thì trả về luôn:
      return api;
  }
}
