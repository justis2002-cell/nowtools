"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import ToolDetailModal from "@/components/ToolDetailModal";
import { mockTools } from "@/data/mockTools";
import { Search } from "lucide-react";
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
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 mb-12">
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
          onCategoryChange={setActiveCategory} 
        />
        
        <ToolGrid 
          tools={filteredTools} 
          onToolClick={setSelectedTool} 
        />
      </main>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
