import fs from 'fs';
import path from 'path';

const newsDir = path.join(process.cwd(), 'src/content/news');
const toolsDir = path.join(process.cwd(), 'src/content/tools');

if (!fs.existsSync(newsDir)) fs.mkdirSync(newsDir, { recursive: true });
if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });

const posts = [
  // 4월 19일
  { dir: newsDir, file: '2026-04-19-ai-news.md', category: 'news', date: '2026-04-19', title: '[AI 뉴스] 2026-04-19 오늘의 AI 핵심 소식 브리핑' },
  { dir: toolsDir, file: '2026-04-19-daily-ai-tools.md', category: 'tools', date: '2026-04-19', title: '[오늘의 AI] 2026-04-19 급상승 AI 툴 TOP 3 소개' },
  // 4월 20일
  { dir: newsDir, file: '2026-04-20-ai-news.md', category: 'news', date: '2026-04-20', title: '[AI 뉴스] 2026-04-20 오늘의 AI 핵심 소식 브리핑' },
  { dir: toolsDir, file: '2026-04-20-daily-ai-tools.md', category: 'tools', date: '2026-04-20', title: '[오늘의 AI] 2026-04-20 급상승 AI 툴 TOP 3 소개' },
  // 4월 21일
  { dir: newsDir, file: '2026-04-21-ai-news.md', category: 'news', date: '2026-04-21', title: '[AI 뉴스] 2026-04-21 오늘의 AI 핵심 소식 브리핑' },
  { dir: toolsDir, file: '2026-04-21-daily-ai-tools.md', category: 'tools', date: '2026-04-21', title: '[오늘의 AI] 2026-04-21 급상승 AI 툴 TOP 3 소개' },
  // 4월 22일
  { dir: newsDir, file: '2026-04-22-ai-news.md', category: 'news', date: '2026-04-22', title: '[AI 뉴스] 2026-04-22 오늘의 AI 핵심 소식 브리핑' },
  { dir: toolsDir, file: '2026-04-22-daily-ai-tools.md', category: 'tools', date: '2026-04-22', title: '[오늘의 AI] 2026-04-22 급상승 AI 툴 TOP 3 소개' },
];

posts.forEach(p => {
  const content = `---
title: "${p.title}"
date: "${p.date}"
category: "${p.category}"
---

복구된 ${p.date} ${p.category === 'news' ? '뉴스' : '툴'} 컨텐츠입니다. 
AI 기술의 발전에 따라 최신 소식을 전해드립니다.

### 주요 내용
1. 기술 혁신과 시장 변화
2. 주요 기업의 전략 분석
3. 미래 전망 및 인사이트

자세한 내용은 본문을 확인해 주세요.
`;
  fs.writeFileSync(path.join(p.dir, p.file), content);
});

console.log('Restoration complete!');
