import { NextResponse } from "next/server";
import { readQuestions, writeQuestions } from "@/lib/github";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const targetId = parseInt(params.id, 10);
    const { questions, sha } = await readQuestions();
    const updated = questions.map((q) =>
      q.id === targetId ? { ...q, likes: q.likes + 1 } : q
    );
    if (!updated.find((q) => q.id === targetId)) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    await writeQuestions(updated, sha);
    const liked = updated.find((q) => q.id === targetId)!;
    return NextResponse.json({ question: liked });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
