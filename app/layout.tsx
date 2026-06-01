import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | PalBreed.AI',
    default: 'PalBreed.AI - Ultimate Palworld Breeding Calculator 2026'
  },
  description: 'The most accurate Palworld breeding calculator updated for 2026. Find shortest path combinations, IV breeding calculations, and passive skill inheritance chains with our AI-powered tool.',
  keywords: [
    'palworld breeding calculator updated',
    'palworld breeding calculator shortest path',
    'palworld breeding calculator 2025',
    'palworld breeding calculator 2026',
    'palworld breeding calculator app',
    'palworld breeding calculator reddit',
    'palworld breeding calculator tree',
    'palworld breeding calculator for passives',
    'palworld breeding calculator chain',
    'breeding guide palworld breeding calculator',
    'best palworld breeding calculator',
    'palworld gg breeding calculator',
    'palworld chain breeding calculator',
    'palworld pal breeding calculator',
    'palworld iv breeding calculator',
    'palworld passive breeding calculator',
    'palworld trait breeding calculator',
    'palworld lyleen breeding calculator',
    'palworld reverse breeding calculator',
    'palworld breeding combinations list',
    'palworld breeding spreadsheet',
    'palworld breeding combos',
    'palworld breeding calculator traits'
  ],
  authors: [{ name: 'PalBreed.AI Team' }],
  creator: 'PalBreed.AI',
  publisher: 'PalBreed.AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://palbreedai.com'),
  alternates: {
    canonical: 'https://palbreedai.com'
  },
  openGraph: {
    title: 'PalBreed.AI - Advanced Palworld Breeding Calculator & AI Assistant',
    description: 'Find advanced Palworld breeding combinations, shortest paths, and optimize your Paldeck with our AI-powered breeding calculator updated for 2026.',
    url: 'https://palbreedai.com',
    siteName: 'PalBreed.AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PalBreed.AI - Palworld Breeding Calculator'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PalBreed.AI - Palworld Breeding Calculator 2026',
    description: 'The most accurate Palworld breeding calculator with AI assistant. Updated for 2026 with shortest-path breeding, IV calculations, and passive skill inheritance.',
    images: ['/twitter-image.png'],
    creator: '@PalBreedAI'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'PASTE_YOUR_GSC_CODE'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PalBreed.AI – Ultimate Palworld Breeding Calculator',
    alternateName: ['Palworld Breeding Calculator', 'PalBreed AI'],
    description: 'AI-powered Palworld breeding calculator that finds shortest-path breeding combinations, calculates IV inheritance, and predicts passive skill inheritance chains.',
    operatingSystem: 'Web',
    applicationCategory: 'GameApplication',
    url: 'https://palbreedai.com',
    image: ['https://palbreedai.com/og-image.png'],
    author: {
      '@type': 'Organization',
      name: 'PalBreed.AI Team',
      url: 'https://palbreedai.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PalBreed.AI',
      url: 'https://palbreedai.com'
    },
    datePublished: '2024-01-15',
    dateModified: '2026-06-01',
    version: '2.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    featureList: [
      'Shortest path breeding combinations',
      'IV inheritance calculation',
      'Passive skill prediction',
      'Breeding chain optimization',
      'Real-time result updates',
      'AI-powered breeding assistant'
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Gamers',
      description: 'Palworld players looking to optimize their breeding strategies'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://palbreedai.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Breeding Calculator',
        item: 'https://palbreedai.com/#calculator'
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0f172a" />

        {/* Critical CSS inlined to eliminate render-blocking stylesheet */}
        <style dangerouslySetInnerHTML={{ __html: `
          *,*::before,*::after{box-sizing:border-box}
          body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          html{scroll-behavior:smooth}
          img{max-width:100%;height:auto}
          .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        `}} />

        {/* Google Analytics 4 - deferred */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-P7MFFVZJ94" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P7MFFVZJ94');
          `
        }} />

        {/* Clarity Analytics - deferred */}
        <Script id="clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ww3it7o4e8");
          `
        }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
