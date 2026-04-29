import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">nowtools.kr 소개</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-10 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">쏟아지는 AI 툴, 이제 한 곳에서 찾으세요.</h2>
              
              <div className="space-y-6 text-lg">
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">이 사이트는 무엇인가요?</h3>
                  <p>매일 수백 개의 새로운 AI 툴이 등장하는 시대입니다.</p>
                  <p>어떤 툴이 진짜 쓸만한지, 무료인지 유료인지, 한국어를 지원하는지 일일이 찾아보는 건 너무 번거롭고 시간이 아깝습니다.</p>
                  <p><strong>nowtools.kr</strong>은 디자이너, 마케터, 크리에이터, 직장인 누구나 바로 쓸 수 있는 툴만 엄선해 카테고리별로 정리한 툴 디렉토리입니다.</p>
                  <p>복잡한 설명 없이, 원하는 툴을 1분 안에 찾을 수 있도록 돕는 것. 그게 이 사이트가 존재하는 이유입니다.</p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">어떤 툴을 모았나요?</h3>
                  <p>AI 챗봇, 이미지·영상·음악 생성 AI부터 AI 코딩·자동화, 디자인·폰트·이미지 편집, 무료 소스, SNS 관리·생산성·파일 변환 툴, 무료 교육 플랫폼, 레퍼런스·영감 사이트까지.</p>
                  <p>총 22개 카테고리, 200개 이상의 툴을 수록하고 있으며 실제 현업에서 활용되는 툴들만 직접 검증해 담았습니다.</p>
                  <p>단순히 이름만 나열하는 게 아닙니다. 각 툴의 특징, 무료·유료 여부, 어떤 상황에 쓰면 좋은지까지 함께 정리해 처음 쓰는 분도 바로 활용할 수 있도록 했습니다.</p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">매일 업데이트됩니다</h3>
                  <p>매일 오전 7시, Product Hunt에서 급상승하는 최신 AI 툴과 전 세계 AI 뉴스를 자동으로 수집해 블로그로 제공합니다.</p>
                  <p>Google Gemini AI와 에디터의 검수를 결합해 단순 정보 나열이 아닌, 실제로 읽히는 콘텐츠를 만들기 위해 매일 노력하고 있습니다.</p>
                  <p className="text-gray-900 font-medium">새로운 툴이 계속 추가되고 있으니 북마크 해두고 매일 확인하세요. 😊</p>
                </div>

                <div className="pt-12 border-t border-gray-100 mt-12 text-sm text-gray-500">
                  <h4 className="font-bold text-gray-700 mb-2">면책 고지</h4>
                  <p>본 사이트는 정보 제공을 목적으로 하며, 각 툴의 가격·정책·기능은 운영사 사정에 따라 언제든지 변경될 수 있습니다.</p>
                  <p>중요한 결정 전에는 반드시 해당 툴의 공식 사이트를 직접 확인하시기 바랍니다.</p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-700 mb-2">문의</h4>
                  <p>오류 제보 및 피드백 → <a href="mailto:cocori7654@gmail.com" className="text-blue-600 hover:underline">cocori7654@gmail.com</a></p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
