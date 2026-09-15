'use client';

import React from 'react';
import Link from 'next/link';
import { ComparedProductGroup } from '../lib/types';
import { PlatformBadge } from './PlatformBadge';
import { Sparkles, ArrowRight, ArrowRightLeft, Star } from 'lucide-react';

interface SimilarProductsSectionProps {
  similarProducts: ComparedProductGroup[];
  title?: string;
  subtitle?: string;
}

export const SimilarProductsSection: React.FC<SimilarProductsSectionProps> = ({
  similarProducts,
  title = 'สินค้าที่ใกล้เคียงกัน (ทางเลือกเปรียบเทียบราคา)',
  subtitle = 'ค้นพบสินค้ารุ่นใกล้เคียงหรือสเปกเทียบเท่า พร้อมราคาถูกที่สุดจากทั้ง 3 แพลตฟอร์ม',
}) => {
  if (!similarProducts || similarProducts.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="my-8 pt-6 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similarProducts.map((item) => {
          const cheapest = item.cheapestOffer;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.mainImageUrl}
                  alt={item.canonicalTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                    {item.brand}
                  </span>
                </div>
                {item.savingsPercent > 0 && (
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                    ลดสูงสุด {item.savingsPercent}%
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mb-1">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    <span>{item.averageRating}</span>
                    <span className="text-slate-400 font-normal">
                      • ขายแล้ว {item.totalSoldCount.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                    <Link href={`/product?id=${encodeURIComponent(item.id)}`}>
                      {item.canonicalTitle}
                    </Link>
                  </h3>
                </div>

                {/* Price & Platform Summary */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        เริ่มต้นเพียง
                      </span>
                      <span className="text-base font-extrabold text-emerald-600">
                        {formatPrice(item.lowestPrice)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block mb-0.5">
                        ถูกที่สุดที่
                      </span>
                      <PlatformBadge platform={cheapest.platform} size="sm" />
                    </div>
                  </div>

                  <Link
                    href={`/product?id=${encodeURIComponent(item.id)}`}
                    className="mt-3 w-full inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-xs font-bold border border-slate-200 hover:border-orange-200 transition-all"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>เทียบ 3 แพลตฟอร์ม</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
