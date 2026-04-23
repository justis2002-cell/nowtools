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
  { id: 'conversion', label: '변환 툴' },
  { id: 'education', label: '무료 교육' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* All categories in a clean, centered grid */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id as Category)}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border text-center ${
                activeCategory === category.id
                  ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
