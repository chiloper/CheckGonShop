'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface FilterSidebarProps {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedPlatform,
  onSelectPlatform,
  selectedSort,
  onSelectSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
  onReset,
}) => {
  const platforms = [
    { id: 'all', label: 'ทุกแพลตฟอร์ม' },
    { id: 'shopee', label: 'Shopee' },
    { id: 'lazada', label: 'Lazada' },
    { id: 'tiktok', label: 'TikTok Shop' },
  ];

  const sortOptions = [
    { id: 'cheapest', label: 'ราคาถูกที่สุดก่อน' },
    { id: 'savings', label: 'ลดราคา / ประหยัดเยอะสุด' },
    { id: 'rating', label: 'คะแนนรีวิวสูงสุด' },
    { id: 'popular', label: 'ยอดขายสูงสุด' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <span className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" /> ตัวกรองการค้นหา
        </span>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-orange-500 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> ล้างตัวกรอง
        </button>
      </div>

      {/* Platform Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          แพลตฟอร์ม
        </h4>
        <div className="space-y-1.5">
          {platforms.map((p) => {
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPlatform(p.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {p.id === 'all' ? (
                    <span>🌐</span>
                  ) : (
                    <PlatformIcon platform={p.id} className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{p.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-orange-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          เรียงลำดับตาม
        </h4>
        <div className="space-y-1.5">
          {sortOptions.map((s) => {
            const isSelected = selectedSort === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSort(s.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-orange-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          ช่วงราคา (บาท)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="ต่ำสุด"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
          />
          <span className="text-slate-400 text-xs">-</span>
          <input
            type="number"
            placeholder="สูงสุด"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          type="button"
          onClick={onApply}
          className="mt-3 w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
        >
          นำไปใช้
        </button>
      </div>
    </div>
  );
};
