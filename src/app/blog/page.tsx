import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Navbar from '@/components/Navbar';

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">전체 AI 트렌드 & 뉴스</h1>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            나우툴즈에서 제공하는 모든 AI 도구와 최신 뉴스를 한눈에 확인하세요.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 group animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 2)}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  post.category === 'news' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {post.category === 'news' ? 'AI 뉴스' : 'AI 툴 소개'}
                </span>
                <time className="text-sm text-gray-400">{post.date}</time>
              </div>
              <Link href={`/blog/post/${post.slug}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/post/${post.slug}`}
                className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all"
              >
                자세히 보기 <span className="ml-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
