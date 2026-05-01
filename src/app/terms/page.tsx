import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 - nowtools.kr",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-10 text-sm leading-relaxed">
            <section className="space-y-4">
              <p>본 약관은 nowtools.kr (이하 "서비스")이 제공하는 AI·디자인·무료 툴 디렉토리 서비스의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>
              <p className="font-medium text-gray-900">시행일자: 2026년 4월 24일</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">1. 용어의 정의</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>"서비스"</strong>란 nowtools.kr이 운영하는 웹사이트 및 관련 부가 서비스 전체를 말합니다.</li>
                <li><strong>"사용자"</strong>란 본 약관에 따라 서비스가 제공하는 콘텐츠를 열람하고 이용하는 모든 방문자를 말합니다.</li>
                <li><strong>"콘텐츠"</strong>란 서비스 내에서 제공되는 툴 정보, 블로그 글, 카테고리, 이미지 등 모든 자료를 말합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">2. 약관의 효력 및 변경</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.</li>
                <li>운영자는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 안내합니다.</li>
                <li>변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있으며, 계속 이용할 경우 변경된 약관에 동의한 것으로 간주합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. 서비스의 제공 및 변경</h2>
              <p className="mb-4">nowtools.kr은 아래와 같은 서비스를 제공합니다.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI·디자인·무료 툴 디렉토리 및 카테고리별 정보 제공</li>
                <li>매일 업데이트되는 AI 뉴스 및 급상승 툴 블로그</li>
                <li>툴 상세 정보 및 공식 사이트 연결</li>
              </ul>
              <p className="mt-4">서비스의 내용은 운영 사정에 따라 변경되거나 일시 중단될 수 있으며, 이 경우 사전 또는 사후 공지를 통해 안내합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">4. 사용자의 의무</h2>
              <p className="mb-4">사용자는 서비스를 이용함에 있어 아래 사항을 준수해야 합니다.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스 내 콘텐츠를 무단으로 복제·수정하여 영리적 목적으로 사용하는 행위 금지</li>
                <li>서비스의 정상적인 운영을 방해하는 행위 금지</li>
                <li>타인의 명예를 훼손하거나 피해를 주는 행위 금지</li>
                <li>관련 법령 및 본 약관을 위반하는 행위 금지</li>
              </ul>
              <p className="mt-4 font-medium text-red-600">위 사항을 위반할 경우 운영자는 해당 사용자의 접근을 제한할 수 있습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. 지식재산권</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스 내 콘텐츠(글, 이미지, 디자인, 구성 등)의 저작권은 nowtools.kr 운영자에게 있습니다.</li>
                <li>사용자는 운영자의 사전 동의 없이 콘텐츠를 복제·배포·수정하거나 상업적으로 이용할 수 없습니다.</li>
                <li>단, 개인적·비영리적 목적의 공유는 출처를 명시한 경우 허용됩니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">6. 외부 링크 및 제3자 서비스</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스는 외부 툴 및 사이트로 연결되는 링크를 제공합니다.</li>
                <li>외부 링크를 통해 이동한 사이트는 nowtools.kr과 별개의 운영 주체이며, 해당 사이트의 내용·정책·이용에 대해 운영자는 책임을 지지 않습니다.</li>
                <li>외부 서비스 이용 전 해당 사이트의 약관 및 개인정보처리방침을 반드시 확인하시기 바랍니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">7. 책임의 제한</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스에서 제공하는 모든 정보는 참고용이며, 툴의 가격·기능·정책은 운영사 사정에 따라 변경될 수 있습니다.</li>
                <li>정보의 정확성·완전성·최신성에 대해 운영자는 보증하지 않으며, 이를 근거로 한 사용자의 결정 및 행위에 대해 책임을 지지 않습니다.</li>
                <li>서비스 이용 중 발생하는 손해에 대해 운영자의 고의 또는 중대한 과실이 없는 한 책임을 부담하지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">8. 분쟁 해결</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스 이용과 관련하여 분쟁이 발생한 경우, 운영자와 사용자는 상호 협의를 통해 해결하는 것을 원칙으로 합니다.</li>
                <li>협의가 이루어지지 않을 경우 관련 법령에 따라 처리합니다.</li>
              </ul>
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
