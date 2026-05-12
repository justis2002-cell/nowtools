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

/**
 * 특정 디렉토리 내의 마크다운 파일에서 사용된 모든 URL을 수집합니다.
 */
function getUsedUrls(directory: string): Set<string> {
  const urls = new Set<string>();
  if (!fs.existsSync(directory)) return urls;
  
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(directory, file), 'utf-8');
      // 마크다운 링크 추출: [텍스트](URL)
      const matches = content.matchAll(/\[.*?\]\((https?:\/\/.*?)\)/g);
      for (const match of matches) {
        urls.add(match[1]);
      }
    }
  }
  return urls;
}

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

async function fetchTopAITools(token: string, count = 20) {
  const query = `
    query {
      posts(first: ${count}, order: RANKING, topic: "artificial-intelligence") {
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

async function fetchAINews(count = 30) {
  console.log('📰 Google News RSS 수집 중...');
  const feed = await parser.parseURL('https://news.google.com/rss/search?q=AI&hl=ko&gl=KR&ceid=KR:ko');
  return feed.items.slice(0, count).map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate
  }));
}

async function callGemini(prompt: string) {
  let availableModels: string[] = [];
  try {
    const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
    const listData = await listResponse.json() as any;
    
    availableModels = (listData.models || [])
      .map((m: any) => m.name.replace('models/', ''))
      .filter((name: string) => name.includes('gemini') && !name.includes('vision') && !name.includes('embedding'));
  } catch (e) {
    console.warn('⚠️ 모델 목록을 가져오지 못했습니다. 기본 모델을 시도합니다.');
  }
    
  // 기본적으로 시도할 안정적인 모델들 추가 (목록에 없더라도 시도)
  const fallbackModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  availableModels = [...new Set([...availableModels, ...fallbackModels])];

  console.log(`🤖 시도할 Gemini 모델: ${availableModels.join(', ')}`);

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
        
        // 서론(예: "물론입니다...") 등 불필요한 문구 제거: 첫 '---' 지점부터 시작하게 함
        const frontmatterStart = text.indexOf('---');
        if (frontmatterStart !== -1) {
          text = text.substring(frontmatterStart);
        }
        
        return text.trim();
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
  const allTools = await fetchTopAITools(token);
  
  // 이미 사용된 툴 URL 가져오기
  const usedUrls = getUsedUrls(path.join(process.cwd(), 'src/content/tools'));
  // 중복되지 않은 툴만 필터링 후 상위 3개 선택
  const tools = allTools.filter((t: any) => !usedUrls.has(t.url)).slice(0, 3);

  if (tools.length === 0) {
    console.log('⏩ 모든 툴이 이미 소개되었습니다. 업데이트를 건너뜁니다.');
    return;
  }

  // 한국 시간(KST) 기준으로 오늘 날짜 가져오기
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);
  const date = kstDate.toISOString().split('T')[0];
  
  const prompt = `
    다음은 오늘 Product Hunt에서 인기 있는 AI 도구 TOP 3입니다:
    ${tools.map((t: any) => `- 이름: ${t.name}\n  설명: ${t.tagline}\n  상세: ${t.description}\n  URL: ${t.url}`).join('\n\n')}

    위 도구들을 소개하는 한국어 블로그 포스트를 마크다운 형식으로 작성해줘.
    분량은 공백 포함 최소 1,500자 이상의 매우 상세하고 풍성한 전문 칼럼 형식으로 작성해야 해.

    포스트 최상단에 다음 형식의 Frontmatter를 포함해줘.

    [title 작성 규칙 - 매우 중요]
    - "[오늘의 AI]" 같은 대괄호 태그 절대 금지
    - "급상승 AI 툴 TOP 3 소개" 같은 정형 문구 절대 금지
    - 소개하는 도구 3개의 핵심 기능이나 공통 테마를 분석해 사람들이 실제 검색할 키워드를 맨 앞에 배치
    - 형식: "메인 키워드: 부가 설명" 또는 "메인 키워드 - 부가 설명"
    - 좋은 예시:
      · "AI 영상 제작 도구 - Runway, Pika, Sora 비교"
      · "AI 코딩 어시스턴트 - 신규 출시 도구 3선"
    - 나쁜 예시 (절대 쓰지 말 것):
      · "[오늘의 AI] 2026-05-05 급상승 AI 툴 TOP 3 소개"
      · "오늘 주목할 만한 AI 도구"

    [description 작성 규칙 - 필수, 절대 생략 금지]
    - title의 메인 키워드를 첫 문장에 띄어쓰기까지 동일하게 포함
    - 공백 포함 150~170자
    - 담백한 정보 전달형. "전문가 관점", "심도 있는", "획기적인" 같은 자칭/과장 표현 금지

    ---
    title: "(위 규칙대로 작성)"
    description: "(위 규칙대로 작성)"
    date: "${date}"
    category: "tools"
    ---

    [YAML 문법 주의 - 매우 중요]
    - title과 description 값은 반드시 큰따옴표(")로 감쌀 것
    - 값 안에 큰따옴표(")가 들어갈 경우 작은따옴표(')로 escape하거나 제거할 것
    - 값 안에 콜론(:)이 있어도 무방하나 반드시 큰따옴표 안에 있어야 함

    포스트 구성 규칙 (19일자 원본의 형식을 반드시 지킬 것):
    1. 서론: 오늘의 AI 트렌드와 기술적 배경을 500자 내외로 풍성하게 작성.
    2. 각 도구별 섹션 (## 1. 이름 형식): 
       - **요약:** 섹션을 만들고 도구의 가치와 목적을 상세히 설명.
       - **특징:** 섹션을 만들고 최소 5개 이상의 상세 특징을 불렛 포인트(* **특징명:** 내용)로 작성.
       - 사이트 링크는 반드시 '[사이트 방문하기](URL)' 형식을 사용할 것.
    3. --- 구분선 후 **결론:** 섹션: 오늘 도구들이 주는 시사점과 미래 전망을 400자 내외로 상세히 작성.
    
    주의: "물론입니다"와 같은 대화형 문구는 절대 포함하지 말고, 오직 마크다운 내용만 출력해.
  `;

  const content = await callGemini(prompt);
  
  // SEO를 위한 영문 슬러그 생성 요청
  const slugPrompt = `
    다음 도구들의 이름을 바탕으로 URL에 사용할 짧은 영문 슬러그(slug)를 만들어줘. 
    예: meta-llama-3-tool. 공백은 하이픈(-)으로 연결하고 소문자만 사용해.
    도구 이름들: ${tools.map((t: any) => t.name).join(', ')}
    오직 슬러그 문자열만 출력해.
  `;
  const slug = (await callGemini(slugPrompt)).trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  const footerText = "\n\n더 다양한 AI 도구와 디자인 툴은 [nowtools.kr](https://nowtools.kr) 메인에서 바로 확인하실 수 있습니다.";
  const fileName = `${date}-${slug}.md`;
  const filePath = path.join(process.cwd(), 'src/content/tools', fileName);
  fs.writeFileSync(filePath, content + footerText, 'utf-8');
  console.log(`✅ 도구 포스트 저장 완료: ${filePath}`);
}

async function updateNews() {
  console.log('🗞️ AI 뉴스 업데이트 시작...');
  const allNews = await fetchAINews();
  
  // 이미 사용된 뉴스 URL 가져오기
  const usedUrls = getUsedUrls(path.join(process.cwd(), 'src/content/news'));
  // 중복되지 않은 뉴스만 필터링 후 상위 5개 선택
  const news = allNews.filter((n: any) => !usedUrls.has(n.link)).slice(0, 5);

  if (news.length === 0) {
    console.log('⏩ 새로운 뉴스가 없습니다. 업데이트를 건너뜁니다.');
    return;
  }

  // 한국 시간(KST) 기준으로 오늘 날짜 가져오기
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);
  const date = kstDate.toISOString().split('T')[0];
  
  const prompt = `
    다음은 오늘의 주요 AI 뉴스 헤드라인입니다:
    ${news.map((n: any) => `- 제목: ${n.title}\n  링크: ${n.link}`).join('\n\n')}

    이 뉴스들을 요약 정리한 한국어 블로그 포스트를 마크다운 형식으로 작성해줘.
    분량은 공백 포함 최소 1,500자 이상의 매우 상세하고 깊이 있는 전문 브리핑 형식으로 작성해야 해.

    포스트 최상단에 다음 형식의 Frontmatter를 포함해줘.

    [title 작성 규칙 - 매우 중요]
    - "[AI 뉴스]" 같은 대괄호 태그 절대 금지
    - "오늘의 AI 핵심 소식 브리핑" 같은 정형 문구 절대 금지
    - 오늘 뉴스 5개의 공통 주제를 분석해, 사람들이 실제 검색할 키워드를 맨 앞에 배치
    - 형식: "메인 키워드: 부가 설명" 또는 "메인 키워드 - 부가 설명"
    - 좋은 예시:
      · "AI 의료 진단 - 피부암 조기 발견 기술 동향"
      · "생성형 AI 저작권 - 웹툰 IP 침해 소송 분석"
      · "AI 일자리 변화 - 직무 분해 현상과 재교육 과제"
    - 나쁜 예시 (절대 쓰지 말 것):
      · "[AI 뉴스] 2026-05-05 오늘의 AI 핵심 소식 브리핑"
      · "오늘의 AI 동향 정리"

    [description 작성 규칙 - 필수, 절대 생략 금지]
    - title의 메인 키워드를 첫 문장에 띄어쓰기까지 동일하게 포함
    - 공백 포함 150~170자
    - 담백한 정보 전달형. "전문가 관점", "심도 있는", "획기적인" 같은 자칭/과장 표현 금지

    ---
    title: "(위 규칙대로 작성)"
    description: "(위 규칙대로 작성)"
    date: "${date}"
    category: "news"
    ---

    [YAML 문법 주의 - 매우 중요]
    - title과 description 값은 반드시 큰따옴표(")로 감쌀 것
    - 값 안에 큰따옴표(")가 들어갈 경우 작은따옴표(')로 escape하거나 제거할 것
    - 값 안에 콜론(:)이 있어도 무방하나 반드시 큰따옴표 안에 있어야 함

    포스트 구성 규칙 (19일자 원본의 가독성 레이아웃을 반드시 지킬 것):
    1. ### 서론: 오늘 AI 업계의 주요 분위기
       - 오늘의 거시적인 AI 트렌드를 400자 내외로 상세히 서술.
    2. ### 뉴스 브리핑: 
       - 각 뉴스는 '#### 번호. 기사제목' 형식으로 시작.
       - 각 항목 내부에 다음 불렛 포인트를 반드시 포함:
         * **출처:** 기사 출처 표기
         * **핵심 내용:** 200자 이상의 상세한 내용 요약
         * **인사이트:** 해당 뉴스가 업계에 미칠 영향 분석
         * [기사 원문 보기](URL) (URL을 생으로 노출 금지)
       - 각 뉴스 항목 사이에는 충분한 줄바꿈(빈 줄)을 넣어 가독성을 높일 것.
    3. ### 결론: 향후 주목해야 할 점
       - 오늘의 소식을 종합한 통찰력 있는 결론을 400자 내외로 상세히 서술.

    주의: "물론입니다"와 같은 불필요한 서두는 절대 포함하지 말고, 오직 마크다운 내용만 출력해.
  `;

  const content = await callGemini(prompt);

  // SEO를 위한 영문 슬러그 생성 요청
  const slugPrompt = `
    다음 뉴스 제목들을 바탕으로 URL에 사용할 짧은 영문 슬러그(slug)를 만들어줘. 
    핵심 키워드 3-4개만 뽑아서 하이픈(-)으로 연결해. 예: apple-ai-news-update
    뉴스 제목들: ${news.map((n: any) => n.title).join(', ')}
    오직 슬러그 문자열만 출력해.
  `;
  const slug = (await callGemini(slugPrompt)).trim().toLowerCase().replace(/[^a-z0-9-]/g, '');

  const footerText = "\n\n더 다양한 AI 도구와 디자인 툴은 [nowtools.kr](https://nowtools.kr) 메인에서 바로 확인하실 수 있습니다.";
  const fileName = `${date}-${slug}.md`;
  const filePath = path.join(process.cwd(), 'src/content/news', fileName);
  fs.writeFileSync(filePath, content + footerText, 'utf-8');
  console.log(`✅ 뉴스 포스트 저장 완료: ${filePath}`);
}

async function main() {
  console.log('🚀 종합 AI 정보 업데이트 시작...');
  let hasError = false;
  try {
    // 2026-05-12: 툴 자동 발행 중단. 도구 소개는 직접 작성함. 다시 켜려면 아래 5줄의 주석을 해제하세요.
    // await updateTools().catch(e => {
    //   console.error('❌ 도구 업데이트 실패:', e);
    //   hasError = true;
    // });
    
    await updateNews().catch(e => {
      console.error('❌ 뉴스 업데이트 실패:', e);
      hasError = true;
    });
    
    if (hasError) {
      console.error('⚠️ 일부 작업이 실패했습니다.');
      process.exit(1);
    }
    
    console.log('🏁 모든 작업 완료!');
  } catch (error) {
    console.error('❌ 전체 작업 중 치명적 오류 발생:', error);
    process.exit(1);
  }
}

main();
