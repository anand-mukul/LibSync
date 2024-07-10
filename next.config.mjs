/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.BACKEND_URL + '/api/v1/:path*',
            },
        ];
    },
};

export default nextConfig;
