"use client";

export const CATEGORIES = [
  "給与・待遇",
  "勤務地・生活",
  "組織・人事",
  "業務内容",
  "福利厚生",
  "将来・キャリア",
  "その他",
] as const;

interface Props {
  selected: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  const all = ["全て", ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto scroll-hide py-1">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`btn-neon-cyan flex-shrink-0 rounded-full px-3 py-1 text-xs whitespace-nowrap ${
            selected === cat ? "active" : ""
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
