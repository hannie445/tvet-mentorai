import { AI_COACH_MODULE_IDS } from "./types";
import type { AiCoachModuleId, AiCoachModuleResult, AiCoachModuleSection } from "./types";

export function isAiCoachModuleId(value: string): value is AiCoachModuleId {
  return (AI_COACH_MODULE_IDS as readonly string[]).includes(value);
}

function isValidSection(value: unknown): value is AiCoachModuleSection {
  if (!value || typeof value !== "object") return false;
  const section = value as Partial<AiCoachModuleSection>;
  return (
    typeof section.heading === "string" &&
    section.heading.trim().length > 0 &&
    Array.isArray(section.items) &&
    section.items.every((item) => typeof item === "string")
  );
}

/**
 * Validates that a value conforms to the AI Coach Engine's standardized
 * response shape — { moduleId, summary, sections[] } — regardless of
 * whether it came from OpenAI, the local fallback generator, or a network
 * response. Every part of the engine (server and client) checks incoming
 * data against this single contract, so the response format stays
 * consistent no matter which source produced it.
 */
export function isValidModuleResult(value: unknown): value is AiCoachModuleResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AiCoachModuleResult>;

  return (
    typeof candidate.moduleId === "string" &&
    isAiCoachModuleId(candidate.moduleId) &&
    typeof candidate.summary === "string" &&
    candidate.summary.trim().length > 0 &&
    Array.isArray(candidate.sections) &&
    candidate.sections.every(isValidSection)
  );
}
