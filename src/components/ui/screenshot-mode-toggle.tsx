"use client";

import { useEffect } from "react";

const SCREENSHOT_MODE_CLASS = "screenshot-mode";

/**
 * Reads the ?screenshot=1 (or ?screenshot=true) URL param on mount and toggles
 * a class on <html> that Screenshot Mode CSS rules (globals.css) key off of.
 * Renders nothing. Purely client-side by design — this is only ever needed
 * while a real browser is being used to capture a screenshot or recording,
 * so there's no SSR concern to solve here.
 */
export function ScreenshotModeToggle() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isScreenshotMode = params.get("screenshot") === "1" || params.get("screenshot") === "true";
    document.documentElement.classList.toggle(SCREENSHOT_MODE_CLASS, isScreenshotMode);
  }, []);

  return null;
}
