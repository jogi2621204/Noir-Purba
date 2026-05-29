import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scholar.googleusercontent.com',
            },
        ],
    },
};

export default nextConfig;
