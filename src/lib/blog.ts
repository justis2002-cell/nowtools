import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 컨텐츠가 저장된 기본 디렉토리
const baseDirectory = path.join(process.cwd(), 'src/content');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  category: string;
}

/**
 * 모든 포스트를 가져옵니다. (news, tools 폴더 포함)
 */
export function getAllPosts(): BlogPost[] {
  const folders = ['news', 'tools'];
  let allPostsData: BlogPost[] = [];

  folders.forEach(folder => {
    const dirPath = path.join(baseDirectory, folder);
    if (!fs.existsSync(dirPath)) return;

    const fileNames = fs.readdirSync(dirPath);
    const folderPosts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(dirPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);

        const lines = content.trim().split('\n');
        const title = data.title || lines[0].replace('# ', '') || slug;
        const date = data.date || slug.substring(0, 10);
        // 폴더 이름을 기본 카테고리로 사용하되, frontmatter가 있으면 그것을 우선함
        const category = data.category || (folder === 'news' ? 'news' : 'tools');

        // 마크다운 기호를 제거하여 요약본 생성
        const cleanContent = content
          .replace(/#+\s/g, '') // # 제거
          .replace(/(\*\*|__)(.*?)\1/g, '$2') // 굵게 제거
          .replace(/(\*|_)(.*?)\1/g, '$2') // 기울임 제거
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 링크에서 텍스트만 추출
          .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 제거
          .replace(/>\s/g, '') // 인용구 제거
          .replace(/`{1,3}.*?`{1,3}/g, '') // 코드 블록 제거
          .replace(/\n+/g, ' ') // 줄바꿈을 공백으로 변경
          .trim();

        const excerpt = cleanContent.substring(0, 150) + '...';

        return {
          slug,
          title,
          date,
          content,
          excerpt,
          category,
        };
      });

    allPostsData = allPostsData.concat(folderPosts);
  });

  // 날짜 역순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 특정 슬러그(slug)로 포스트를 찾습니다.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const folders = ['news', 'tools'];

  for (const folder of folders) {
    const fullPath = path.join(baseDirectory, folder, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const lines = content.trim().split('\n');
      const title = data.title || lines[0].replace('# ', '') || slug;
      const date = data.date || slug.substring(0, 10);
      const category = data.category || (folder === 'news' ? 'news' : 'tools');

      return {
        slug,
        title,
        date,
        content,
        excerpt: '',
        category,
      };
    }
  }

  return null;
}
