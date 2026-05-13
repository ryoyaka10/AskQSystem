import { NextResponse } from "next/server";
import { readQuestions, writeQuestions } from "@/lib/github";

export async function GET() {
  try {
    const { questions } = await readQuestions();
    return NextResponse.json({ questions });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { category, content, description } = await req.json();
    if (!category || !content?.trim()) {
      return NextResponse.json({ error: "category and content are required" }, { status: 400 });
    }
    const { questions, sha } = await readQuestions();
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const newQuestion = {
      id: newId,
      category,
      content: content.trim(),
      ...(description?.trim() ? { description: description.trim() } : {}),
      likes: 0,
    };
    await writeQuestions([...questions, newQuestion], sha);
    return NextResponse.json({ question: newQuestion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
