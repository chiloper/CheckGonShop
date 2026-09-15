import React from 'react';
import Link from 'next/link';
import { SearchBar } from '../components/SearchBar';
import { PriceComparisonCard } from '../components/PriceComparisonCard';
import { PlatformIcon } from '../components/PlatformIcon';
import { searchProducts } from '../lib/api';
import {
  TrendingDown,
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default async function HomePage() {
  // Fetch initial popular products for instant preview
  const initialData = await searchProducts({ q: 'iPhone' });
  const featuredProducts = initialData.products.slice(0, 3);

  const categories = [
    { label: 'สมาร์ทโฟน', query: 'iPhone 16', icon: '📱' },
    { label: 'หูฟังไร้สาย', query: 'หูฟัง', icon: '🎧' },
    { label: 'แท็บเล็ต', query: 'iPad Air', icon: '💻' },
    { label: 'เครื่องใช้ไฟฟ้า', query: 'Dyson', icon: '🧹' },
    { label: 'กล่องสุ่ม Art Toy', query: 'Labubu', icon: '🧸' },
    { label: 'รองเท้าสนีกเกอร์', query: 'Nike Dunk', icon: '👟' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-orange-50/50 via-white to-[#f8fafc]">
        {/* Ambient background blur circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />
          <div className="absolute top-32 left-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>CheckGonShop &bull; เช็คก่อนช้อป ค้นหาครั้งเดียว เปรียบเทียบครบทั้ง 3 แพลตฟอร์ม</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            เช็คราคาก่อนช้อป{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600">
              Shopee, Lazada, TikTok
            </span>{' '}
            ที่เดียวจบ
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            ค้นหาสินค้าที่คุณต้องการ แล้วระบบจะดึงราคาจากทุกแพลตฟอร์มมาแสดงทันที
            บอกชัดเจนว่าที่ไหนถูกที่สุด พร้อมแนะนำสินค้าใกล้เคียงที่คุ้มค่ากว่า
          </p>

          {/* Search Bar */}
          <div className="mt-8 sm:mt-10">
            <SearchBar size="large" showTrending={true} />
          </div>

          {/* Supported Platforms Strip */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <PlatformIcon platform="shopee" className="w-6 h-6 shadow-2xs rounded-md" />
              <span className="text-xs font-bold text-slate-700">Shopee TH</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <PlatformIcon platform="lazada" className="w-6 h-6 shadow-2xs rounded-md" />
              <span className="text-xs font-bold text-slate-700">Lazada TH</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <PlatformIcon platform="tiktok" className="w-6 h-6 shadow-2xs rounded-md" />
              <span className="text-xs font-bold text-slate-700">TikTok Shop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            หมวดหมู่สินค้ายอดนิยม
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/search?q=${encodeURIComponent(cat.query)}`}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-orange-300 hover:shadow-md hover:text-orange-600 transition-all group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600 block">
                  {cat.label}
                </span>
                <span className="text-[10px] text-slate-400">เทียบราคา &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Proposition Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                เทียบ 3 แพลตฟอร์มในคลิกเดียว
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                ไม่ต้องเปิดสลับแอประหว่าง Shopee, Lazada และ TikTok Shop ระบบรวบรวมราคามาให้ตรงหน้า
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 flex-shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                ไฮไลท์ป้ายถูกที่สุด (Best Price)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                คำนวณส่วนต่างราคา ค่าจัดส่ง และส่วนลดให้เสร็จสรรพ ประหยัดเงินในกระเป๋าได้สูงสุด
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 flex-shrink-0">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                แนะนำสินค้าที่ใกล้เคียงกัน
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                หากสินค้าหลักราคาเกินงบ ระบบจะค้นหาสินค้าสเปกใกล้เคียงมาเทียบราคาเป็นทางเลือกให้ทันที
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Price Comparisons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-orange-100 text-orange-600">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                ดีลเทียบราคายอดนิยมวันนี้
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ตัวอย่างสินค้าที่มีผู้ค้นหาและเปรียบเทียบราคามากที่สุดในขณะนี้
            </p>
          </div>

          <Link
            href="/search?q=iPhone"
            className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
          >
            ดูสินค้าทั้งหมด &rarr;
          </Link>
        </div>

        <div className="space-y-6">
          {featuredProducts.map((product) => (
            <PriceComparisonCard key={product.id} product={product} defaultExpanded={true} />
          ))}
        </div>
      </section>
    </div>
  );
}
