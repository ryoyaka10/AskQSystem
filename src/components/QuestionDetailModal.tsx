"use client";

import { Question } from "@/lib/github";
import { getCategoryLabel } from "./CategoryFilter";

interface Props {
  question: Question;
  onClose: () => void;
}

export default function QuestionDetailModal({ question, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card w-full rounded-t-2xl p-5 pb-10"
        style={{ border: "1px solid #00ffff40", boxShadow: "0 -4px 40px #00ffff20" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="text-xs neon-cyan opacity-70"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              #{String(question.id).padStart(2, "0")}
            </span>
            <span className="category-badge">{getCategoryLabel(question.category)}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl leading-none"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-4"
          style={{ background: "linear-gradient(to right, transparent, #00ffff60, transparent)" }}
        />

        {/* Content */}
        <p
          className="text-base leading-relaxed mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: "#e0e0ff" }}
        >
          {question.content}
        </p>

        {/* Description */}
        {question.description && (
          <div
            className="rounded-lg p-3 mb-4"
            style={{ background: "rgba(147, 51, 234, 0.1)", border: "1px solid #9333ea40" }}
          >
            <p
              className="text-xs mb-1"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#c084fc" }}
            >
              DETAIL
            </p>
            <p
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, color: "#c0b0e0" }}
            >
              {question.description}
            </p>
          </div>
        )}

        {/* Likes */}
        <div className="flex justify-end">
          <span className="like-btn liked" style={{ cursor: "default" }}>
            <span>♥</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem" }}>
              {question.likes}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
