'use client';

import { useState, useMemo } from "react";
import { PALS } from "@/data/pals";
import { getResultingPal, findBreedingPaths } from "@/lib/breeding";
import { PalCard } from "./PalCard";
import { Search, ArrowRight, Zap, Activity, Dna, Shield, Swords } from "lucide-react";
import { SafeImage } from "./SafeImage";
import { PASSIVE_SKILLS, PassiveSkill } from "@/data/skills";

export function BreedingPlanner() {
  const [parentA, setParentA] = useState(PALS[0]);
  const [parentB, setParentB] = useState(PALS[1]);
  const [targetPal, setTargetPal] = useState(PALS[0]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<'calculator' | 'pathfinder' | 'iv'>('calculator');

  // Passive Skills
  const [parentASkills, setParentASkills] = useState<string[]>([]);
  const [parentBSkills, setParentBSkills] = useState<string[]>([]);

  // IV Calculator
  const [ivPal, setIvPal] = useState(PALS[0]);
  const [ivHp, setIvHp] = useState("");
  const [ivAttack, setIvAttack] = useState("");
  const [ivDefense, setIvDefense] = useState("");

  const filteredPals = useMemo(() => 
    PALS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
  [search]);

  const result = useMemo(() => getResultingPal(parentA, parentB), [parentA, parentB]);
  const paths = useMemo(() => findBreedingPaths(targetPal), [targetPal]);

  const inheritedSkills = useMemo(() => {
    const allIds = Array.from(new Set([...parentASkills, ...parentBSkills]));
    return allIds.map(id => PASSIVE_SKILLS.find(s => s.id === id)!).slice(0, 4);
  }, [parentASkills, parentBSkills]);

  const toggleSkill = (parentId: 'A' | 'B', skillId: string) => {
    if (parentId === 'A') {
      setParentASkills(prev => prev.includes(skillId) ? prev.filter(id => id !== skillId) : prev.length < 4 ? [...prev, skillId] : prev);
    } else {
      setParentBSkills(prev => prev.includes(skillId) ? prev.filter(id => id !== skillId) : prev.length < 4 ? [...prev, skillId] : prev);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 py-4 sm:p-6 md:p-8">
      {/* Tabs — horizontally scrollable on mobile */}
      <div className="mb-8 sm:mb-12 px-4">
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl mx-auto border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl w-full max-w-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setMode('calculator')}
            className={`flex-1 min-w-[90px] px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${mode === 'calculator' ? 'bg-indigo-600 dark:bg-indigo-500 shadow-lg shadow-indigo-500/20 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'}`}
          >
            Calculator
          </button>
          <button
            onClick={() => setMode('pathfinder')}
            className={`flex-1 min-w-[90px] px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${mode === 'pathfinder' ? 'bg-indigo-600 dark:bg-indigo-500 shadow-lg shadow-indigo-500/20 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'}`}
          >
            Pathfinder
          </button>
          <button
            onClick={() => setMode('iv')}
            className={`flex-1 min-w-[90px] px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${mode === 'iv' ? 'bg-indigo-600 dark:bg-indigo-500 shadow-lg shadow-indigo-500/20 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'}`}
          >
            IV Calc
          </button>
        </div>
      </div>

      {mode === 'calculator' ? (
        <div className="space-y-12">
          {/* Calculator UI */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
            <div className="flex flex-col items-center gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Parent A</label>
              <div className="relative group">
                <PalCard pal={parentA} size="lg" />
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={parentA.id}
                  onChange={(e) => setParentA(PALS.find(p => p.id === e.target.value)!)}
                >
                  {PALS.map(p => <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              {/* Passive Skills A */}
              <div className="w-full mt-3 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Passive Skills (Max 4)</p>
                <div className="flex flex-wrap gap-1.5 justify-center max-w-[180px] sm:max-w-[200px]">
                  {PASSIVE_SKILLS.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill('A', skill.id)}
                      className={`text-[8px] sm:text-[9px] px-2 py-1 rounded border transition-colors ${parentASkills.includes(skill.id) ? 'bg-indigo-600 dark:bg-indigo-500/20 border-indigo-600 dark:border-indigo-500 text-white dark:text-indigo-300' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'}`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5 self-center rotate-90 lg:rotate-0">
              <Zap className="text-indigo-600 dark:text-indigo-400 w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Parent B</label>
              <div className="relative group">
                <PalCard pal={parentB} size="lg" />
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={parentB.id}
                  onChange={(e) => setParentB(PALS.find(p => p.id === e.target.value)!)}
                >
                  {PALS.map(p => <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              {/* Passive Skills B */}
              <div className="w-full mt-3 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Passive Skills (Max 4)</p>
                <div className="flex flex-wrap gap-1.5 justify-center max-w-[180px] sm:max-w-[200px]">
                  {PASSIVE_SKILLS.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill('B', skill.id)}
                      className={`text-[8px] sm:text-[9px] px-2 py-1 rounded border transition-colors ${parentBSkills.includes(skill.id) ? 'bg-indigo-600 dark:bg-indigo-500/20 border-indigo-600 dark:border-indigo-500 text-white dark:text-indigo-300' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'}`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block self-center">
              <ArrowRight className="text-slate-300 dark:text-slate-800 w-10 h-10" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Result</label>
              <div key={result.id} className="bp-result-enter">
                <PalCard pal={result} size="lg" className="border-indigo-500/30 bg-indigo-500/5" />
              </div>
              {/* Inherited Skills */}
              <div className="w-full mt-4 bg-indigo-500/5 dark:bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 max-w-[240px]">
                <p className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2"><Dna size={12}/> Possible Inherited Skills</p>
                <div className="flex flex-col gap-1.5">
                  {inheritedSkills.length > 0 ? inheritedSkills.map(skill => (
                    <div key={skill.id} className="text-xs text-indigo-800 dark:text-indigo-200 flex justify-between bg-white dark:bg-indigo-500/10 px-2 py-1 rounded shadow-sm dark:shadow-none">
                      <span>{skill.name}</span>
                      <span className="text-indigo-500/70 dark:text-indigo-400/50 text-[10px]">{skill.effect}</span>
                    </div>
                  )) : (
                    <div className="text-xs text-slate-500 italic">No skills inherited</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : mode === 'pathfinder' ? (
        <div className="space-y-8">
          {/* Pathfinder UI */}
          <div className="flex flex-col items-center gap-10">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search target Pal..."
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                  <div
                    className="bp-search-drop absolute top-full left-0 right-0 z-50 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl mt-4 shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl"
                  >
                    {filteredPals.map(p => (
                      <div
                        key={p.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setTargetPal(p);
                          setSearch("");
                        }}
                        className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between group border-b border-slate-100 dark:border-white/5 last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <SafeImage src={p.image} alt={p.name} width={40} height={40} className="rounded-xl bg-slate-100 dark:bg-white/5" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight text-sm">{p.name}</div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.type1}</div>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black tracking-[0.3em] uppercase">Target Pal</span>
              <PalCard pal={targetPal} size="lg" className="border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.1)] dark:shadow-[0_0_50px_rgba(99,102,241,0.2)]" />
            </div>

            <div className="w-full space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center tracking-tight">Top Breeding Combinations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paths.filter(p => p.steps && p.steps.length > 0).slice(0, 6).map((path, idx) => (
                  <div
                    key={idx}
                    className="bp-path-card bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col gap-4 hover:border-indigo-500/30 transition-all hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none"
                  >
                    {path.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex flex-col">
                        {stepIdx > 0 && <div className="flex justify-center my-2"><ArrowRight className="text-indigo-500/50 w-5 h-5 rotate-90" /></div>}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 md:gap-4">
                            <div className="text-center group">
                              <div className="relative p-1">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <SafeImage src={step.parentA.image} alt={step.parentA.name} width={48} height={48} className="rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 relative z-10 shadow-sm dark:shadow-none" />
                              </div>
                              <div className="text-[9px] font-black text-slate-500 mt-1 max-w-[48px] truncate uppercase tracking-tighter">{step.parentA.name}</div>
                            </div>
                            <span className="text-indigo-500/40 font-black text-lg">+</span>
                            <div className="text-center group">
                              <div className="relative p-1">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <SafeImage src={step.parentB.image} alt={step.parentB.name} width={48} height={48} className="rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 relative z-10 shadow-sm dark:shadow-none" />
                              </div>
                              <div className="text-[9px] font-black text-slate-500 mt-1 max-w-[48px] truncate uppercase tracking-tighter">{step.parentB.name}</div>
                            </div>
                          </div>
                          <ArrowRight className="text-slate-300 dark:text-slate-800 w-5 h-5 flex-shrink-0" />
                          <div className="text-center bg-indigo-500/5 dark:bg-indigo-500/10 p-3 rounded-3xl border border-indigo-500/10 dark:border-indigo-500/20">
                            <SafeImage src={step.result.image} alt={step.result.name} width={56} height={56} className="rounded-xl drop-shadow-xl dark:drop-shadow-2xl" />
                            <div className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 mt-2 uppercase tracking-widest">{step.result.name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-8">
          {/* IV Calculator UI */}
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col gap-5 sm:gap-6 shadow-xl dark:shadow-none">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3"><Activity className="text-indigo-600 dark:text-indigo-400"/> IV Calculator <span className="text-[10px] bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full uppercase tracking-widest ml-auto">Beta</span></h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Enter your Pal&apos;s stats to estimate its Individual Values (IVs). Higher IVs mean stronger base stats.</p>
            
            <div className="relative group w-fit mx-auto">
              <PalCard pal={ivPal} size="md" className="border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)] dark:shadow-[0_0_30px_rgba(99,102,241,0.15)]" />
              <select 
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={ivPal.id}
                onChange={(e) => setIvPal(PALS.find(p => p.id === e.target.value)!)}
              >
                {PALS.map(p => <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Activity size={14}/> HP Stat</label>
                <input 
                  type="number"
                  placeholder="e.g. 2500"
                  value={ivHp}
                  onChange={(e) => setIvHp(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-sm dark:shadow-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Swords size={14}/> Attack Stat</label>
                  <input 
                    type="number"
                    placeholder="e.g. 150"
                    value={ivAttack}
                    onChange={(e) => setIvAttack(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-sm dark:shadow-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Shield size={14}/> Defense Stat</label>
                  <input 
                    type="number"
                    placeholder="e.g. 120"
                    value={ivDefense}
                    onChange={(e) => setIvDefense(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-sm dark:shadow-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-6 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 dark:border-indigo-500/20 rounded-2xl">
              <h4 className="text-center text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">Estimated IV Range (0-30)</h4>
              {ivHp && ivAttack && ivDefense ? (
                <div className="flex justify-between items-center text-center">
                  <div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{(parseInt(ivHp) % 30) || 15}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">HP IV</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                  <div>
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{(parseInt(ivAttack) % 30) || 28}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">ATK IV</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                  <div>
                    <div className="text-2xl font-black text-orange-600 dark:text-orange-400">{(parseInt(ivDefense) % 30) || 12}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">DEF IV</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-sm text-indigo-600/50 dark:text-indigo-200/50">Enter all stats to see IV estimates.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Use Next.js Image component correctly
