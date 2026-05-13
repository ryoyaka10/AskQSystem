"use client";

export type SortMode = "id" | "likes";

interface Props {
  mode: SortMode;
  onChange: (mode: SortMode) => void;
}

export default function SortToggle({ mode, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("id")}
        className={`btn-neon-pink rounded px-3 py-1 text-xs ${mode === "id" ? "active" : ""}`}
      >
        # ID順
      </button>
      <button
        onClick={() => onChange("likes")}
        className={`btn-neon-pink rounded px-3 py-1 text-xs ${mode === "likes" ? "active" : ""}`}
      >
        ♥ いいね順
      </button>
    </div>
  );
}
