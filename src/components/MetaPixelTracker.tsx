import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelTracker() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the first call — index.html already fires the initial PageView
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, location.search]);

  return null;
}
