'use client';

import { BreedingPlanner } from "@/components/BreedingPlanner";
import { PalboxProvider } from "@/components/PalboxProvider";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, Info, Github, Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 transition-colors duration-300">
      {/* Header/Nav */}
      <nav className="sticky top-0 z-40 w-full border-b border-indigo-500/10 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">PalBreed<span className="text-indigo-600 dark:text-indigo-400">.AI</span></span>
            </a>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors py-2">
                Tools
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full right-0 w-56 mt-1 py-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right group-hover:scale-100 scale-95 z-50">
                <a href="/#calculator" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Sparkles size={16} /></div>
                  Breeding Calculator
                </a>
                <a href="/pals" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Info size={16} /></div>
                  Paldex Explorer
                </a>
                <a href="/map" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-600"><Globe size={16} /></div>
                  World Habitat Map
                </a>
              </div>
            </div>
            
            <a href="/docs" className="hidden lg:block text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Docs</a>
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
              <Info size={18} className="text-indigo-500" /> Paldex Explorer
            </a>
            <a href="/map" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Globe size={18} className="text-indigo-500" /> World Habitat Map
            </a>
            <a href="/docs" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Github size={18} className="text-slate-400" /> Documentation
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 md:pt-20 md:pb-12 text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="mx-auto relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest">v2.1 Mode Switcher Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Palworld Breeding Paths</span> with our AI-Powered Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Calculate combinations and find optimized breeding paths with ultra-fast AI advice. Built for the elite Palworld breeders.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-[#050505] bg-gradient-to-br from-indigo-200 to-violet-300 dark:from-indigo-700 dark:to-violet-800 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-200">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white dark:border-[#050505] bg-indigo-500 text-[10px] text-white font-bold">
                +2k
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Trusted by 2,000+ breeders daily</p>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="pb-24 relative z-10" id="calculator">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between border-b border-indigo-500/10 dark:border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-indigo-600 dark:text-indigo-400" size={24} />
              Breeding Planner
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter border border-slate-200 dark:border-white/10">v2.1 Updated</span>
            </div>
          </div>
        </div>
        <PalboxProvider>
          <BreedingPlanner />
        </PalboxProvider>
      </section>

      {/* Advanced Features Section */}
      <section className="bg-slate-50/50 dark:bg-black/40 border-t border-indigo-500/10 dark:border-white/5 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Elite Breeding Features</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Master the art of Palworld breeding with tools designed for the community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-[#080808] p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
              <div className="bg-indigo-500/10 dark:bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Shortest Path Algorithm</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our proprietary pathfinding algorithm finds the most efficient breeding chain to get any Pal, even with limited starting combinations.
              </p>
            </div>
            <div className="group bg-white dark:bg-[#080808] p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
              <div className="bg-indigo-500/10 dark:bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Info className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Passive Skill Inheritance</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Track and predict how traits like Artisan or Musclehead will pass down through your breeding generations with 100% accuracy.
              </p>
            </div>
            <div className="group bg-white dark:bg-[#080808] p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
              <div className="bg-indigo-500/10 dark:bg-indigo-500/10 p-3 rounded-2xl w-fit border border-indigo-500/20 mb-6 group-hover:scale-110 transition-transform">
                <Github className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">CombiRank Verified</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Built on the latest game data and CombiRank formulas. Trusted by over 2,000 professional breeders daily for precision results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-24 bg-white dark:bg-[#050505]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Palworld Breeding Guide & FAQ</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to know about the best Palworld breeding combinations and techniques.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-indigo-500/30 transition-all group">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">What is the best Palworld breeding calculator updated for 2026?</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">PalBreed.AI is the most comprehensive tool for Palworld, featuring the full 2026 combinations list, shortest path pathfinding, and a dedicated AI assistant to help you optimize passive skill chains and IV breeding.</p>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-indigo-500/30 transition-all group">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">How do I calculate the shortest breeding path in Palworld?</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Our pathfinder tool automatically calculates the most efficient multi-step breeding routes. Simply select your goal Pal and it will analyze all combinations to find the shortest chain using Pals you already own or common world spawns.</p>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-indigo-500/30 transition-all group">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">How does Palworld passive breeding work?</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Passives are inherited from parents with a certain probability. Our calculator helps you plan inheritance chains to consolidate top-tier traits like Legend, Musclehead, and Ferocious onto your perfect combat or base Pal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1.0 Guides */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Master Palworld 1.0</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Deep-dive guides for the 1.0 endgame: mutation breeding, Lv 10 work suitability,
              World Tree awakening, and the god-roll passive builds.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/guides/mutation", title: "Mutation Breeding", blurb: "Cakes, recipes & rainbow passives." },
              { href: "/guides/work-suitability", title: "Work Suitability Lv 10", blurb: "Condense-to-48 & best workers." },
              { href: "/guides/awakening", title: "Awakening", blurb: "Radiant Gems & World Tree passives." },
              { href: "/guides/combat-passives", title: "Combat & Worker Passives", blurb: "S-Tier passive builds." },
            ].map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 dark:bg-white/5 dark:border-white/10 p-6 transition-all hover:border-indigo-500/40"
              >
                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{g.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-indigo-500/10 dark:border-white/5 py-16 bg-slate-50 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">PalBreed<span className="text-indigo-600 dark:text-indigo-400">.AI</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">The ultimate 2026 Palworld breeding companion. Built for breeders, by breeders.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Tools</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#calculator" className="hover:text-indigo-600 transition-colors">Calculator</a></li>
                  <li><a href="/pals" className="hover:text-indigo-600 transition-colors">Paldex</a></li>
                  <li><a href="/guides" className="hover:text-indigo-600 transition-colors">1.0 Guides</a></li>
                  <li><a href="/map" className="hover:text-indigo-600 transition-colors">World Map</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Legal</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-indigo-600 transition-colors">Terms</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Community</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-400">
            © 2026 PalBreed.AI • Not affiliated with Pocketpair. Palworld is a registered trademark of Pocketpair.
          </div>
        </div>
      </footer>

      {/* Floating AI */}
      <AIChatAssistant />
    </main>
  );
}
