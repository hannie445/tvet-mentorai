import "server-only";
import OpenAI from "openai";
import { isValidModuleResult } from "./validate";
import type { AiCoachModuleId, AiCoachModuleInput, AiCoachModuleResult } from "./types";

const MODULE_INSTRUCTIONS: Record<AiCoachModuleId, string> = {
  "set-induksi":
    "Cadangkan satu set induksi (pembuka sesi) selama 5 minit untuk seorang pensyarah TVET, termasuk soalan pencetus dan aktiviti pembuka yang menarik perhatian pelajar.",
  "aktiviti-pdp":
    "Cadangkan tiga aktiviti pengajaran dan pembelajaran (PdP) aktif yang sesuai untuk sesi kuliah ini, lengkap dengan langkah pelaksanaan ringkas.",
  "semak-dokumen":
    "Semak kesediaan dokumen pengajaran secara ringkas — nyatakan apa yang sudah lengkap dan apa yang perlu ditambah baik.",
  "contoh-industri":
    "Berikan contoh amalan industri sebenar di Malaysia yang berkaitan dengan topik ini, sesuai untuk dikongsi dengan pelajar.",
};

const SYSTEM_PROMPT =
  'Anda ialah AI Coach untuk pensyarah TVET di Malaysia. Jawab dalam Bahasa Malaysia yang ringkas dan praktikal. Balas HANYA dalam JSON sah dengan struktur ini, tiada teks lain di luar JSON: { "summary": string, "sections": [{ "heading": string, "items": string[] }] }. Sediakan antara 2 hingga 4 bahagian (sections), setiap satu dengan 2 hingga 4 item.';

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env.local (see .env.example) to enable live AI Coach responses."
    );
  }
  return new OpenAI({ apiKey });
}

/**
 * Parses OpenAI's raw JSON text and checks it against the AI Coach Engine's
 * standardized response shape using the same validator the client uses —
 * so "openai" and "fallback" results are always structurally identical.
 */
function parseModuleResult(raw: string, moduleId: AiCoachModuleId): AiCoachModuleResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("OpenAI response was not valid JSON.");
  }

  const candidate = { moduleId, ...(typeof parsed === "object" && parsed ? parsed : {}) };

  if (!isValidModuleResult(candidate)) {
    throw new Error("OpenAI response did not match the expected AI Coach module shape.");
  }

  if (candidate.sections.length === 0) {
    throw new Error("OpenAI response contained no usable sections.");
  }

  return { ...candidate, source: "openai" };
}

/**
 * Calls OpenAI to generate a live AI Coach response for the given module.
 * Server-only: reads OPENAI_API_KEY from the environment and never runs in the browser.
 * Throws on any failure (missing key, network error, malformed response) so the caller
 * (the API route) can decide how to gracefully degrade.
 */
export async function generateWithOpenAI(
  moduleId: AiCoachModuleId,
  input: AiCoachModuleInput
): Promise<AiCoachModuleResult> {
  const client = getClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const instruction = MODULE_INSTRUCTIONS[moduleId];

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${instruction}\n\nKursus: ${input.courseName} (${input.courseCode}).`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  return parseModuleResult(raw, moduleId);
}
