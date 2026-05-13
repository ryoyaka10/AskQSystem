"use client";

import { useState } from "react";

export const CATEGORIES = [
  { key: "費", label: "費用・補償" },
  { key: "労", label: "労働条件" },
  { key: "契", label: "住居・契約" },
  { key: "組", label: "組織・キャリア" },
  { key: "時", label: "スケジュール" },
  { key: "確", label: "書面化・決裁確認" },
] as const;

export type CategoryKey = typeof CATEGORIES[number]["key"];

export function getCategoryLabel(key: string): string {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

interface Props {
  selected: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel = selected === "全て" ? "全て" : getCategoryLabel(selected);

  function handleSelect(key: string) {
    onChange(key);
    setOpen(false);
  }

  return (
    <div>
      {/* Accordion header */}
      <button
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl"
        style={{
          background: "rgba(20, 0, 40, 0.85)",
          border: "1px solid #9333ea60",
          boxShadow: open ? "0 0 16px #9333ea30" : "none",
          transition: "box-shadow 0.2s",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "#9333ea99", fontFamily: "'Orbitron', sans-serif" }}>
            FILTER
          </span>
          <span
            className="text-sm"
            style={{ color: "#c084fc", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
          >
            {selectedLabel}
          </span>
        </div>
        <span
          className="text-xs"
          style={{
            color: "#9333ea",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {/* Accordion body */}
      {open && (
        <div
          className="mt-1 rounded-xl p-3 flex flex-col gap-2"
          style={{
            background: "rgba(15, 0, 35, 0.95)",
            border: "1px solid #9333ea40",
          }}
        >
          <button
            onClick={() => handleSelect("全て")}
            className={`text-left rounded-lg px-3 py-2 text-sm transition-all ${
              selected === "全て" ? "btn-neon-cyan active" : "btn-neon-cyan"
            }`}
          >
            全て
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => handleSelect(c.key)}
              className={`text-left rounded-lg px-3 py-2 text-sm transition-all ${
                selected === c.key ? "btn-neon-cyan active" : "btn-neon-cyan"
              }`}
            >
              [{c.key}] {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
