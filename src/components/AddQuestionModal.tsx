"use client";

import { useState } from "react";
import { CATEGORIES } from "./CategoryFilter";

interface Props {
  onClose: () => void;
  onAdd: (category: string, content: string, description: string) => Promise<void>;
}

export default function AddQuestionModal({ onClose, onAdd }: Props) {
  const [category, setCategory] = useState<string>(CATEGORIES[0].key);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError("質問内容を入力してください");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onAdd(category, content, description);
      onClose();
    } catch {
      setError("保存に失敗しました。もう一度試してください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card w-full rounded-t-2xl p-5 pb-8"
        style={{ border: "1px solid #9333ea60", boxShadow: "0 -4px 40px #9333ea30" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="neon-cyan text-base"
            style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
          >
            NEW QUESTION
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl leading-none"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs mb-1" style={{ color: "#c084fc", fontFamily: "'Orbitron', sans-serif" }}>
              カテゴリ
            </label>
            <select
              className="neon-select w-full rounded-lg px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>[{c.key}] {c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: "#c084fc", fontFamily: "'Orbitron', sans-serif" }}>
              質問内容
            </label>
            <textarea
              className="neon-input w-full rounded-lg px-3 py-2 text-sm resize-none"
              rows={3}
              placeholder="質問を入力..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: "#c084fc", fontFamily: "'Orbitron', sans-serif" }}>
              補足・詳細 <span style={{ color: "#9333ea99" }}>(任意)</span>
            </label>
            <textarea
              className="neon-input w-full rounded-lg px-3 py-2 text-sm resize-none"
              rows={3}
              placeholder="補足説明や背景など..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs neon-pink">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-neon-cyan rounded-xl py-3 text-sm w-full mt-1"
          >
            {loading ? "SENDING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}
