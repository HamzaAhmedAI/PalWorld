import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-700 dark:text-slate-300 font-sans p-8 md:p-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors font-bold text-sm">
          <ArrowLeft size={16} /> Back to Planner
        </Link>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 font-medium">Last updated: April 30, 2026</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>At PalBreed.AI, we respect your privacy. As of our current version, we do not require users to create an account, nor do we actively collect personally identifiable information (PII). Any Palworld breeding calculations and queries are processed temporarily.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Third-Party Services</h2>
            <p>We use third-party APIs (such as OpenRouter and Google Gemini) to power our "Master Palworld Breeder" AI assistant. When you submit a question to the AI, your text prompt is sent securely to these services to generate a response. Please refrain from submitting personal data in the chat.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Local Storage</h2>
            <p>We may use your browser's local storage to save your preferred settings (like your currently selected Pals or application theme). This data remains on your device and is not transmitted to our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time as we introduce new features (like Firebase user accounts). We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us via our Discord community.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
