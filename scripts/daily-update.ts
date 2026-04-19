import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import dotenv from 'dotenv';

// .env.local 파일에서 환경 변수 로드
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

/**
 * Product Hunt & Google News RSS & Gemini API를 활용한 데일리 AI 정보 업데이트 스크립트
 */

const parser = new Parser();
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();

async function getProductHuntToken() {
  const response = await fetch('https://api.producthunt.com/v2/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.PRODUCT_HUNT_API_KEY,
      client_secret: process.env.PRODUCT_HUNT_API_SECRET,
      grant_type: 'client_credentials'
    })
  });
  const data = await response.json() as { access_token: string };
  return data.access_token;
}

async function fetchTopAITools(token: string) {
  const query = `
    query {
      posts(first: 3, order: RANKING, topic: "artificial-intelligence") {
        edges {
          node {
            name
            tagline
            description
            url
            votesCount
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  });

  const result = await response.json() as any;
  if (!result.data || !result.data.posts) {
    console.error('❌ Product Hunt API 오류:', result.errors || '데이터 없음');
    return [];
  }
  return result.data.posts.edges.map((edge: any) => edge.node);
}

async function fetchAINews() {
  console.log('📰 Google News RSS 수집 중...');
  const feed = await parser.parseURL('https://news.google.com/rss/search?q=AI&hl=ko&gl=KR&ceid=KR:ko');
  return feed.items.slice(0, 5).map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate
  }));
}

async function callGemini(prompt: string) {
  // 사용 가능한 모델 목록 가져오기
  const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
  const listData = await listResponse.json() as any;
  
  const availableModels = (listData.models || [])
    .map((m: any) => m.name.replace('models/', ''))
    .filter((name: string) => name.includes('gemini'));
    
  console.log(`🤖 사용 가능한 Gemini 모델: ${availableModels.join(', ')}`);

  for (const model of availableModels) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json() as any;
      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        let text = data.candidates[0].content.parts[0].text;
        // 마크다운 코드 블록 기호 제거
        text = text.replace(/^```markdown\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');
        return text;
      }
      console.warn(`⚠️ Gemini ${model} 실패:`, data.error?.message || '알 수 없는 오류');
    } catch (e: any) {
      console.warn(`⚠️ Gemini ${model} 호출 예외:`, e.message);
      continue;
    }
  }
  throw new Error('모든 Gemini 모델 호출에 실패했습니다.');
}

async function updateTools() {
  console.log('🛠️ 급상승 AI 툴 업데이트 시작...');
  const token = await getProductHuntToken();
  const tools = await fetchTopAITools(token);
  // 한국 시간(KST) 기준으로 오늘 날짜 가져오기
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);
  const date = kstDate.toISOString().split('T')[0];
  
  const prompt = `
    다음은 오늘 Product Hunt에서 인기 있는 AI 도구 TOP 3입니다:
    ${tools.map((t: any) => `- 이름: ${t.name}\n  설명: ${t.tagline}\n  상세: ${t.description}\n  URL: ${t.url}`).join('\n\n')}

    위 도구들을 소개하는 한국어 블로그 포스트를 마크다운 형식으로 작성해줘.
    포스트 최상단에 다음과 같은 형식의 Frontmatter를 포함해줘:
    ---
    title: "[오늘의 AI] ${date} 급상승 AI 툴 TOP 3 소개"
    date: "${date}"
    category: "tools"
    ---

    포스트 구성:
    1. 서론: 오늘의 AI 트렌드 요약
    2. 각 도구별 섹션: 
       - 제목은 '## 번호. 한글이름 (영문이름)' 형식으로 작성.
       - 요약, 특징을 작성.
       - 사이트 링크는 반드시 '[사이트 방문하기](URL)' 형식을 사용할 것. (URL을 생으로 노출 금지!)
    3. 결론
  `;

  const content = await callGemini(prompt);
  const fileName = `${date}-daily-ai-tools.md`;
  const filePath = path.join(process.cwd(), 'src/content/blog', fileName);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 도구 포스트 저장 완료: ${filePath}`);
}

async function updateNews() {
  console.log('🗞️ AI 뉴스 업데이트 시작...');
  const news = await fetchAINews();
  // 한국 시간(KST) 기준으로 오늘 날짜 가져오기
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);
  const date = kstDate.toISOString().split('T')[0];
  
  const prompt = `
    다음은 오늘의 주요 AI 뉴스 헤드라인입니다:
    ${news.map((n: any) => `- 제목: ${n.title}\n  링크: ${n.link}`).join('\n\n')}

    이 뉴스들을 요약 정리한 한국어 블로그 포스트를 마크다운 형식으로 작성해줘.
    포스트 최상단에 다음과 같은 형식의 Frontmatter를 포함해줘:
    ---
    title: "[AI 뉴스] ${date} 오늘의 AI 핵심 소식 브리핑"
    date: "${date}"
    category: "news"
    ---

    포스트 구성:
    1. 서론: 오늘 AI 업계의 주요 분위기
    2. 뉴스 브리핑: 
       - 각 뉴스는 '#### 번호. 기사제목' 형식으로 시작할 것.
       - 출처, 핵심 내용, 인사이트를 작성.
       - 뉴스 링크는 반드시 '[기사 원문 보기](URL)' 형식을 사용할 것. (절대로 URL을 밖으로 꺼내지 말 것!)
    3. 결론: 향후 주목해야 할 점
  `;

  const content = await callGemini(prompt);
  const fileName = `${date}-ai-news.md`;
  const filePath = path.join(process.cwd(), 'src/content/blog', fileName);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 뉴스 포스트 저장 완료: ${filePath}`);
}

async function main() {
  console.log('🚀 종합 AI 정보 업데이트 시작...');
  try {
    await updateTools().catch(e => console.error('❌ 도구 업데이트 실패:', e));
    await updateNews().catch(e => console.error('❌ 뉴스 업데이트 실패:', e));
    console.log('🏁 작업 완료!');
  } catch (error) {
    console.error('❌ 전체 작업 중 오류 발생:', error);
  }
}

main();
