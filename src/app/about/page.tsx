import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">nowtools.kr 소개</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-12 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">쏟아지는 AI 툴, 이제 한 곳에서 찾으세요.</h2>
              <p className="text-lg">
                매일 수백 개의 새로운 AI 툴이 쏟아지는 시대입니다. 어떤 툴이 진짜 쓸만한지, 무료인지 유료인지, 한국어를 지원하는지 일일이 찾아보는 건 너무 번거롭습니다. **nowtools.kr**은 디자이너, 마케터, 크리에이터, 직장인 누구나 바로 쓸 수 있는 툴만 엄선해서 카테고리별로 정리했습니다.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">어떤 툴을 모았나요?</h2>
              <p className="mb-4">
                AI 글쓰기, AI 이미지 생성, AI 영상 편집, AI 음악, AI 코딩, 디자인 툴, 무료 폰트, 이미지 편집, 무료 소스, SNS 툴, 생산성 툴, 변환 툴, 무료 교육까지. 실제로 현업에서 쓰이는 툴들만 직접 검증해서 담았습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">매일 업데이트됩니다.</h2>
              <p>
                Product Hunt에서 매일 급상승하는 AI 툴과 최신 AI 뉴스를 자동으로 수집해 블로그로 제공합니다. 북마크 해두고 매일 확인하세요.
              </p>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-accent">우리의 미션</h2>
              <p className="text-lg font-medium text-gray-800">
                좋은 툴 하나가 하루의 업무를 바꿉니다. 복잡한 검색은 저희가 대신할 테니, 여러분은 창의적인 작업에만 집중하세요.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
