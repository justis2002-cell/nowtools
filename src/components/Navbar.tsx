"use client";

import Link from "next/link";
import { Search } from "lucide-react";

interface NavbarProps {
  onSearch?: (term: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
          nowtools<span className="text-accent">.kr</span>
        </Link>

        {onSearch && (
          <div className="relative flex-1 max-w-md mx-8 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="툴 이름을 검색하세요..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}

        {!onSearch && <div className="flex-1" />}

        <div className="flex items-center gap-6">
          <Link href="/#about" className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">
            About
          </Link>
          <Link href="/blog/tools" className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">
            급상승AI
          </Link>
          <Link href="/blog/news" className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">
            AI뉴스
          </Link>
        </div>
      </div>
    </nav>
  );
}
