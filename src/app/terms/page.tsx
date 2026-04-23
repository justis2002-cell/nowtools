import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-6 text-sm leading-relaxed">
            <p>
              이 약관은 nowtools.kr (이하 '사이트')이 제공하는 서비스의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. 용어의 정의</h2>
              <p>'사용자'란 본 약관에 따라 사이트가 제공하는 정보를 열람하고 이용하는 모든 방문자를 말합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. 서비스의 제공 및 변경</h2>
              <p>본 사이트는 AI 도구 및 관련 정보에 대한 큐레이션 서비스를 제공합니다. 서비스 내용은 운영 사정에 따라 변경되거나 중단될 수 있습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. 사용자의 의무</h2>
              <p>사용자는 본 사이트의 정보를 무단으로 복제, 수정하여 영리적 목적으로 사용할 수 없으며, 타인에게 피해를 주는 행위를 해서는 안 됩니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. 책임의 제한</h2>
              <p>본 사이트에서 제공하는 정보는 참고용이며, 연결된 외부 서비스 이용으로 인해 발생하는 결과에 대해 사이트 운영자(cocori)는 책임을 지지 않습니다.</p>
            </section>

            <p className="pt-8 text-gray-400">시행일자: 2026년 4월 24일</p>
          </div>
        </div>
      </main>
    </div>
  );
}
