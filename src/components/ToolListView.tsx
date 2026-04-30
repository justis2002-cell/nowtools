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
  const itemsPerPage = 50;

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
      </main>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
