import { generateSetInduksi } from "./set-induksi";
import { generateAktivitiPdp } from "./aktiviti-pdp";
import { generateSemakanDokumen } from "./semak-dokumen";
import { generateContohIndustri } from "./contoh-industri";
import { isValidModuleResult } from "./validate";
import type { AiCoachModuleGenerator, AiCoachModuleId, AiCoachModuleInput, AiCoachModuleResult } from "./types";

export * from "./types";
export { isAiCoachModuleId, isValidModuleResult } from "./validate";

/** Maps each of the four connected modules to its generator function. */
const moduleGenerators: Record<AiCoachModuleId, AiCoachModuleGenerator> = {
  "set-induksi": generateSetInduksi,
  "aktiviti-pdp": generateAktivitiPdp,
  "semak-dokumen": generateSemakanDokumen,
  "contoh-industri": generateContohIndustri,
};

const AI_COACH_API_ENDPOINT = "/api/ai-coach";

/**
 * Demo Mode: when enabled via NEXT_PUBLIC_DEMO_MODE, the AI Coach Engine
 * skips the network call to /api/ai-coach entirely and always returns the
 * local dummy generator's output after a short, believable delay. This
 * guarantees fast, consistent responses during a live competition demo
 * regardless of network conditions, API quota, or OpenAI availability.
 */
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const DEMO_MODE_LATENCY_MS = 500;

/**
 * Synchronously generates a dummy AI Coach response for the given module.
 * This is a local, deterministic stand-in with no network call — used as the
 * graceful-degradation fallback on both the server (API route) and the client,
 * and as the source of truth for Demo Mode.
 */
export function generateAiCoachModule(
  moduleId: AiCoachModuleId,
  input: AiCoachModuleInput
): AiCoachModuleResult {
  const generator = moduleGenerators[moduleId];
  if (!generator) {
    throw new Error(`Unknown AI Coach module: ${moduleId}`);
  }
  return generator(input);
}

/**
 * Async entry point for the AI Coach Engine. Calls the app's own /api/ai-coach
 * route (a simple backend), which in turn calls OpenAI server-side — the API
 * key never reaches the browser. Every response, from either source, is
 * checked against the same standardized shape via isValidModuleResult().
 *
 * Resilience is two-layered:
 *  1. If the request fails or returns a malformed payload, fall back to the
 *     local dummy generator so the user still gets a usable result.
 *  2. If even the local fallback fails (should not happen for a valid
 *     moduleId, but handled defensively), the promise rejects with a clear
 *     error so calling UI can show a genuine error state instead of hanging.
 */
export async function runAiCoachModule(
  moduleId: AiCoachModuleId,
  input: AiCoachModuleInput
): Promise<AiCoachModuleResult> {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, DEMO_MODE_LATENCY_MS));
    return { ...generateAiCoachModule(moduleId, input), source: "demo" };
  }

  try {
    const response = await fetch(AI_COACH_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, ...input }),
    });

    if (!response.ok) {
      throw new Error(`AI Coach API responded with status ${response.status}`);
    }

    const data: unknown = await response.json();
    if (!isValidModuleResult(data)) {
      throw new Error("AI Coach API returned a malformed response.");
    }

    return data;
  } catch (requestError) {
    console.error("[ai-coach] Request to AI Coach API failed, using local fallback:", requestError);

    try {
      return { ...generateAiCoachModule(moduleId, input), source: "fallback" };
    } catch (fallbackError) {
      console.error("[ai-coach] Local fallback also failed:", fallbackError);
      throw new Error("AI Coach tidak dapat dihubungi buat masa ini.");
    }
  }
}
