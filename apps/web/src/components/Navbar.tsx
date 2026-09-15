'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Menu, X, ArrowRightLeft } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { PlatformIcon } from './PlatformIcon';

function NavbarSearchBar() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams ? searchParams.get('q') || '' : '';

  return (
    <SearchBar
      initialQuery={currentQuery}
      size="compact"
      placeholder="ค้นหาสินค้า เช่น iPhone 16, Labubu..."
    />
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="hidden min-[480px]:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  CheckGon<span className="text-orange-500">Shop</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 hidden sm:inline-block">
                  เช็คก่อนช้อป
                </span>
              </div>
            </div>
          </Link>

          {/* Center: SearchBar pinned to Navbar */}
          <div className="flex-1 max-w-xl min-w-0">
            <Suspense fallback={<div className="w-full h-9 bg-slate-100 rounded-xl animate-pulse" />}>
              <NavbarSearchBar />
            </Suspense>
          </div>

          {/* Desktop Nav Links & Platform Indicators */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0 text-sm font-medium text-slate-600">
            <nav className="flex items-center gap-4">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                หน้าแรก
              </Link>
              <Link
                href="/search?q=iPhone+16+Pro+Max"
                className="hover:text-orange-600 transition-colors flex items-center gap-1 font-semibold text-slate-700 hover:text-orange-600"
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                สินค้ายอดนิยม
              </Link>
            </nav>

            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <PlatformIcon platform="shopee" className="w-5 h-5 shadow-2xs rounded-md" />
              <PlatformIcon platform="lazada" className="w-5 h-5 shadow-2xs rounded-md" />
              <PlatformIcon platform="tiktok" className="w-5 h-5 shadow-2xs rounded-md" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - only Home and Popular items per user preference */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm"
          >
            <span>🏠</span>
            <span>หน้าแรก</span>
          </Link>
          <Link
            href="/search?q=iPhone+16+Pro+Max"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm"
          >
            <span>🔥</span>
            <span>สินค้ายอดนิยม</span>
          </Link>
        </div>
      )}
    </header>
  );
};
