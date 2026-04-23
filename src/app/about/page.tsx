import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">nowtools.kr 소개</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">작업 효율을 높여주는 도구 모음, nowtools.kr</h2>
              <p>
                nowtools.kr은 쏟아지는 수많은 디지털 도구들 사이에서 당신에게 꼭 필요한 툴을 가장 쉽고 빠르게 찾을 수 있도록 돕는 **AI/이미지/디자인/무료 툴 디렉토리 사이트**입니다.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">전 세계 AI 툴을 한눈에</h3>
                <p>ChatGPT부터 최신 미드저니, 영상 생성 AI까지, 전 세계에서 가장 핫한 AI 도구들을 카테고리별로 모아 제공합니다.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">디자이너를 위한 보물창고</h3>
                <p>무료 폰트, 목업, 아이콘 소스 등 디자인 작업을 획기적으로 줄여줄 필수 리소스들을 엄선했습니다.</p>
              </div>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">우리의 미션</h2>
              <p>
                우리는 누구나 적절한 도구만 있다면 자신의 아이디어를 현실로 만들 수 있다고 믿습니다. 
                복잡한 검색 과정은 저희가 대신할 테니, 여러분은 창의적인 작업에만 몰입하세요.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
