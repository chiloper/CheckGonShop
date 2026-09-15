'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { getSuggestions } from '../lib/api';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  size?: 'compact' | 'default' | 'large';
  onSearch?: (query: string) => void;
  showTrending?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  placeholder = 'ค้นหาสินค้า เช่น iPhone 16, หูฟัง Sony, Labubu...',
  size = 'default',
  onSearch,
  showTrending = false,
}) => {

  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (isFocused && query.trim().length > 1) {
        const results = await getSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isFocused]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQ = query.trim();
    if (!cleanQ) return;

    setIsFocused(false);
    if (onSearch) {
      onSearch(cleanQ);
    } else {
      router.push(`/search?q=${encodeURIComponent(cleanQ)}`);
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setQuery(text);
    setIsFocused(false);
    if (onSearch) {
      onSearch(text);
    } else {
      router.push(`/search?q=${encodeURIComponent(text)}`);
    }
  };

  const trendingTags = [
    'iPhone 16 Pro Max',
    'หูฟัง Sony WH-1000XM5',
    'iPad Air M2',
    'Labubu Macaron',
    'Dyson V12',
    'Nike Dunk Low',
  ];

  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <div ref={containerRef} className={`relative w-full ${isCompact ? '' : 'max-w-3xl mx-auto'}`}>
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center w-full transition-all duration-200 bg-white border ${
          isCompact
            ? isFocused
              ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-xs rounded-xl p-1'
              : 'border-slate-200 shadow-2xs hover:border-slate-300 rounded-xl p-1'
            : isFocused
            ? 'border-orange-500 ring-4 ring-orange-500/15 shadow-lg rounded-2xl'
            : 'border-slate-200 shadow-md hover:border-slate-300 rounded-2xl'
        } ${!isCompact ? (isLarge ? 'p-2 sm:p-2.5' : 'p-1.5') : ''}`}
      >
        <div className={`flex items-center justify-center flex-shrink-0 ${isCompact ? 'pl-2 sm:pl-2.5 pr-1.5' : 'pl-3 pr-2'} text-slate-400`}>
          <Search className={`${isLarge ? 'w-6 h-6' : isCompact ? 'w-4 h-4' : 'w-5 h-5'} text-orange-500`} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`min-w-0 flex-1 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none font-medium truncate ${
            isLarge ? 'text-base sm:text-lg py-1' : isCompact ? 'text-xs sm:text-sm py-0.5' : 'text-sm sm:text-base py-0.5'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="submit"
          className={`flex items-center justify-center gap-1.5 font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm shadow-orange-500/20 transition-all flex-shrink-0 ${
            isCompact
              ? 'px-3 py-1.5 rounded-lg text-xs'
              : isLarge
              ? 'px-5 sm:px-7 py-3 text-sm sm:text-base font-semibold rounded-xl'
              : 'px-4 py-2 text-xs sm:text-sm rounded-xl'
          }`}
        >
          <span>{isCompact ? 'ค้นหา' : 'เปรียบเทียบ'}</span>
          {!isCompact && <ArrowRight className="w-4 h-4 hidden sm:inline-block" />}
        </button>
      </form>


      {/* Instant Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in-50">
          <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium px-3">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> แนะนำการค้นหา
            </span>
          </div>
          <ul className="py-1">
            {suggestions.map((item, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500" />
                    {item}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ดูราคา 3 แพลตฟอร์ม &rarr;
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trending pills underneath */}
      {showTrending && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-orange-500" /> กำลังฮิต:
          </span>
          {trendingTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(tag)}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-slate-600 transition-colors border border-slate-200/70"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
