import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Documentation() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-700 dark:text-slate-300 font-sans p-8 md:p-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors font-bold text-sm">
          <ArrowLeft size={16} /> Back to Planner
        </Link>
        
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Documentation & FAQ</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Learn how to master Palworld breeding using PalBreed.AI.</p>
        </div>
        
        {/* Core Concepts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">Core Concepts</h2>
          <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
            <h3 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">Breeding Power</h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Every Pal has a hidden internal value known as "Breeding Power". When you breed two Pals, the game calculates the offspring by taking the average of the parents' Breeding Power values: <code className="bg-slate-200 dark:bg-white/10 px-1 rounded">floor((Parent A Power + Parent B Power + 1) / 2)</code>. The Pal whose power is closest to that average becomes the offspring.
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Our <strong>Calculator</strong> tab performs this exact math under the hood to ensure 100% accurate results.
            </p>
          </div>
        </section>

        {/* Tools Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">Tools Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2">Pathfinder</h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                If you know what Pal you want but don't know how to get it, use the Pathfinder. Search for your target Pal, and the tool will show you up to 8 of the easiest multi-step breeding combinations to acquire it.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2">IV Calculator</h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                Individual Values (IVs) determine your Pal's hidden stat potential. Enter the total HP, Attack, and Defense into the IV tool to get a rough estimate of your Pal's hidden IV bonus tier (0-30).
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6 pt-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold mb-2">Why aren't my Pals producing the correct offspring?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                There are a few "Unique Combinations" in Palworld that ignore the standard Breeding Power formula. For example, breeding a Relaxaurus and a Sparkit will always result in an Orserk. Our tool accounts for these unique exceptions!
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold mb-2">How do Passive Skills inherit?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Offspring can inherit up to 4 passive skills directly from their parents. Using the Calculator tab, you can select the parents' current passive skills to visualize the pool of possible inherited traits for the baby.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold mb-2">How does the AI Assistant work?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The "Master Breeder" AI uses the Gemini 2.0 model, which is hooked up to our Palworld dataset. You can ask it complex strategic questions, such as "What's the best path to breed an Anubis early game?" and it will provide grounded, factual advice.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold mb-2">Are IVs visible in-game?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No, Palworld currently hides IVs (Individual Values). Two Pals of the same species and level can have slightly different stats. Our IV Calculator attempts to reverse-engineer those stats to tell you if your Pal has perfect genetics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
