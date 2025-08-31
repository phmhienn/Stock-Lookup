// src/hooks/useFinnhubSocket.js
import { useEffect, useRef, useState } from "react";

export function useFinnhubSocket(symbols = ["VNM"], token) {
  const [prices, setPrices] = useState({});
  const wsRef = useRef();

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      // Đăng ký các mã muốn theo dõi
      symbols.forEach((sym) =>
        ws.send(JSON.stringify({ type: "subscribe", symbol: sym }))
      );
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "trade") {
        // trade: [{s: 'VNM', p: 123.4, t: timestamp}]
        for (const t of msg.data) {
          setPrices((prev) => ({
            ...prev,
            [t.s]: { price: t.p, time: t.t },
          }));
        }
      }
    };

    ws.onclose = () => console.log("Finnhub socket closed");
    ws.onerror = (e) => console.error("Finnhub ws error", e);

    return () => {
      ws.close();
    };
  }, [symbols, token]);

  return prices; // { "VNM": { price, time }, ... }
}
