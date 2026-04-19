import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 서버가 실행 위치를 헷갈려하는 문제를 방지하기 위해 절대 경로를 더 정확히 잡습니다.
const postsDirectory = path.join(process.cwd(), 'OneDrive/Desktop/nowtools/src/content/blog');
// 만약 위 경로도 불안정하다면 아예 고정 경로를 시도합니다.
const fallbackDirectory = 'c:/Users/PC/OneDrive/Desktop/nowtools/src/content/blog';
const finalDirectory = fs.existsSync(fallbackDirectory) ? fallbackDirectory : postsDirectory;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  category: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(finalDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(finalDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(finalDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);
      
      const lines = content.trim().split('\n');
      const title = data.title || lines[0].replace('# ', '') || slug;
      const date = data.date || slug.substring(0, 10);
      const category = data.category || (slug.includes('news') ? 'news' : 'tools');
      const excerpt = lines.slice(1, 5).join(' ').substring(0, 150) + '...';

      return {
        slug,
        title,
        date,
        content,
        excerpt,
        category,
      };
    });

  // 날짜 역순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(finalDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const lines = content.trim().split('\n');
  const title = data.title || lines[0].replace('# ', '') || slug;
  const date = data.date || slug.substring(0, 10);
  const category = data.category || (slug.includes('news') ? 'news' : 'tools');

  return {
    slug,
    title,
    date,
    content,
    excerpt: '',
    category,
  };
}
