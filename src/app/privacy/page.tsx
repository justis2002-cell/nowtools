import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-6 text-sm leading-relaxed">
            <p>
              nowtools.kr (이하 '사이트')은 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위하여 다음과 같은 처리방침을 두고 있습니다.
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. 수집하는 개인정보 항목</h2>
              <p>본 사이트는 별도의 회원가입 없이 이용이 가능하며, 서비스 이용 과정에서 자동으로 생성되는 접속 로그, 쿠키, 방문 일시 등의 정보가 수집될 수 있습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. 개인정보의 수집 및 이용 목적</h2>
              <p>사이트는 수집한 정보를 서비스 운영 개선, 통계 분석, 그리고 보다 나은 사용자 경험 제공을 위해서만 사용합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
              <p>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. 개인정보 보호 책임자</h2>
              <ul className="list-none p-0">
                <li>운영자: cocori</li>
                <li>문의: 사이트 내 제공되는 연락수단 이용</li>
              </ul>
            </section>

            <p className="pt-8 text-gray-400">시행일자: 2026년 4월 24일</p>
          </div>
        </div>
      </main>
    </div>
  );
}
