"use client";

import { useEffect, useState, useCallback } from "react";
import { Question } from "@/lib/github";
import QuestionCard from "@/components/QuestionCard";
import CategoryFilter from "@/components/CategoryFilter";
import SortToggle, { SortMode } from "@/components/SortToggle";
import AddQuestionModal from "@/components/AddQuestionModal";
import QuestionDetailModal from "@/components/QuestionDetailModal";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("全て");
  const [sort, setSort] = useState<SortMode>("id");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/questions", { cache: "no-store" });
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch {
      // silently fail — show empty list
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  async function handleLike(id: number) {
    const res = await fetch(`/api/questions/${id}/like`, { method: "POST" });
    if (res.ok) {
      const { question } = await res.json();
      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? question : q))
      );
    }
  }

  async function handleAdd(cat: string, content: string, description: string) {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: cat, content, description }),
    });
    if (!res.ok) throw new Error("Failed to add");
    const { question } = await res.json();
    setQuestions((prev) => [...prev, question]);
  }

  const filtered = questions.filter(
    (q) => category === "全て" || q.category === category
  );

  const sorted = [...filtered].sort((a, b) =>
    sort === "likes" ? b.likes - a.likes : a.id - b.id
  );

  const totalCount = questions.length;

  return (
    <>
      {/* Synthwave background */}
      <div className="synthwave-bg">
        <div className="grid-horizon" />
        <div className="grid-lines" />
        <div className="sun-glow" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col max-w-md mx-auto">
        {/* Header */}
        <header className="px-4 pt-10 pb-6 text-center">
          <p
            className="text-xs mb-2 tracking-widest"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#ff2d78bb" }}
          >
            QUESTION ARCHIVE
          </p>
          <h1
            className="text-xl font-black leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="neon-cyan">東京に行くまでに</span>
            <br />
            <span style={{ color: "#e0e0ff" }}>聞きたい</span>
            <span className="neon-pink" style={{ fontSize: "2rem" }}>
              {loading ? "?" : totalCount}
            </span>
            <span style={{ color: "#e0e0ff" }}>のこと</span>
          </h1>
          <div
            className="mt-2 h-px mx-8"
            style={{ background: "linear-gradient(to right, transparent, #ff2d78, transparent)" }}
          />
        </header>

        {/* Controls */}
        <div className="px-4 mb-3">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>
        <div className="px-4 mb-4">
          <SortToggle mode={sort} onChange={setSort} />
        </div>

        {/* Question list */}
        <main className="flex-1 px-4 pb-28">
          {loading ? (
            <div className="text-center py-16">
              <p
                className="neon-cyan text-sm"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                LOADING...
              </p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-16">
              <p
                className="text-sm"
                style={{ fontFamily: "'Orbitron', sans-serif", color: "#9333ea99" }}
              >
                {category === "全て" ? "質問はまだありません" : "このカテゴリに質問はありません"}
              </p>
            </div>
          ) : (
            sorted.map((q) => (
              <QuestionCard key={q.id} question={q} onLike={handleLike} onOpen={setSelectedQuestion} />
            ))
          )}
        </main>

        {/* Add button (fixed footer) */}
        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pb-6 px-4 max-w-md mx-auto">
          <button
            className="btn-neon-pink rounded-2xl w-full py-4 text-sm"
            onClick={() => setShowModal(true)}
          >
            ＋ 質問を追加
          </button>
        </div>
      </div>

      {showModal && (
        <AddQuestionModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      {selectedQuestion && (
        <QuestionDetailModal question={selectedQuestion} onClose={() => setSelectedQuestion(null)} />
      )}
    </>
  );
}
