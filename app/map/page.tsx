'use client';

import { Pal } from "@/data/pals";
import { PalWithMap, getAllHabitats, getPalMapData, getPalsByHabitat } from "@/data/mapData";
import { PalCard } from "@/components/PalCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, MapPin, Globe, ArrowLeft, X, Star, Layers, ChevronRight, Menu } from "lucide-react";
import { useState, useMemo, useCallback } from "react";

// ─── Biome config ────────────────────────────────────────────────────────────
const BIOME_META: Record<string, { color: string; glow: string; icon: string; label: string }> = {
  forest:      { color: '#22c55e', glow: 'rgba(34,197,94,0.35)',    icon: '🌳', label: 'Forest'      },
  grassland:   { color: '#84cc16', glow: 'rgba(132,204,22,0.35)',   icon: '🌾', label: 'Grassland'   },
  desert:      { color: '#eab308', glow: 'rgba(234,179,8,0.35)',    icon: '🏜️', label: 'Desert'      },
  snow:        { color: '#38bdf8', glow: 'rgba(56,189,248,0.35)',   icon: '❄️', label: 'Snow'        },
  volcanic:    { color: '#ef4444', glow: 'rgba(239,68,68,0.35)',    icon: '🔥', label: 'Volcanic'    },
  river:       { color: '#06b6d4', glow: 'rgba(6,182,212,0.35)',    icon: '🌊', label: 'River'       },
  lake:        { color: '#0ea5e9', glow: 'rgba(14,165,233,0.35)',   icon: '💧', label: 'Lake'        },
  mountain:    { color: '#94a3b8', glow: 'rgba(148,163,184,0.35)',  icon: '⛰️', label: 'Mountain'    },
  canyon:      { color: '#a855f7', glow: 'rgba(168,85,247,0.35)',   icon: '🏔️', label: 'Canyon'      },
  jungle:      { color: '#10b981', glow: 'rgba(16,185,129,0.35)',   icon: '🌴', label: 'Jungle'      },
  ruins:       { color: '#6b7280', glow: 'rgba(107,114,128,0.35)',  icon: '🏛️', label: 'Ruins'       },
  urban:       { color: '#f59e0b', glow: 'rgba(245,158,11,0.35)',   icon: '🏙️', label: 'Urban'       },
  coastal:     { color: '#0891b2', glow: 'rgba(8,145,178,0.35)',    icon: '🏖️', label: 'Coastal'     },
  underground: { color: '#7c3aed', glow: 'rgba(124,58,237,0.35)',   icon: '🕳️', label: 'Underground' },
  ice:         { color: '#bae6fd', glow: 'rgba(186,230,253,0.35)',  icon: '🧊', label: 'Ice'         },
  ground:      { color: '#92400e', glow: 'rgba(146,64,14,0.35)',    icon: '🪨', label: 'Ground'      },
  sky:         { color: '#818cf8', glow: 'rgba(129,140,248,0.35)',  icon: '🌤️', label: 'Sky'         },
};

const COMMONNESS_BADGE: Record<string, { label: string; color: string }> = {
  common:    { label: 'Common',    color: '#22c55e' },
  uncommon:  { label: 'Uncommon',  color: '#3b82f6' },
  rare:      { label: 'Rare',      color: '#a855f7' },
  'very rare':{ label: 'Very Rare', color: '#f59e0b' },
};

