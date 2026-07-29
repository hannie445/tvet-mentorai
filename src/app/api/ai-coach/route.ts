import { NextResponse } from "next/server";
import {
  generateAiCoachModule,
  isAiCoachModuleId,
  type AiCoachModuleInput,
} from "@/lib/ai-coach-engine";
import { generateWithOpenAI } from "@/lib/ai-coach-engine/openai-service";

export async function POST(request: Request) {
  let body: { moduleId?: string; courseCode?: string; courseName?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { moduleId, courseCode, courseName } = body;

  if (!moduleId || !isAiCoachModuleId(moduleId)) {
    return NextResponse.json({ error: "Unknown or missing moduleId." }, { status: 400 });
  }
  if (!courseCode || !courseName) {
    return NextResponse.json(
      { error: "courseCode and courseName are required." },
      { status: 400 }
    );
  }

  const input: AiCoachModuleInput = { courseCode, courseName };

  try {
    const result = await generateWithOpenAI(moduleId, input);
    return NextResponse.json(result);
  } catch (error) {
    // Graceful degradation: never surface a hard failure to the user.
    // Log the reason server-side and fall back to a local dummy response instead.
    console.error("[ai-coach] OpenAI request failed, using local fallback:", error);
    const fallback = generateAiCoachModule(moduleId, input);
    return NextResponse.json({ ...fallback, source: "fallback" });
  }
}
