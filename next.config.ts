import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Silences the "multiple lockfiles / inferred workspace root" warning (a stray
  // package-lock.json in the user home dir made Next pick the wrong root, which
  // previously pushed the dev server off port 3000).
  outputFileTracingRoot: process.cwd(),
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'palworld.gg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.palpedia.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'palpedia.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'palworldtrainer.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gameinfo.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'paldex.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
