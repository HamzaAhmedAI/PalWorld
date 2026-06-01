import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-700 dark:text-slate-300 font-sans p-8 md:p-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors font-bold text-sm">
          <ArrowLeft size={16} /> Back to Planner
        </Link>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 font-medium">Last updated: April 30, 2026</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using PalBreed.AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Not Affiliated with Pocketpair</h2>
            <p>PalBreed.AI is an independent, community-driven tool. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Pocketpair, Inc., or any of its subsidiaries or its affiliates. "Palworld" and all associated names, images, and trademarks are the property of Pocketpair.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Use of AI Features</h2>
            <p>The "Master Palworld Breeder" chat relies on experimental AI models. While we strive for accuracy, we cannot guarantee that the advice or breeding combinations provided by the AI are 100% correct. You use the AI assistant at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to misuse the Service or help anyone else do so. You must not attempt to abuse the API endpoints, scrape our data maliciously, or use the AI features to generate harmful or explicit content.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or free of errors.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
