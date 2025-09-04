/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud'],
  },
}

export default nextConfig
