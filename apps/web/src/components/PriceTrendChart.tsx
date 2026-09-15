'use client';

import React, { useState } from 'react';
import { PriceHistoryPoint } from '../lib/types';
import { LineChart as LineChartIcon, TrendingDown } from 'lucide-react';

interface PriceTrendChartProps {
  data: PriceHistoryPoint[];
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl">
        ยังไม่มีข้อมูลประวัติราคาสำหรับสินค้านี้
      </div>
    );
  }

  // Find min and max prices across all platforms for SVG scaling
  const allPrices: number[] = [];
  data.forEach((p) => {
    if (p.shopeePrice) allPrices.push(p.shopeePrice);
    if (p.lazadaPrice) allPrices.push(p.lazadaPrice);
    if (p.tiktokPrice) allPrices.push(p.tiktokPrice);
  });

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index: number) => {
    return paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
  };

  const getY = (price?: number) => {
    if (!price) return svgHeight - paddingY;
    const ratio = (price - minPrice) / priceRange;
    return svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
  };

  const generatePath = (key: 'shopeePrice' | 'lazadaPrice' | 'tiktokPrice') => {
    return data.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(pt[key]);
      return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
    }, '');
  };

  const formatPrice = (p?: number) => {
    if (!p) return '-';
    return `฿${p.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
            <LineChartIcon className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
              แนวโน้มประวัติราคา 30 วันที่ผ่านมา
            </h3>
            <p className="text-xs text-slate-500">
              ติดตามความเคลื่อนไหวราคาจาก Shopee, Lazada และ TikTok Shop
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-[#ee4d2d]">
            <span className="w-3 h-1 rounded-full bg-[#ee4d2d]" /> Shopee
          </span>
          <span className="flex items-center gap-1.5 text-[#0f146d]">
            <span className="w-3 h-1 rounded-full bg-[#0f146d]" /> Lazada
          </span>
          <span className="flex items-center gap-1.5 text-black">
            <span className="w-3 h-1 rounded-full bg-black" /> TikTok Shop
          </span>
        </div>
      </div>

      {/* SVG Responsive Container */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-48 sm:h-56 select-none"
        >
          {/* Background Grid */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={svgWidth - paddingX}
            y2={paddingY}
            stroke="#f1f5f9"
            strokeDasharray="4"
          />
          <line
            x1={paddingX}
            y1={svgHeight / 2}
            x2={svgWidth - paddingX}
            y2={svgHeight / 2}
            stroke="#f1f5f9"
            strokeDasharray="4"
          />
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="#e2e8f0"
          />

          {/* Min and Max Axis Labels */}
          <text
            x={paddingX - 6}
            y={paddingY + 4}
            fill="#94a3b8"
            fontSize="10"
            textAnchor="end"
          >
            {formatPrice(maxPrice)}
          </text>
          <text
            x={paddingX - 6}
            y={svgHeight - paddingY + 4}
            fill="#94a3b8"
            fontSize="10"
            textAnchor="end"
          >
            {formatPrice(minPrice)}
          </text>

          {/* Lines */}
          {/* Shopee */}
          <path
            d={generatePath('shopeePrice')}
            fill="none"
            stroke="#ee4d2d"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lazada */}
          <path
            d={generatePath('lazadaPrice')}
            fill="none"
            stroke="#0f146d"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* TikTok */}
          <path
            d={generatePath('tiktokPrice')}
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />

          {/* Data Points */}
          {data.map((pt, idx) => {
            const x = getX(idx);
            const yShopee = getY(pt.shopeePrice);
            const yLazada = getY(pt.lazadaPrice);
            const yTiktok = getY(pt.tiktokPrice);

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <circle cx={x} cy={yShopee} r="3.5" fill="#ee4d2d" />
                <circle cx={x} cy={yLazada} r="3.5" fill="#0f146d" />
                <circle cx={x} cy={yTiktok} r="3.5" fill="#000000" />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip card */}
        {hoveredIndex !== null && (
          <div className="absolute top-2 right-2 bg-slate-900/90 text-white backdrop-blur-md px-3 py-2 rounded-xl text-xs shadow-xl space-y-1">
            <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
              วันที่: {data[hoveredIndex].date}
            </div>
            <div className="flex items-center justify-between gap-3 text-orange-400">
              <span>Shopee:</span>
              <span className="font-bold">{formatPrice(data[hoveredIndex].shopeePrice)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-blue-300">
              <span>Lazada:</span>
              <span className="font-bold">{formatPrice(data[hoveredIndex].lazadaPrice)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-zinc-300">
              <span>TikTok:</span>
              <span className="font-bold">{formatPrice(data[hoveredIndex].tiktokPrice)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
