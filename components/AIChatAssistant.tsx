'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";

export function AIChatAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hey! I\'m your Palworld Master Breeder. I can help you find breeding paths, explain traits, or guide you through our Paldex and World Map tools. What can I do for you today?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble thinking about that. Try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
          <div
            className="ai-chat-open bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.5)] rounded-[2rem] sm:rounded-[2.5rem] w-[min(92vw,380px)] sm:w-[400px] h-[min(80vh,520px)] sm:h-[550px] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">PalBreed AI</h3>
                  <p className="text-[10px] text-indigo-100/60 font-bold uppercase tracking-tighter">Powered by Gemini 2.0</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-xl transition-colors relative z-10"
              >
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`chat-msg flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/10 dark:shadow-indigo-600/20' 
                      : 'bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-200 rounded-tl-none assistant-bubble'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-msg flex justify-start">
                  <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 p-4 rounded-3xl shadow-sm">
                    <Loader2 className="animate-spin text-indigo-500 dark:text-indigo-400" size={20} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-black/40 border-t border-slate-100 dark:border-white/5 flex gap-3">
              <input 
                type="text"
                placeholder="Ask about breeding..."
                className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                value={input}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:grayscale"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="ai-chat-fab bg-indigo-600 text-white p-3.5 sm:p-4 rounded-full sm:rounded-[2rem] shadow-[0_20px_40px_rgba(79,70,229,0.25)] dark:shadow-[0_20px_40px_rgba(79,70,229,0.35)] hover:bg-indigo-500 active:scale-95 transition-all border border-indigo-500/50 flex items-center gap-2 sm:gap-3 sm:pr-6"
          >
            <div className="bg-white/20 p-2 sm:p-2.5 rounded-full sm:rounded-xl">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="hidden sm:block font-black text-sm uppercase tracking-widest">Ask Master Breeder</span>
          </button>
        )}
    </div>
  );
}
