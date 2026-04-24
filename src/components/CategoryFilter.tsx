import { Category } from "@/types/tool";
import toolsJson from "@/data/tools.json";

// 카테고리 한글명을 시스템 ID로 매핑 (mockTools.ts와 동일하게 유지)
const categoryMap: Record<string, string> = {
  "AI 툴": "ai-tool",
  "AI 이미지": "ai-image",
  "AI 영상": "ai-video",
  "AI 영상편집": "ai-video-edit",
  "AI 음악": "ai-music",
  "AI 코딩": "ai-coding",
  "AI 자동화": "ai-auto",
  "디자인 툴": "design",
  "폰트": "font",
  "이미지 편집": "image-edit",
  "무료 소스": "free-source",
  "SNS 툴": "sns",
  "생산성": "productivity",
  "배포/호스팅": "hosting",
  "변환 툴": "conversion",
  "무료 교육": "education",
  "AI 글쓰기": "ai-writing",
  "AI 프레젠테이션": "ai-presentation",
  "AI 번역/언어": "ai-language"
};

const dynamicCategories = [
  { id: 'all' as Category, label: '전체' },
  ...toolsJson.categories.map((cat) => ({
    id: (categoryMap[cat.category] || cat.category) as Category,
    label: cat.category
  }))
];

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* All categories in a clean, centered grid */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {dynamicCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id as Category)}
              className={`flex-none w-[calc(50%-8px)] sm:w-[calc(33.33%-8px)] md:w-[calc(20%-8px)] lg:w-[calc(12.5%-8px)] px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border text-center active:scale-95 hover:scale-[1.02] ${
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
