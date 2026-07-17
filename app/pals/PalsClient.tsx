'use client';

import { PALS, Pal } from "@/data/pals";
import { PalCard } from "@/components/PalCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getPalSlug } from "@/lib/palSlug";
import Link from "next/link";
import { Search, ArrowLeft, Grid, List, Sparkles, Filter, SlidersHorizontal, Star, Globe, Menu, X } from "lucide-react";
import { useState, useMemo } from "react";

export default function PalsPageClient() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get all unique types
  const allTypes = useMemo(() => {
    const types = new Set<string>();
    PALS.forEach(pal => {
      types.add(pal.type1);
      if (pal.type2) types.add(pal.type2);
    });
    return Array.from(types).sort();
  }, []);

  // Filtered Pals
  const filteredPals = useMemo(() => {
    return PALS
      .filter(pal => {
        const matchesSearch = pal.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = !selectedType || pal.type1 === selectedType || pal.type2 === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, selectedType]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Header/Nav */}
      <nav className="sticky top-0 z-40 w-full border-b border-indigo-500/10 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                PalBreed<span className="text-indigo-600 dark:text-indigo-400">.AI</span> <span className="hidden sm:inline font-medium text-slate-400">Paldex</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                Tools
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full right-0 w-56 mt-1 py-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right group-hover:scale-100 scale-95 z-50">
                <a href="/#calculator" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Sparkles size={16} /></div>
                  Breeding Calculator
                </a>
                <a href="/pals" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><List size={16} /></div>
                  Paldex Explorer
                </a>
                <a href="/guides" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Sparkles size={16} /></div>
                  1.0 Guides
                </a>
                <a href="/map" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Globe size={16} /></div>
                  World Habitat Map
                </a>
              </div>
            </div>
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/10 transition-all"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-indigo-500/10 dark:border-white/5 bg-white dark:bg-[#050505] p-4 space-y-2 animate-in slide-in-from-top duration-200">
            <a href="/#calculator" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Sparkles size={18} className="text-indigo-500" /> Breeding Calculator
            </a>
            <a href="/pals" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <List size={18} className="text-indigo-500" /> Paldex Explorer
            </a>
            <a href="/guides" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Sparkles size={18} className="text-indigo-500" /> 1.0 Guides
            </a>
            <a href="/map" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Globe size={18} className="text-indigo-500" /> World Habitat Map
            </a>
          </div>
        )}
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">The Ultimate Paldex</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Discover all {PALS.length} Pals found in Palworld. Search, filter, and analyze their types and rarity for your next breeding session.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Pals by name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-slate-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <div className="flex bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                <List size={18} />
              </button>
            </div>

            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>

            <div className="relative shrink-0">
              <select
                className="appearance-none bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none cursor-pointer transition-all text-slate-700 dark:text-slate-200"
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value || null)}
              >
                <option value="">All Types</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredPals.length}</span> results
          </p>
          {selectedType && (
            <button
              onClick={() => setSelectedType(null)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Pal List/Grid */}
        {viewMode === 'grid' ? (
          <div className="pal-grid-enter grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredPals.map(pal => (
              <Link key={pal.id} href={`/pals/${getPalSlug(pal)}`} className="flex flex-col items-center group">
                <PalCard
                  pal={pal}
                  size="md"
                />
                <div className="mt-2 sm:mt-3 text-center">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-lg transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{pal.name}</h3>
                  <div className="flex items-center justify-center gap-1 mt-1 text-amber-500">
                    {Array.from({ length: pal.rarity }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="pal-grid-enter space-y-2 sm:space-y-3">
            {filteredPals.map(pal => (
              <Link
                key={pal.id}
                href={`/pals/${getPalSlug(pal)}`}
                className="flex items-center gap-3 sm:gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all group"
              >
                  <div className="w-16 h-16 bg-white dark:bg-black/20 rounded-xl flex items-center justify-center p-2 border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                    <img src={pal.image} alt={pal.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{pal.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        #{pal.id}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-black/20 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10">
                        {pal.type1}
                      </span>
                      {pal.type2 && (
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-black/20 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10">
                          {pal.type2}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-0.5 text-amber-500 justify-end mb-1">
                      {Array.from({ length: pal.rarity }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-slate-400">Rarity Tier {pal.rarity}</p>
                  </div>
                  <span className="p-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 opacity-0 transition-all group-hover:opacity-100">
                    <ArrowLeft className="rotate-180" size={18} />
                  </span>
              </Link>
            ))}
          </div>
        )}

        {filteredPals.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
            <Search className="mx-auto text-slate-300 dark:text-white/10 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Pals Found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => { setSearch(""); setSelectedType(null); }}
              className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-indigo-500/10 dark:border-white/5 py-12 bg-slate-50 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">PalBreed<span className="text-indigo-600 dark:text-indigo-400">.AI</span></span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            The most accurate Palworld breeding resource. Updated for 2026 with all latest game changes.
          </p>
          <div className="flex justify-center gap-8 text-sm font-bold text-slate-500 dark:text-slate-500">
            <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
            <a href="/map" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">World Map</a>
          </div>
          <p className="mt-12 text-xs text-slate-400">© 2026 PalBreed.AI • Part of the Palworld Master Breeder Network</p>
        </div>
      </footer>
    </div>
  );
}
