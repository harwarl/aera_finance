"use client";

import { useEffect, useRef } from "react";

export function TradingViewChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = false;

    function mountWidget() {
      if (mounted || !container) return;
      mounted = true;

      container.innerHTML = "";

      const widget = document.createElement("div");
      widget.className = "tradingview-widget-container__widget";
      widget.style.height = "100%";
      widget.style.width = "100%";
      container.appendChild(widget);

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "#0A0F14",
        gridColor: "rgba(28, 42, 48, 0.5)",
        hide_top_toolbar: false,
        hide_legend: false,
        allow_symbol_change: false,
        support_host: "https://www.tradingview.com",
      });
      container.appendChild(script);
    }

    // TradingView's embed measures its container once, synchronously, the
    // moment its script loads — and never re-measures after that. If that
    // happens before our own layout (grid columns, fixed height) has a real
    // computed size, it locks onto a small fallback and stays there. A
    // ResizeObserver guarantees we only mount once the container actually
    // has a non-zero size, instead of guessing at a timing delay.
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        mountWidget();
        observer.disconnect();
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container h-140 w-full sm:h-200"
    />
  );
}
