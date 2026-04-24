import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nowtools.kr';

  // 모든 블로그 포스트 가져오기
  const posts = getAllPosts();

  // 포스트 URL 생성
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/post/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 기본 페이지들
  const routes = ['', '/blog', '/blog/news', '/blog/tools', '/about', '/privacy', '/terms'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('daily' as const) : ('monthly' as const),
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  return [...routes, ...postUrls];
}
