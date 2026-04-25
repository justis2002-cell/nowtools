import { Category } from "@/types/tool";
import toolsJson from "@/data/tools.json";

// 카테고리 한글명을 시스템 ID로 매핑
export const categoryMap: Record<string, Category> = {
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
  "AI 번역/언어": "ai-language",
  "AI 미팅/회의": "ai-meeting",
  "레퍼런스/영감": "reference"
};

export const getDynamicCategories = () => {
  return [
    { id: 'all' as Category, label: '전체' },
    ...toolsJson.categories.map((cat) => ({
      id: (categoryMap[cat.category] || cat.category) as Category,
      label: cat.category
    }))
  ];
};

export const getCategoryLabel = (id: string) => {
  const categories = getDynamicCategories();
  const category = categories.find(cat => cat.id === id);
  return category ? category.label : id;
};
