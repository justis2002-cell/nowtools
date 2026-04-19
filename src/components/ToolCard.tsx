import { Tool } from "@/types/tool";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const translateBadge = (badge: string) => {
    const map: Record<string, string> = { free: '무료', paid: '유료', freemium: '부분무료' };
    return map[badge] || badge;
  };

  return (
    <div 
      onClick={() => onClick(tool)}
      className="glass p-6 rounded-3xl hover-glow group cursor-pointer flex flex-col h-full"
    >
      <div className="w-14 h-14 bg-white rounded-2xl mb-4 flex items-center justify-center overflow-hidden border border-slate-200">
        <img 
          src={tool.logo} 
          alt={tool.name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 flex-grow">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
          tool.badge === 'free' ? 'badge-free' : 
          tool.badge === 'paid' ? 'badge-paid' : 'badge-freemium'
        }`}>
          {translateBadge(tool.badge)}
        </span>
        
        <div className="flex items-center text-accent text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          상세보기 <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
