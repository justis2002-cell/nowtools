"use client";

import { Tool } from "@/types/tool";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { mockTools } from "@/data/mockTools";
import { useMemo } from "react";
import Link from "next/link";

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
}

const categoryTags: Record<string, string[]> = {
  "AI 툴": ["글쓰기", "번역", "요약", "아이디어 발상"],
  "AI 이미지": ["이미지 생성", "일러스트", "디자인 작업", "상업용 이미지"],
  "AI 영상": ["영상 생성", "텍스트→영상", "마케팅 영상", "SNS 콘텐츠"],
  "AI 영상편집": ["자막 생성", "영상 편집", "쇼츠 제작", "더빙"],
  "AI 음악": ["음악 생성", "작곡", "배경음악", "효과음"],
  "AI 코딩": ["코드 자동완성", "웹앱 제작", "디버깅", "노코드 개발"],
  "AI 자동화": ["업무 자동화", "워크플로우", "반복 작업 제거", "앱 연동"],
  "디자인 툴": ["UI 디자인", "그래픽 디자인", "프로토타이핑", "협업"],
  "폰트": ["한글 폰트", "상업용 무료", "웹폰트", "타이포그래피"],
  "이미지 편집": ["배경 제거", "사진 편집", "이미지 압축", "벡터 변환"],
  "무료 소스": ["스톡 이미지", "목업", "아이콘", "일러스트"],
  "SNS 툴": ["예약 발행", "SNS 관리", "콘텐츠 스케줄링", "분석"],
  "생산성": ["문서 관리", "프로젝트 관리", "협업", "할일 관리"],
  "배포/호스팅": ["웹사이트 배포", "클라우드 호스팅", "백엔드", "정적 사이트"],
  "변환 툴": ["PDF 변환", "파일 변환", "문서 편집", "형식 변환"],
  "무료 교육": ["온라인 강의", "무료 수강", "자기계발", "자격증"],
};

export default function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return mockTools
      .filter((t) => t.category === tool.category && t.id !== tool.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [tool]);

  if (!tool) return null;

  const badgeColor =
    tool.badge === "free"
      ? "badge-free"
      : tool.badge === "paid"
      ? "badge-paid"
      : "badge-freemium";

  const badgeText =
    tool.badge === "free" ? "무료" : tool.badge === "paid" ? "유료" : "부분무료";

  const tags = categoryTags[tool.category] || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
      <div className="glass w-full max-w-3xl rounded-[2.5rem] overflow-hidden relative animate-in slide-in-from-bottom-8 duration-300 my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {/* 상단: 로고 + 이름 + 뱃지 */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
            <div className="w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center border border-slate-200 shadow-2xl shrink-0 overflow-hidden">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain p-6"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <h2 className="text-4xl font-black text-white">{tool.name}</h2>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${badgeColor}`}
                >
                  {badgeText}
                </span>
              </div>
              <p className="text-slate-300 text-xl leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>
          </div>

          {/* 이런 분께 추천 태그 */}
          {tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
                이런 분께 추천해요
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 공식 사이트 버튼 */}
          <div className="flex flex-col gap-4 mb-12">
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white font-extrabold py-5 rounded-2xl transition-all shadow-lg shadow-accent/20 text-lg"
            >
              공식 사이트 바로가기 <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* 관련 툴 추천 */}
          {relatedTools.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <div className="w-1 h-4 bg-accent rounded-full" />
                함께 보면 좋은 비슷한 툴
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedTools.map((related) => (
                  <a
                    key={related.id}
                    href={related.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-4 rounded-2xl hover:border-accent/50 transition-all group flex flex-col"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={related.logo}
                        alt={related.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <h4 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors truncate">
                      {related.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {related.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 하단 푸터 */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col items-center gap-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-1 group"
            >
              nowtools.kr에서 더 많은 툴 보기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
              이 포스팅은 제휴 활동의 일환으로 일정액의 수수료를 제공받을 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
