import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductDetail } from '../../../lib/api';
import { PlatformBadge } from '../../../components/PlatformBadge';
import { PriceTrendChart } from '../../../components/PriceTrendChart';
import { SimilarProductsSection } from '../../../components/SimilarProductsSection';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Truck,
  Share2,
} from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return [
    { id: 'iPhone 16' },
    { id: 'iPhone' },
    { id: 'iPad Air' },
    { id: 'หูฟัง' },
    { id: 'Dyson' },
    { id: 'Labubu' },
    { id: 'Nike Dunk' },
  ];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const detail = await getProductDetail(params.id);

  if (!detail || !detail.product) {
    notFound();
  }

  const { product, priceHistory, similarProducts } = detail;
  const cheapestOffer = product.cheapestOffer;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPlatformButtonColor = (platform: string) => {
    switch (platform) {
      case 'shopee':
        return 'bg-[#ee4d2d] hover:bg-[#d03b1f] text-white';
      case 'lazada':
        return 'bg-[#0f146d] hover:bg-[#090d4c] text-white';
      case 'tiktok':
        return 'bg-zinc-900 hover:bg-black text-white';
      default:
        return 'bg-orange-500 text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับไปหน้าค้นหา
        </Link>
      </div>

      {/* Main Product Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Product Image Gallery */}
          <div className="md:col-span-5">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.mainImageUrl}
                alt={product.canonicalTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-black/70 text-white backdrop-blur-md">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info & Best Deal Spotlight */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{product.averageRating}</span>
                  <span className="text-slate-400 font-normal">
                    • ขายแล้วกว่า {product.totalSoldCount.toLocaleString()} ชิ้น
                  </span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
                {product.canonicalTitle}
              </h1>
            </div>

            {/* Cheapest Deal Highlight Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformBadge platform={cheapestOffer.platform} size="md" />
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-800">
                    ร้านที่ให้ราคาดีที่สุด ✨
                  </span>
                </div>
                {product.priceDifference > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                    ประหยัด {formatPrice(product.priceDifference)} ({product.savingsPercent}%)
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                  {formatPrice(product.lowestPrice)}
                </span>
                {product.highestPrice > product.lowestPrice && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    {formatPrice(product.highestPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-emerald-700 font-medium">
                พบข้อเสนอนี้ที่ร้าน <strong>{cheapestOffer.shopName}</strong> พร้อมจัดส่ง{' '}
                {cheapestOffer.shippingCost === 0 ? 'ฟรี' : `฿${cheapestOffer.shippingCost}`}
              </p>

              <div className="pt-2">
                <a
                  href={cheapestOffer.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${getPlatformButtonColor(
                    cheapestOffer.platform
                  )}`}
                >
                  <span>เปิดร้านค้าและสั่งซื้อเลย</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>รับประกันของแท้จาก Official Store</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>จัดส่งทั่วประเทศไทย</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table Across 3 Platforms */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900 mb-4">
          ตารางเปรียบเทียบราคาแยกตามแพลตฟอร์ม
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="pb-3 px-3">แพลตฟอร์ม</th>
                <th className="pb-3 px-3">ชื่อร้านค้า</th>
                <th className="pb-3 px-3">คะแนนรีวิว</th>
                <th className="pb-3 px-3">ค่าจัดส่ง</th>
                <th className="pb-3 px-3">ราคาสุทธิ</th>
                <th className="pb-3 px-3 text-right">การสั่งซื้อ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product.offers.map((offer) => {
                const isCheapest = offer.id === cheapestOffer.id;

                return (
                  <tr
                    key={offer.id}
                    className={isCheapest ? 'bg-emerald-50/40 font-medium' : 'hover:bg-slate-50'}
                  >
                    <td className="py-4 px-3 whitespace-nowrap">
                      <PlatformBadge platform={offer.platform} size="md" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-800">{offer.shopName}</span>
                        {offer.isOfficialShop && (
                          <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                            ทางการ
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{offer.shopLocation}</span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-amber-500 font-bold">⭐ {offer.rating}</span>
                      <span className="text-slate-400 text-xs block">
                        ({offer.reviewsCount.toLocaleString()})
                      </span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      {offer.shippingCost === 0 ? (
                        <span className="text-emerald-600 font-bold">ส่งฟรี</span>
                      ) : (
                        `฿${offer.shippingCost}`
                      )}
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="text-base font-extrabold text-slate-900">
                        {formatPrice(offer.price)}
                      </div>
                      {isCheapest && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          ถูกที่สุด!
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <a
                        href={offer.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${getPlatformButtonColor(
                          offer.platform
                        )}`}
                      >
                        <span>ไปที่ร้าน</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 30-Day Price Trend History Chart */}
      <PriceTrendChart data={priceHistory} />

      {/* Similar Products Section */}
      <SimilarProductsSection
        similarProducts={similarProducts}
        title="สินค้าใกล้เคียงที่น่าสนใจ"
        subtitle="เปรียบเทียบสเปกและราคาทางเลือกจาก Shopee, Lazada และ TikTok Shop"
      />
    </div>
  );
}
