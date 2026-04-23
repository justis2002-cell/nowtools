export default function Hero() {
  return (
    <header className="py-48 text-center relative overflow-hidden">
      {/* Background Glow - Restored */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/15 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Bookmark Hint */}
        <p className="text-slate-500 text-sm mb-6 animate-fade-in">⭐ 즐겨찾기(Ctrl+D)에 추가하세요</p>
        
        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent to-purple-400">
            AI & 디자인 & 무료
          </span>
          <br className="md:hidden" /> 툴을 한 곳에
        </h1>
        <div className="space-y-2">
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            카테고리별로 엄선된 최고의 도구들을 만나보세요.
          </p>
          <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            생산성을 높여주는 AI 비서부터 아름다운 폰트까지 모두 모았습니다.
          </p>
        </div>
      </div>
    </header>
  );
}
