import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">포스트를 찾을 수 없습니다.</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">블로그 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <article className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 animate-fade-in-up">
          <header className="mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
                post.category === 'news' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
              }`}>
                {post.category === 'news' ? 'AI 뉴스' : 'AI 툴 소개'}
              </span>
              <time className="text-sm text-gray-400 font-medium">{post.date}</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-a:text-blue-600">
            <ReactMarkdown
              components={{
                h1: () => null, // 이미 위에서 제목을 렌더링했으므로 본문의 h1은 숨김
                img: ({ ...props }) => (
                  <img {...props} className="rounded-2xl shadow-lg my-8" alt={props.alt || ''} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-100">
            <Link 
              href={`/blog/${post.category}`}
              className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all"
            >
              <span className="mr-1">←</span> {post.category === 'news' ? '뉴스' : '툴'} 목록으로 돌아가기
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
