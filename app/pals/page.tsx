import type { Metadata } from 'next';
import PalsPageClient from './PalsClient';

export const metadata: Metadata = {
  title: 'Paldex — All 137 Palworld Pals',
  description: 'Browse all 137 Pals in Palworld. Filter by type, sort by rarity, and find the best Pals for breeding combinations, passive skills, and IV optimization.',
  keywords: [
    'palworld paldex',
    'all palworld pals',
    'palworld pal list 2026',
    'palworld breeding calculator',
    'palworld breeding combinations list',
    'palworld pal breeding calculator',
    'palworld passive breeding calculator',
    'palworld iv breeding calculator',
    'palworld trait breeding calculator',
    'palworld breeding combos',
    'palworld breeding calculator 2026',
  ],
  openGraph: {
    title: 'Paldex — All 137 Palworld Pals | PalBreed.AI',
    description: 'Browse every Pal in Palworld with type, rarity and breeding data.',
    url: 'https://palbreedai.com/pals',
  },
  alternates: { canonical: 'https://palbreedai.com/pals' },
};

export default function PalsPage() {
  return <PalsPageClient />;
}
