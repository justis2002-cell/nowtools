import ToolListView from "@/components/ToolListView";
import { getDynamicCategories } from "@/lib/category-data";
import { Category } from "@/types/tool";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const categories = getDynamicCategories();
  // 'all'은 메인 페이지(/)에서 처리하므로 제외
  return categories
    .filter(cat => cat.id !== 'all')
    .map((cat) => ({
      slug: cat.id,
    }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  return (
    <ToolListView 
      initialCategory={slug as Category} 
      hideHero={true} 
    />
  );
}
