"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { brand } from "@/lib/brand";

const SPLASH_DURATION_MS = 2000;
const FADE_DURATION_MS = 400;
const SESSION_STORAGE_KEY = "jpk-mentor-ai:splash-shown";

/**
 * Full-screen splash shown once per browser session when the app first
 * loads. Purely presentational branding — decorative only, so it's hidden
 * from assistive technology and never blocks or delays the real page
 * content underneath, which is already rendered and reachable.
 *
 * Session persistence uses sessionStorage: once shown, a flag is recorded
 * so refreshing or navigating within the same tab session won't replay it.
 * Closing the tab (or opening a new one without a shared session) clears
 * sessionStorage, so the splash appears again on the next fresh session —
 * this is what distinguishes "once per session" from "once ever".
 *
 * The initial render (including on the server) always assumes not-yet-shown
 * so server and client markup match for hydration; if sessionStorage says
 * otherwise, an effect immediately corrects it after mount.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let alreadyShownThisSession = false;
    try {
      alreadyShownThisSession = sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
    } catch {
      // sessionStorage unavailable (e.g. private browsing) - fail open and show the splash.
      alreadyShownThisSession = false;
    }

    if (alreadyShownThisSession) {
      setVisible(false);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    } catch {
      // Non-critical: worst case the splash can reappear on refresh in this browsing mode.
    }

    const fadeTimer = setTimeout(() => setFadingOut(true), SPLASH_DURATION_MS);
    const removeTimer = setTimeout(() => setVisible(false), SPLASH_DURATION_MS + FADE_DURATION_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-50 via-white to-purple-50 px-6 text-center transition-opacity duration-[400ms] ease-out motion-reduce:transition-none ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Logo className="h-16 w-16 rounded-3xl shadow-soft-lg sm:h-20 sm:w-20" iconClassName="h-8 w-8 sm:h-10 sm:w-10" />
      <div className="max-w-xs space-y-1">
        <p className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{brand.name}</p>
        <p className="text-sm text-slate-500 sm:text-base">{brand.tagline} for TVET Malaysia</p>
      </div>
      <span className="mt-2 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
        Powered by AI
      </span>
    </div>
  );
}
