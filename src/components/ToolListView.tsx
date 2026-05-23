"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import ToolDetailModal from "@/components/ToolDetailModal";
import { mockTools } from "@/data/mockTools";
import { Search, ArrowRight } from "lucide-react";
import { Category, Tool } from "@/types/tool";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface ToolListViewProps {
  initialCategory?: Category;
  hideHero?: boolean;
  allPosts?: BlogPost[];
}

export default function ToolListView({ initialCategory = "all", hideHero = false, allPosts = [] }: ToolListViewProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 48;

  // 현재 URL 경로에서 카테고리 정보를 직접 추출하여 가장 정확한 상태를 유지합니다.
  const activeCategory = useMemo(() => {
    if (pathname === "/") return "all";
    if (pathname.startsWith("/category/")) {
      return pathname.replace("/category/", "") as Category;
    }
    return initialCategory;
  }, [pathname, initialCategory]);

  // 카테고리나 검색어가 바뀌면 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const filteredTools = useMemo(() => {
    return mockTools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.keywords && tool.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const newsPosts = useMemo(() => allPosts.filter(p => p.category === 'news').slice(0, 3), [allPosts]);
  const toolPosts = useMemo(() => allPosts.filter(p => p.category === 'tools').slice(0, 3), [allPosts]);

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  const displayedTools = useMemo(() => {
    if (activeCategory !== "all") return filteredTools;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTools.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTools, activeCategory, currentPage]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main>
        {!hideHero && <Hero />}
        
        {!hideHero && allPosts.length > 0 && (
          <div className="container mx-auto px-4 mt-12 mb-20 relative z-10">
            <div className="space-y-16">
              {/* AI 뉴스 섹션 */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                    최신 AI 뉴스
                  </h2>
                  <Link href="/blog/news" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                    더보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {newsPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/post/${post.slug}`} className="group">
                      <div className="glass p-6 rounded-3xl hover-glow h-full flex flex-col transition-all">
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">AI NEWS</p>
                        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                          <p className="text-slate-500 text-xs">{post.date}</p>
                          <span className="text-accent text-xs font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            읽어보기 <ArrowRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* AI 툴 섹션 */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                    <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                    오늘의 AI 툴 소식
                  </h2>
                  <Link href="/blog/tools" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                    더보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {toolPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/post/${post.slug}`} className="group">
                      <div className="glass p-6 rounded-3xl hover-glow h-full flex flex-col transition-all">
                        <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">AI TOOLS</p>
                        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                          <p className="text-slate-500 text-xs">{post.date}</p>
                          <span className="text-accent text-xs font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            읽어보기 <ArrowRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 mt-12 mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-xl">
              <Search className="ml-4 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="어떤 툴을 찾으시나요?"
                className="w-full bg-transparent border-none py-3 px-4 text-white placeholder-slate-500 focus:ring-0"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <CategoryFilter 
          activeCategory={activeCategory} 
        />
        
        <ToolGrid 
          tools={displayedTools} 
          onToolClick={setSelectedTool} 
        />

        {/* 전체 카테고리에서만 페이지네이션 표시 */}
        {activeCategory === "all" && totalPages > 1 && (
          <div className="container mx-auto px-4 mt-16 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === pageNum 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}

        {/* 📝 구글 애드센스 및 SEO 검색 노출을 위한 정적 텍스트 섹션 */}
        <div className="container mx-auto px-4 mt-24 mb-12">
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/5 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-accent rounded-full mr-3"></span>
              나우툴즈(nowtools.kr) 소개 및 AI 툴 활용 가이드
            </h2>
            <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              <p>
                <strong>나우툴즈(nowtools.kr)</strong>는 인공지능(AI), 웹 디자인, 이미지 편집, 폰트 다운로드 등 실무와 일상에 날개를 달아줄 전 세계의 다양한 디지털 유틸리티 도구들을 한데 모아 분류한 <strong>AI/디자인 툴 전문 디렉토리 사이트</strong>입니다. 빠르게 확장되는 AI 생태계 속에서, 사용자가 자신에게 꼭 필요한 도구를 시간 낭비 없이 찾고 비교할 수 있도록 체계적으로 정리해 제공합니다.
              </p>
              <p>
                저희 디렉토리는 <em>ChatGPT, Claude, Gemini</em>와 같은 범용적인 AI 챗봇 서비스부터 시작하여, <em>Midjourney, DALL-E, Stable Diffusion</em> 등 고성능 이미지 생성 인공지능, 그리고 개발 생산성을 극대화해 주는 코딩 비서와 자동화 툴까지 광범위하게 수집하고 있습니다. 또한 요금 지불 부담이 적은 <strong>무료(Free)</strong> 및 <strong>부분무료(Freemium)</strong> 필터를 제공하여 경제적인 툴 탐색을 돕고 있습니다.
              </p>
              <p>
                매일 쏟아져 나오는 AI 트렌드와 뉴스를 발 빠르게 전달하며, 각 도구의 상세한 사용법과 상업적 이용 가능 여부, 라이선스 요건 등을 면밀히 검토하여 안내하고 있습니다. 나우툴즈와 함께 스마트한 업무 자동화를 구축하고 차세대 IT 생산성을 직접 경험해 보세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
