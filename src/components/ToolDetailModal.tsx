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
    tool.badge === 'free' ? 'badge-free' : 
    tool.badge === 'paid' ? 'badge-paid' : 'badge-freemium';
  
  const badgeText = tool.badge === 'free' ? '무료' : tool.badge === 'paid' ? '유료' : '부분무료';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
      <div className="glass w-full max-w-3xl rounded-[2.5rem] overflow-hidden relative animate-in slide-in-from-bottom-8 duration-300 my-8">
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {/* 상단 섹션: 로고 + 이름 + 뱃지 */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
            <div className="w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center border border-slate-200 shadow-2xl shrink-0 overflow-hidden">
              <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-6" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <h2 className="text-4xl font-black text-white">{tool.name}</h2>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${badgeColor}`}>
                  {badgeText}
                </span>
              </div>
              <p className="text-slate-300 text-xl leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>
          </div>

          {/* 메인 버튼 */}
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

          {/* 추천 섹션 */}
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
                      <img src={related.logo} alt={related.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <h4 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors truncate">{related.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{related.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 하단 푸터 & 내부 링크 */}
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

