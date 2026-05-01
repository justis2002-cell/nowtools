import ToolListView from "@/components/ToolListView";
import { getDynamicCategories } from "@/lib/category-data";
import { Category } from "@/types/tool";
import type { Metadata } from 'next';
import { getCategoryLabel } from "@/lib/category-data";

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = getCategoryLabel(slug);
  
  return {
    title: `${label} 관련 AI 툴 모음 - nowtools.kr`,
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  return (
    <ToolListView 
      initialCategory={slug as Category} 
      hideHero={true} 
    />
  );
}
