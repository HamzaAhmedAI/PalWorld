'use client';

import { Pal } from "@/data/pals";
import { SafeImage } from "./SafeImage";

interface PalCardProps {
  pal: Pal;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "p-2 w-28 sm:w-32",
  md: "p-3 sm:p-4 w-36 sm:w-48",
  lg: "p-4 sm:p-6 w-44 sm:w-64"
};

const imageSizes = {
  sm: 64,
  md: 128,
  lg: 192
};

export function PalCard({ pal, size = 'md', onClick, className = "" }: PalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`pal-card bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 flex flex-col items-center text-center cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      <div className="relative mb-3 group">
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <SafeImage
          src={pal.image}
          alt={pal.name}
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="rounded-xl object-contain relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-indigo-500/40 z-20">
          {pal.breedingPower}
        </div>
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base tracking-tight">{pal.name}</h3>
      <div className="flex gap-1 mt-1 flex-wrap justify-center">
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-white/5">{pal.type1}</span>
        {pal.type2 && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-white/5">{pal.type2}</span>
        )}
      </div>
      <div className="mt-2 flex text-indigo-500 dark:text-indigo-400">
        {Array.from({ length: pal.rarity }).map((_, i) => (
          <span key={i} className="text-xs">★</span>
        ))}
      </div>
    </div>
  );
}
