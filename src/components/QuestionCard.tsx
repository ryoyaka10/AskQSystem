"use client";

import { useState } from "react";
import { Question } from "@/lib/github";

interface Props {
  question: Question;
  onLike: (id: number) => void;
}

export default function QuestionCard({ question, onLike }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;
    setLoading(true);
    await onLike(question.id);
    setLoading(false);
  }

  return (
    <div className="glass-card rounded-xl p-4 mb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-orbitron neon-cyan opacity-70">
              #{String(question.id).padStart(2, "0")}
            </span>
            <span className="category-badge">{question.category}</span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, color: "#d0d0f0" }}
          >
            {question.content}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          className={`like-btn${loading ? " opacity-60" : ""}`}
          onClick={handleLike}
          disabled={loading}
          aria-label="いいね！"
        >
          <span>♥</span>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem" }}>
            {question.likes}
          </span>
        </button>
      </div>
    </div>
  );
}
