'use client';

import { useState, useId } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

// Inline SVG placeholder — never hits the network
function makePlaceholder(name: string): string {
  const initial = name.charAt(0).toUpperCase();
  // Generate a deterministic but stable hue from the name
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  const hue = ((h % 360) + 360) % 360;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='hsl(${hue},50%,88%)'/><text x='50' y='55' text-anchor='middle' dominant-baseline='middle' font-family='system-ui,sans-serif' font-size='44' font-weight='800' fill='hsl(${hue},50%,35%)'>${initial}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const name = (typeof alt === 'string' ? alt : 'pal');
  const placeholder = fallbackSrc || makePlaceholder(name);

  return (
    <Image
      {...props}
      src={failed ? placeholder : (src as string)}
      alt={alt}
      placeholder="empty"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
