'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ComparedProductGroup,
  PlatformOffer,
  PlatformType,
} from '../lib/types';
import { PlatformBadge } from './PlatformBadge';
import { PlatformIcon } from './PlatformIcon';
import {
  ExternalLink,
  Tag,
  Star,
  ShoppingBag,
  TrendingDown,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  LineChart,
} from 'lucide-react';

interface PriceComparisonCardProps {
  product: ComparedProductGroup;
  defaultExpanded?: boolean;
}

export const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({
  product,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPlatformName = (platform: PlatformType) => {
    switch (platform) {
      case 'shopee':
        return 'Shopee';
      case 'lazada':
        return 'Lazada';
      case 'tiktok':
        return 'TikTok Shop';
    }
  };

  const getPlatformButtonColor = (platform: PlatformType) => {
    switch (platform) {
      case 'shopee':
        return 'bg-[#ee4d2d] hover:bg-[#d03b1f] text-white shadow-orange-500/20';
      case 'lazada':
        return 'bg-[#0f146d] hover:bg-[#090d4c] text-white shadow-blue-900/20';
      case 'tiktok':
        return 'bg-zinc-900 hover:bg-black text-white shadow-zinc-900/20';
    }
  };

  const cheapestOffer = product.cheapestOffer;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-card transition-all duration-200 overflow-hidden">
      {/* Compact List Header Row - Click to Toggle Accordion */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 sm:p-4 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
      >
        {/* Mobile View (< 640px) */}
        <div className="sm:hidden space-y-2.5">
          <div className="flex items-start gap-3">
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.mainImageUrl}
                alt={product.canonicalTitle}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-1 left-1">
                <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-black/75 text-white backdrop-blur-xs">
                  {product.brand}
                </span>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  {product.category}
                </span>
                <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  {product.averageRating}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                  <PlatformIcon platform={cheapestOffer.platform} className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{getPlatformName(cheapestOffer.platform)} ถูกสุด</span>
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-orange-600">
                {product.canonicalTitle}
              </h3>
            </div>
          </div>

          {/* Platform Mini Price Pills with Icons on Mobile */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {product.offers.map((offer) => {
              const isCheapest = offer.id === cheapestOffer.id;
              return (
                <span
                  key={offer.id}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium flex items-center gap-1 ${
                    isCheapest
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <PlatformIcon platform={offer.platform} className="w-3 h-3 flex-shrink-0" />
                  <span className="capitalize">{getPlatformName(offer.platform)}:</span>
                  <span className={isCheapest ? 'text-emerald-700 font-black' : 'text-slate-800 font-semibold'}>
                    {formatPrice(offer.price)}
                  </span>
                  {isCheapest && (
                    <span className="text-[8px] bg-emerald-600 text-white px-1 rounded-sm font-bold">
                      ถูกสุด
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Price Summary & Expand Bar */}
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <PlatformIcon platform={cheapestOffer.platform} className="w-4 h-4 flex-shrink-0" />
                <span className="text-base font-black text-emerald-600 tracking-tight">
                  {formatPrice(product.lowestPrice)}
                </span>
                {product.highestPrice > product.lowestPrice && (
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatPrice(product.highestPrice)}
                  </span>
                )}
                <span className="text-[10px] font-bold text-slate-500">
                  ({getPlatformName(cheapestOffer.platform)})
                </span>
              </div>
              {product.priceDifference > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block mt-0.5">
                  ประหยัด {formatPrice(product.priceDifference)} ({product.savingsPercent}%)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/product/${encodeURIComponent(product.id)}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-600 border border-slate-200 hover:border-orange-300 transition-all shadow-2xs active:scale-95"
                title="ดูกราฟประวัติราคา"
                aria-label="ดูกราฟประวัติราคา"
              >
                <LineChart className="w-5 h-5 text-slate-600" />
              </Link>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 ${
                  isExpanded
                    ? 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                    : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span>{isExpanded ? 'ย่อรายละเอียด' : `ดูราคา (${product.offers.length})`}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-orange-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View (>= 640px) */}
        <div className="hidden sm:flex sm:items-center justify-between gap-4">
          {/* Left: Thumbnail + Title + Meta */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.mainImageUrl}
                alt={product.canonicalTitle}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-1 left-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/75 text-white backdrop-blur-xs">
                  {product.brand}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{product.averageRating}</span>
                  <span className="text-slate-400 font-normal">
                    (ขายแล้ว {product.totalSoldCount.toLocaleString()} ชิ้น)
                  </span>
                </div>
                {product.priceDifference > 0 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ประหยัด {formatPrice(product.priceDifference)} ({product.savingsPercent}%)
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1 hover:text-orange-600">
                {product.canonicalTitle}
              </h3>

              {/* Platform Mini Price Pills */}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {product.offers.map((offer) => {
                  const isCheapest = offer.id === cheapestOffer.id;
                  return (
                    <span
                      key={offer.id}
                      className={`text-[11px] px-2 py-0.5 rounded-lg border font-medium flex items-center gap-1.5 ${
                        isCheapest
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <PlatformIcon platform={offer.platform} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="capitalize">{getPlatformName(offer.platform)}:</span>
                      <span className={isCheapest ? 'text-emerald-700 font-black' : 'text-slate-800 font-semibold'}>
                        {formatPrice(offer.price)}
                      </span>
                      {isCheapest && (
                        <span className="text-[9px] bg-emerald-600 text-white px-1 rounded-sm font-bold ml-0.5">
                          ถูกสุด
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Best Price & Action Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium flex items-center justify-end gap-1">
                <span>ราคาถูกที่สุดจาก</span>
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <PlatformIcon platform={cheapestOffer.platform} className="w-3 h-3 flex-shrink-0" />
                  {getPlatformName(cheapestOffer.platform)}
                </span>
              </span>
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                  {formatPrice(product.lowestPrice)}
                </span>
                {product.highestPrice > product.lowestPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.highestPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/product/${encodeURIComponent(product.id)}`}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-600 border border-slate-200 hover:border-orange-300 transition-all shadow-2xs active:scale-95"
                title="ดูกราฟแนวโน้มราคา 30 วัน"
                aria-label="ดูกราฟแนวโน้มราคา 30 วัน"
              >
                <LineChart className="w-5 h-5 text-slate-600" />
              </Link>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-all shadow-2xs active:scale-95 ${
                  isExpanded
                    ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span>{isExpanded ? 'ย่อรายละเอียด' : `ดูราคาแต่ละร้าน (${product.offers.length})`}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-orange-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Expanded Multi-Platform Comparison Breakdown */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>เปรียบเทียบข้อเสนอจาก Shopee, Lazada และ TikTok Shop</span>
            </h4>
            <span className="text-[11px] text-slate-400 whitespace-nowrap flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              อัปเดตราคาแบบเรียลไทม์
            </span>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {product.offers.map((offer) => {
              const isCheapest = offer.id === cheapestOffer.id;

              return (
                <div
                  key={offer.id}
                  className={`p-3.5 sm:p-5 rounded-2xl transition-all border shadow-2xs overflow-hidden ${
                    isCheapest
                      ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* --- 1. Mobile Optimized Layout (< 640px) --- */}
                  <div className="sm:hidden space-y-3">
                    {/* Top Row: Platform Badge + Official Store Pill + Location */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <PlatformBadge platform={offer.platform} size="sm" />
                        {offer.isOfficialShop && (
                          <span className="inline-flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" /> ร้านทางการ
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                        {offer.shopLocation}
                      </span>
                    </div>

                    {/* Middle Row: Full-width Shop Name & Metadata */}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 leading-snug">
                        {offer.shopName}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="text-amber-600 font-semibold">⭐ {offer.rating}</span>
                        <span className="text-slate-400">({offer.reviewsCount.toLocaleString()} รีวิว)</span>
                        <span className="text-slate-300">•</span>
                        <span>
                          {offer.shippingCost === 0 ? (
                            <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              ส่งฟรี
                            </span>
                          ) : (
                            `ค่าส่ง ฿${offer.shippingCost}`
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Price & CTA Button cleanly aligned */}
                    <div className="border-t border-slate-100/90 pt-3 flex flex-wrap min-[350px]:flex-nowrap items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            {formatPrice(offer.price)}
                          </span>
                          {isCheapest && (
                            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-2xs">
                              ถูกที่สุด ✨
                            </span>
                          )}
                        </div>
                        {offer.originalPrice > offer.price && (
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                            <span className="line-through text-[11px]">{formatPrice(offer.originalPrice)}</span>
                            <span className="text-rose-500 font-extrabold bg-rose-50 px-1 py-0.2 rounded border border-rose-100 text-[10px]">
                              -{offer.discountPercent}%
                            </span>
                          </div>
                        )}
                      </div>

                      <a
                        href={offer.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all w-full min-[350px]:w-auto flex-shrink-0 ${getPlatformButtonColor(
                          offer.platform
                        )}`}
                      >
                        <PlatformIcon platform={offer.platform} className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">ไปที่ {getPlatformName(offer.platform)}</span>
                        <ExternalLink className="w-3 h-3 stroke-[2.5] flex-shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* --- 2. Desktop Optimized Layout (>= 640px) --- */}
                  <div className="hidden sm:flex sm:items-center justify-between gap-4">
                    {/* Left: Platform Badge & Shop Details */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <PlatformBadge platform={offer.platform} size="md" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-bold text-slate-900 leading-tight">
                            {offer.shopName}
                          </span>
                          {offer.isOfficialShop && (
                            <span className="inline-flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap">
                              <CheckCircle2 className="w-3 h-3 mr-0.5" /> ร้านทางการ
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                          <span className="text-amber-600 font-semibold">⭐ {offer.rating}</span>
                          <span className="text-slate-400">({offer.reviewsCount.toLocaleString()} รีวิว)</span>
                          <span className="text-slate-300">•</span>
                          <span>
                            {offer.shippingCost === 0 ? (
                              <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                ส่งฟรี
                              </span>
                            ) : (
                              `ค่าส่ง ฿${offer.shippingCost}`
                            )}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-400">{offer.shopLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & CTA Button */}
                    <div className="flex items-center justify-end gap-5 flex-shrink-0">
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {formatPrice(offer.price)}
                          </span>
                          {isCheapest && (
                            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg whitespace-nowrap shadow-2xs">
                              ถูกที่สุด ✨
                            </span>
                          )}
                        </div>
                        {offer.originalPrice > offer.price && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 justify-end mt-0.5">
                            <span className="line-through">{formatPrice(offer.originalPrice)}</span>
                            <span className="text-rose-500 font-extrabold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100">
                              -{offer.discountPercent}%
                            </span>
                          </div>
                        )}
                      </div>

                      <a
                        href={offer.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold shadow-sm hover:shadow-md transition-all whitespace-nowrap ${getPlatformButtonColor(
                          offer.platform
                        )}`}
                      >
                        <PlatformIcon platform={offer.platform} className="w-4 h-4 flex-shrink-0" />
                        <span>ไปที่ {getPlatformName(offer.platform)}</span>
                        <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
