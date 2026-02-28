/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.thebharatmirror.com',
            },
            {
                protocol: 'https',
                hostname: 'wp.thebharatmirror.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
            }
        ],
    },
    // Adding defensive tags for build stability
    swcMinify: true,
    reactStrictMode: true,
};

export default nextConfig;
