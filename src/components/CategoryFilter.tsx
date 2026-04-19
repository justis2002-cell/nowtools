import { Category } from "@/types/tool";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'ai-tool', label: 'AI 툴' },
  { id: 'ai-image', label: 'AI 이미지' },
  { id: 'ai-video', label: 'AI 영상' },
  { id: 'ai-music', label: 'AI 음악' },
  { id: 'ai-coding', label: 'AI 코딩' },
  { id: 'ai-auto', label: 'AI 자동화' },
  { id: 'design', label: '디자인 툴' },
  { id: 'font', label: '폰트' },
  { id: 'image-edit', label: '이미지 편집' },
  { id: 'free-source', label: '무료 소스' },
  { id: 'sns', label: 'SNS 툴' },
  { id: 'productivity', label: '생산성' },
  { id: 'hosting', label: '배포/호스팅' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all font-semibold text-sm ${
                activeCategory === cat.id
                  ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
