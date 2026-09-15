import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';

const promptFont = Prompt({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['thai', 'latin'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CheckGonShop (เช็คก่อนช้อป) - เช็คราคา เปรียบเทียบ Shopee, Lazada, TikTok Shop',
  description:
    'CheckGonShop (เช็คก่อนช้อป) ค้นหาสินค้าแล้วเช็คราคาทันทีจาก 3 แพลตฟอร์มยอดนิยม Shopee, Lazada, และ TikTok Shop เช็คให้ชัวร์ก่อนกดซื้อ เพื่อให้คุณได้ราคาที่ถูกที่สุดเสมอ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={promptFont.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] font-sans antialiased text-slate-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 mt-16 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-800 text-sm">
                  CheckGon<span className="text-orange-500">Shop</span>
                </span>
                <span>— เช็คก่อนช้อป เปรียบเทียบราคา Shopee • Lazada • TikTok Shop</span>
              </div>
              <div className="flex items-center gap-6">
                <span>🟠 Shopee</span>
                <span>🔵 Lazada</span>
                <span>⚫ TikTok Shop</span>
              </div>
              <p>© {new Date().getFullYear()} CheckGonShop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
