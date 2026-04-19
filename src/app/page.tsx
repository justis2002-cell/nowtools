"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import ToolDetailModal from "@/components/ToolDetailModal";
import { mockTools } from "@/data/mockTools";
import { Category, Tool } from "@/types/tool";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const filteredTools = useMemo(() => {
    return mockTools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar onSearch={setSearchTerm} />
      
      <main>
        <Hero />
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <ToolGrid 
          tools={filteredTools} 
          onToolClick={setSelectedTool} 
        />
      </main>

      <footer className="mt-20 py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 nowtools.kr. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </footer>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
