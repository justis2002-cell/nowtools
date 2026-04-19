export default function Hero() {
  return (
    <header className="py-32 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight animate-fade-in-up opacity-0">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">AI & 디자인</span> 툴을 한곳에
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200 opacity-0">
          카테고리별로 엄선된 최고의 도구들을 만나보세요.<br />
          생산성을 높여주는 AI 비서부터 아름다운 폰트까지 모두 모았습니다.
        </p>
      </div>
    </header>
  );
}