export default function MapPage() {
  const [search, setSearch]                 = useState('');
  const [selectedHabitat, setSelectedHabitat] = useState<{ biome: string; regionName: string } | null>(null);
  const [selectedPal, setSelectedPal]       = useState<Pal | null>(null);
  const [sortOption, setSortOption]         = useState<'name' | 'rarity'>('name');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allHabitats = useMemo(() => getAllHabitats(), []);

  const filteredHabitats = useMemo(() => {
    if (!search) return allHabitats;
    const q = search.toLowerCase();
    return allHabitats.filter(h =>
      h.regionName.toLowerCase().includes(q) || h.biome.toLowerCase().includes(q)
    );
  }, [search, allHabitats]);

  const habitatPals = useMemo(() => {
    if (!selectedHabitat) return [];
    return getPalsByHabitat(selectedHabitat.biome as any, selectedHabitat.regionName);
  }, [selectedHabitat]);

  const filteredPals = useMemo(() => {
    let pals = habitatPals;
    if (search && selectedHabitat) {
      pals = pals.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return sortOption === 'name'
      ? [...pals].sort((a, b) => a.name.localeCompare(b.name))
      : [...pals].sort((a, b) => b.rarity - a.rarity);
  }, [search, habitatPals, sortOption, selectedHabitat]);

  const getBiomeMeta = useCallback((biome: string) => BIOME_META[biome] ?? { color: '#6366f1', glow: 'rgba(99,102,241,0.35)', icon: '📍', label: biome }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050510] text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden">

      {/* ── Ambient background ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
        />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 dark:bg-cyan-600/5 blur-[100px]" />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-[#050510]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <Globe size={20} />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  PalBreed<span className="text-indigo-600 dark:text-indigo-400">.AI</span>
                </span>
                <span className="text-slate-500 text-sm ml-2 hidden sm:inline">World Map</span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors py-2">
                Tools
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full right-0 w-56 mt-1 py-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right group-hover:scale-100 scale-95 z-50">
                <a href="/#calculator" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Star size={16} /></div>
                  Breeding Calculator
                </a>
                <a href="/pals" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Layers size={16} /></div>
                  Paldex Explorer
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
          <div className="sm:hidden border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#050510] p-4 space-y-2 animate-in slide-in-from-top duration-200">
            <a href="/#calculator" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Star size={18} className="text-indigo-500" /> Breeding Calculator
            </a>
            <a href="/pals" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Layers size={18} className="text-indigo-500" /> Paldex Explorer
            </a>
            <a href="/map" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Globe size={18} className="text-indigo-500" /> World Habitat Map
            </a>
          </div>
        )}
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-5 uppercase tracking-widest">
          <MapPin size={12} /> Habitat Explorer
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
          Explore the{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Palworld Map
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
          Discover every habitat, region and biome — and see which Pals roam each location.
        </p>
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder={selectedHabitat ? 'Filter Pals by name…' : 'Search regions or biomes…'}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:border-indigo-500/60 focus:bg-white dark:focus:bg-white/8 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {selectedHabitat && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">Sort by:</span>
              {(['name', 'rarity'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setSortOption(opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                    sortOption === opt
                      ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Breadcrumb when habitat is selected ─── */}
        {selectedHabitat && (() => {
          const meta = getBiomeMeta(selectedHabitat.biome);
          return (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button
                onClick={() => { setSelectedHabitat(null); setSearch(''); }}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                All Habitats
              </button>
              <ChevronRight size={14} className="text-slate-600" />
              <span
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border"
                style={{ color: meta.color, borderColor: `${meta.color}40`, backgroundColor: `${meta.color}15` }}
              >
                {meta.icon} {selectedHabitat.regionName}
              </span>
              <span className="text-xs text-slate-500 ml-1">{filteredPals.length} Pals</span>
            </div>
          );
        })()}

        {/* ── Habitat grid (default view) ────────────────────────────── */}
        {!selectedHabitat && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={18} className="text-indigo-600 dark:text-indigo-400" />
                Habitats &amp; Regions
                <span className="text-xs font-normal text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-full ml-1">
                  {filteredHabitats.length}
                </span>
              </h2>
            </div>

            {filteredHabitats.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <MapPin size={36} className="mx-auto mb-3 opacity-30" />
                <p>No habitats match &ldquo;{search}&rdquo;</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHabitats.map(habitat => {
                  const meta = getBiomeMeta(habitat.biome);
                  const palCount = getPalsByHabitat(habitat.biome as any, habitat.regionName).length;
                  return (
                    <button
                      key={`${habitat.biome}-${habitat.regionName}`}
                      onClick={() => setSelectedHabitat(habitat)}
                      className="group text-left relative rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 p-5 overflow-hidden hover:border-indigo-500/30 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                      style={{ ['--glow' as any]: meta.glow }}
                    >
                      {/* Glow accent */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(ellipse at top left, ${meta.glow}, transparent 70%)` }}
                      />
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                      />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Biome badge */}
                          <span
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border mb-3"
                            style={{ color: meta.color, borderColor: `${meta.color}40`, backgroundColor: `${meta.color}15` }}
                          >
                            {meta.icon} {meta.label}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-white truncate">
                            {habitat.regionName}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {palCount} Pal{palCount !== 1 ? 's' : ''} found here
                          </p>
                        </div>
                        <div
                          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
                          style={{ backgroundColor: `${meta.color}20`, boxShadow: `0 0 16px ${meta.glow}` }}
                        >
                          {meta.icon}
                        </div>
                      </div>

                      {/* Pal count bar */}
                      <div className="relative mt-4 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min((palCount / 10) * 100, 100)}%`,
                            background: `linear-gradient(90deg, ${meta.color}80, ${meta.color})`,
                            boxShadow: `0 0 8px ${meta.glow}`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Pal grid (habitat selected) ────────────────────────────── */}
        {selectedHabitat && (() => {
          const meta = getBiomeMeta(selectedHabitat.biome);
          return (
            <div>
              {/* Habitat hero banner */}
              <div
                className="relative rounded-2xl p-6 mb-8 border border-white/8 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${meta.color}18, transparent 60%)` }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${meta.glow}, transparent 70%)` }}
                />
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                />
                <div className="relative flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                    style={{ backgroundColor: `${meta.color}25`, boxShadow: `0 0 24px ${meta.glow}` }}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: meta.color }}>
                      {meta.label} Biome
                    </p>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedHabitat.regionName}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                      {filteredPals.length} Pal{filteredPals.length !== 1 ? 's' : ''} inhabit this region
                    </p>
                  </div>
                </div>
              </div>

              {filteredPals.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <Search size={36} className="mx-auto mb-3 opacity-30" />
                  <p>{search ? `No Pals match "${search}"` : 'No Pals found in this habitat'}</p>
                </div>
              ) : (
                <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredPals.map(pal => (
                    <button
                      key={pal.id}
                      onClick={() => setSelectedPal(pal)}
                      className="group relative rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 p-4 flex flex-col items-center gap-2 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-white/7 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)] transition-all duration-250 text-left"
                    >
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.08), transparent 70%)' }} />
                      <PalCard
                        pal={pal}
                        size="sm"
                        className="border-0 bg-transparent shadow-none p-0 w-auto pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* ── Pal detail modal ───────────────────────────────────────────── */}
      {selectedPal && (() => {
        const mapData = getPalMapData(selectedPal.id);
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,16,0.6)', backdropFilter: 'blur(16px)' }}
            onClick={e => { if (e.target === e.currentTarget) setSelectedPal(null); }}
          >
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c1d] shadow-[0_32px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

              {/* Modal top glow */}
              <div className="absolute top-0 inset-x-0 h-48 rounded-t-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.18), transparent 70%)' }} />
              <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }} />

              {/* Close */}
              <button
                onClick={() => setSelectedPal(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/12 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X size={15} />
              </button>

              <div className="relative p-6 sm:p-8">
                {/* Pal header */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl blur-xl bg-indigo-500/30" />
                    <div className="relative w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center overflow-hidden">
                      <PalCard pal={selectedPal} size="sm" className="border-0 bg-transparent shadow-none p-0 w-auto pointer-events-none scale-90" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 px-2.5 py-0.5 rounded-full">
                        #{selectedPal.id}
                      </span>
                      <span className="text-[11px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full">
                        {selectedPal.type1}{selectedPal.type2 ? `/${selectedPal.type2}` : ''}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white truncate">{selectedPal.name}</h2>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: selectedPal.rarity }).map((_, i) => (
                        <Star key={i} size={11} className="fill-indigo-500 dark:fill-indigo-400 text-indigo-500 dark:text-indigo-400" />
                      ))}
                      <span className="text-xs text-slate-500 ml-1.5">Rarity {selectedPal.rarity}</span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Breeding Power', value: selectedPal.breedingPower },
                    { label: 'Rarity Tier', value: `${selectedPal.rarity} / 10` },
                  ].map(stat => (
                    <div key={stat.label} className="bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/8 rounded-2xl p-4">
                      <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Habitat information */}
                {mapData && mapData.habitats.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                      Spawn Locations
                    </h3>
                    <div className="space-y-2">
                      {mapData.habitats.map((habitat, i) => {
                        const meta = getBiomeMeta(habitat.biome);
                        const badge = COMMONNESS_BADGE[habitat.commonness ?? ''];
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/3 hover:bg-slate-100 dark:hover:bg-white/6 transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                              style={{ backgroundColor: `${meta.color}20`, boxShadow: `0 0 10px ${meta.glow}` }}
                            >
                              {meta.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight truncate">
                                {habitat.regionName}
                              </p>
                              <p className="text-[11px] text-slate-500 capitalize">{meta.label}</p>
                            </div>
                            {badge && (
                              <span
                                className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                                style={{ color: badge.color, borderColor: `${badge.color}40`, backgroundColor: `${badge.color}15` }}
                              >
                                {badge.label}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Notable locations */}
                {mapData?.notableLocations && mapData.notableLocations.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                      Notable Locations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mapData.notableLocations.map((loc, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full hover:border-indigo-500/30 dark:hover:border-white/30 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        >
                          <MapPin size={10} className="text-indigo-600 dark:text-indigo-400" />
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
