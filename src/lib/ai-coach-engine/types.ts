export type AiCoachModuleId =
  | "set-induksi"
  | "aktiviti-pdp"
  | "semak-dokumen"
  | "contoh-industri";

/** Canonical, single-source-of-truth list of module ids for runtime checks. */
export const AI_COACH_MODULE_IDS: readonly AiCoachModuleId[] = [
  "set-induksi",
  "aktiviti-pdp",
  "semak-dokumen",
  "contoh-industri",
];

export interface AiCoachModuleInput {
  courseCode: string;
  courseName: string;
}

export interface AiCoachModuleSection {
  heading: string;
  items: string[];
}

export type AiCoachResultSource = "openai" | "fallback" | "demo";

export interface AiCoachModuleResult {
  moduleId: AiCoachModuleId;
  summary: string;
  sections: AiCoachModuleSection[];
  source?: AiCoachResultSource;
}

export type AiCoachModuleGenerator = (input: AiCoachModuleInput) => AiCoachModuleResult;
