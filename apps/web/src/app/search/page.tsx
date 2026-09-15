'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PriceComparisonCard } from '../../components/PriceComparisonCard';
import { FilterSidebar } from '../../components/FilterSidebar';
import { PlatformIcon } from '../../components/PlatformIcon';

import { searchProducts } from '../../lib/api';
import { SearchResultResponse, ComparedProductGroup } from '../../lib/types';
import {
  SlidersHorizontal,
  ArrowRightLeft,
  ShoppingBag,
  Sparkles,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';


function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') || '';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialSort = searchParams.get('sort') || 'cheapest';

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<SearchResultResponse | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCurrentPage(1);
      try {
        const res = await searchProducts({
          q: query,
          platform: selectedPlatform,
          sort: selectedSort,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });
        setData(res);
      } catch (err) {
        console.error('Failed to search', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, selectedPlatform, selectedSort]);

  const handleApplyFilter = async () => {
    setLoading(true);
    setMobileFilterOpen(false);
    setCurrentPage(1);
    try {
      const res = await searchProducts({
        q: query,
        platform: selectedPlatform,
        sort: selectedSort,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    try {
      const res = await searchProducts({
        q: query,
        platform: selectedPlatform,
        sort: selectedSort,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        refresh: true,
      });
      setData(res);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleResetFilter = () => {
    setSelectedPlatform('all');
    setSelectedSort('cheapest');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  const handleNewSearch = (newQ: string) => {
    router.push(`/search?q=${encodeURIComponent(newQ)}`);
  };

  // Pagination calculations
  const allProducts = data?.products || [];
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalProducts);
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const renderPagination = (position: 'top' | 'bottom') => {
    if (totalPages <= 1) return null;

    return (
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs ${
          position === 'top' ? 'mb-4' : 'mt-6'
        }`}
      >
        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          แสดงสินค้าที่{' '}
          <span className="font-bold text-slate-800">
            {startIndex + 1} - {endIndex}
          </span>{' '}
          จากทั้งหมด{' '}
          <span className="font-bold text-slate-800">{totalProducts}</span> รายการ
          <span className="ml-1.5 text-slate-400">
            (หน้า {currentPage} / {totalPages})
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ก่อนหน้า</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/30'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-orange-600'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span className="hidden sm:inline">ถัดไป</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Platform quick pills */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto touch-pan-x">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap mr-1 pl-1 flex-shrink-0">
            แพลตฟอร์ม:
          </span>
          {[
            { id: 'all', shortLabel: 'ทั้งหมด', label: 'ทั้งหมด (เทียบ 3 เจ้า)' },
            { id: 'shopee', shortLabel: 'Shopee', label: 'Shopee' },
            { id: 'lazada', shortLabel: 'Lazada', label: 'Lazada' },
            { id: 'tiktok', shortLabel: 'TikTok', label: 'TikTok Shop' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95 ${
                selectedPlatform === p.id
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.id === 'all' ? (
                <span className="text-xs">🌐</span>
              ) : (
                <PlatformIcon platform={p.id} className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <span className="sm:hidden">{p.shortLabel}</span>
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>ผลการค้นหา:</span>
            <span className="text-orange-600">
              {query ? `"${query}"` : 'สินค้าแนะนำทั้งหมด'}
            </span>
          </h1>
          {data && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              พบ {data.totalFound} รายการที่มีการตรวจสอบราคาระหว่าง Shopee, Lazada และ TikTok Shop
            </p>
          )}
        </div>

        {/* Action Buttons (Refresh Price + Mobile Filter) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleForceRefresh}
            disabled={isRefreshing || loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 text-xs font-bold shadow-2xs transition-all disabled:opacity-50"
            title="ดึงราคาล่าสุดจาก Shopee, Lazada และ TikTok Shop ทันที"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-500' : ''}`} />
            <span>{isRefreshing ? 'กำลังอัปเดต...' : 'อัปเดตราคาล่าสุด'}</span>
          </button>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="sm:hidden inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
            <span>ตัวกรอง</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            selectedPlatform={selectedPlatform}
            onSelectPlatform={setSelectedPlatform}
            selectedSort={selectedSort}
            onSelectSort={setSelectedSort}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          />
        </div>

        {/* Mobile Filter Sheet */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40 flex flex-col justify-end backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-4 shadow-2xl">
              <FilterSidebar
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
                selectedSort={selectedSort}
                onSelectSort={setSelectedSort}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="mt-3 w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                ปิดหน้าต่างตัวกรอง
              </button>
            </div>
          </div>
        )}

        {/* Results Stream */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
              <p className="text-slate-600 font-bold text-sm mt-3">
                กำลังเทียบราคาสินค้าจาก Shopee, Lazada, TikTok Shop...
              </p>
              <p className="text-slate-400 text-xs mt-1">
                กรุณารอสักครู่ ระบบกำลังค้นหาดีลที่ถูกที่สุดให้คุณ
              </p>
            </div>
          ) : data && data.products.length > 0 ? (
            <>
              {/* Top Pagination Controls */}
              {renderPagination('top')}

              {/* Product Comparison Cards */}
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <PriceComparisonCard
                    key={product.id}
                    product={product}
                    defaultExpanded={false}
                  />

                ))}
              </div>

              {/* Bottom Pagination Controls */}
              {renderPagination('bottom')}
            </>

          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm space-y-4">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  ไม่พบสินค้าตรงกับคำค้นหา &ldquo;{query}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  ลองค้นหาด้วยคำค้นหายอดนิยมด้านล่าง หรือตรวจสอบตัวสะกดใหม่อีกครั้ง
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['iPhone 16', 'หูฟัง Sony', 'Labubu', 'iPad', 'Dyson', 'Nike Dunk'].map(
                  (tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleNewSearch(tag)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
          <span className="text-slate-500 text-xs block mt-2">กำลังโหลดหน้าค้นหา...</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
