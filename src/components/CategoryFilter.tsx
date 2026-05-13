"use client";

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
  return (
    <div className="flex gap-2 overflow-x-auto scroll-hide py-1">
      <button
        onClick={() => onChange("全て")}
        className={`btn-neon-cyan flex-shrink-0 rounded-full px-3 py-1 text-xs whitespace-nowrap ${selected === "全て" ? "active" : ""}`}
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        全て
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`btn-neon-cyan flex-shrink-0 rounded-full px-3 py-1 text-xs whitespace-nowrap ${selected === c.key ? "active" : ""}`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {c.key}
        </button>
      ))}
    </div>
  );
}
