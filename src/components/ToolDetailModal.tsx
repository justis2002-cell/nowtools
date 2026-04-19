"use client";

import { Tool } from "@/types/tool";
import { X, ExternalLink } from "lucide-react";

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export default function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass w-full max-w-lg rounded-[2.5rem] overflow-hidden relative animate-in slide-in-from-bottom-8 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-3xl mb-6 flex items-center justify-center border border-slate-200 shadow-xl">
              <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-4" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2">{tool.name}</h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
              tool.badge === 'free' ? 'badge-free' : 
              tool.badge === 'paid' ? 'badge-paid' : 'badge-freemium'
            }`}>
              {tool.badge === 'free' ? '무료' : tool.badge === 'paid' ? '유료' : '부분무료'}
            </span>
          </div>

          <p className="text-slate-300 text-lg text-center mb-10 leading-relaxed">
            {tool.description}
          </p>

          <a 
            href={tool.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white font-extrabold py-4 rounded-2xl transition-all shadow-lg shadow-accent/20"
          >
            공식 사이트 바로가기 <ExternalLink className="w-5 h-5" />
          </a>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              이 포스팅은 제휴 활동의 일환으로 일정액의 수수료를 제공받을 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
