import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { category: 'tools' },
    { category: 'news' }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const title = category === 'news' ? 'AI 뉴스' : 'AI 툴 소개';
  
  return {
    title: `${title} - nowtools.kr`,
    alternates: {
      canonical: `/blog/${category}`,
    },
  };
}

interface Props {
  params: Promise<{ category: string }>;
}

export default async function BlogListPage({ params }: Props) {
  const { category } = await params;
  const allPosts = getAllPosts();
  
  const posts = category 
    ? allPosts.filter(p => p.category === category)
    : allPosts;

  const pageTitle = category === 'news' ? '최신 AI 뉴스 브리핑' : '급상승 AI 트렌드';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">{pageTitle}</h1>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            매일 업데이트되는 최신 AI 도구와 디자인 소식을 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <article 
                key={post.slug} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${0.05 * (index % 10)}s` }}
              >
                <Link href={`/blog/post/${post.slug}`} className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      데일리 업데이트
                    </span>
                    <time className="text-xs text-gray-400">{post.date}</time>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="text-blue-600 text-sm font-semibold flex items-center gap-1 group mt-auto">
                    읽어보기 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">아직 등록된 포스트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}
