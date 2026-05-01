import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - nowtools.kr",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-10 text-sm leading-relaxed">
            <section className="space-y-4">
              <p>nowtools.kr (이하 "서비스")은 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 성실히 준수합니다.</p>
              <p>본 개인정보처리방침은 서비스가 수집하는 정보의 종류, 이용 목적, 보관 기간 등에 대해 안내합니다.</p>
              <p className="font-medium text-gray-900">시행일자: 2026년 4월 24일</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">1. 수집하는 정보</h2>
              <p className="mb-4">본 서비스는 회원가입 기능이 없으며, 이름·이메일 등 개인 식별 정보를 직접 수집하지 않습니다. 다만, 서비스 이용 과정에서 아래 정보가 자동으로 수집될 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>접속 정보:</strong> IP 주소, 브라우저 종류, 운영체제, 접속 시간</li>
                <li><strong>이용 정보:</strong> 방문 페이지, 클릭한 링크, 체류 시간</li>
                <li><strong>기기 정보:</strong> 기기 유형, 화면 해상도, 언어 설정</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">2. 정보의 이용 목적</h2>
              <p className="mb-4">수집된 정보는 아래 목적으로만 이용됩니다.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스 이용 현황 분석 및 개선</li>
                <li>맞춤형 콘텐츠 및 광고 제공</li>
                <li>서비스 오류 감지 및 보안 강화</li>
                <li>관련 법령에 따른 법적 의무 이행</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. 제3자 서비스 및 광고</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Google Analytics 4</h3>
                  <p>방문자 통계 분석을 위해 Google Analytics를 사용합니다.</p>
                  <p>Google 개인정보처리방침 → <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">policies.google.com/privacy</a></p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Google AdSense 및 쿠키</h3>
                  <p>서비스는 광고 게재를 위해 Google AdSense를 이용합니다.</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Google을 포함한 제3자 공급업체는 사용자의 과거 방문 기록을 바탕으로 광고를 게재하기 위해 쿠키를 사용합니다.</li>
                    <li>사용자는 Google 광고 설정을 통해 맞춤형 광고 게재를 중단할 수 있습니다.</li>
                    <li>Google 광고 설정 → <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">adssettings.google.com</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Cloudflare</h3>
                  <p>서비스 제공 및 보안 강화를 위해 Cloudflare를 사용합니다.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">4. 쿠키 사용</h2>
              <p className="mb-4">서비스는 사용자 경험 개선 및 통계 분석을 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 기능이 제한될 수 있습니다.</p>
              <p><strong>쿠키 관리 방법:</strong> 브라우저 설정 → 개인정보 → 쿠키에서 쿠키 저장 차단 또는 삭제 가능합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. 정보 보유 기간</h2>
              <p className="mb-4">수집된 정보는 분석 목적 달성 시까지 보유하며, 관련 법령에서 정한 보관 기간이 있는 경우 해당 기간 동안 보관합니다. Google Analytics 데이터는 Google의 정책에 따라 관리됩니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">6. 사용자 권리</h2>
              <p className="mb-4">사용자는 아래 권리를 언제든지 행사할 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>개인정보 열람, 정정, 삭제 요청</li>
                <li>개인정보 처리 정지 요청</li>
                <li>맞춤형 광고 수신 거부 (Google 광고 설정에서 가능)</li>
              </ul>
              <p className="mt-4">권리 행사는 아래 문의처로 연락해 주시기 바랍니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">7. 정보 보안</h2>
              <p>서비스는 이용자 정보 보호를 위해 HTTPS 암호화 통신을 사용하며, Cloudflare 보안 서비스를 통해 악의적인 접근을 차단하고 있습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">8. 방침 변경 안내</h2>
              <p>본 개인정보처리방침은 법령 또는 서비스 정책 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.</p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">9. 문의처</h2>
              <ul className="space-y-1">
                <li><strong>운영자:</strong> cocori</li>
                <li><strong>이메일:</strong> <a href="mailto:cocori7654@gmail.com" className="text-blue-600 hover:underline">cocori7654@gmail.com</a></li>
                <li><strong>사이트:</strong> <a href="https://nowtools.kr" className="text-blue-600 hover:underline">https://nowtools.kr</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
