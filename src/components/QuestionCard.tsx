"use client";

import { useState } from "react";
import { Question } from "@/lib/github";

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300];

interface Props {
  question: Question;
  onLike: (id: number) => void;
  onOpen: (question: Question) => void;
}

export default function QuestionCard({ question, onLike, onOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [bursting, setBursting] = useState(false);

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (loading) return;
    setBursting(true);
    setLoading(true);
    await onLike(question.id);
    setLoading(false);
    setTimeout(() => setBursting(false), 700);
  }

  return (
    <button
      className="glass-card rounded-xl p-4 mb-3 w-full text-left"
      onClick={() => onOpen(question)}
      aria-label={`質問#${question.id}の詳細を見る`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs neon-cyan opacity-70" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              #{String(question.id).padStart(2, "0")}
            </span>
            <span className="category-badge">{question.category}</span>
            {question.description && (
              <span className="text-xs" style={{ color: "#9333ea99" }}>▶</span>
            )}
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
        <div className="relative" style={{ overflow: "visible" }}>
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

          {bursting && (
            <>
              <div className="like-ring" />
              <div className="like-float-heart">♥</div>
              {SPARK_ANGLES.map((angle) => (
                <div
                  key={angle}
                  className="like-spark"
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </button>
  );
}
