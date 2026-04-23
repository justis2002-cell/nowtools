import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-bold text-gray-900">
            nowtools<span className="text-blue-600">.kr</span>
          </Link>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} nowtools.kr. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-blue-600 transition-colors">소개</Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">이용약관</Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">개인정보처리방침</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
