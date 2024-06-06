/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  // 图片域名
  images: {
    domains: ['cdn.dummyjson.com'],
  },
}

module.exports = nextConfig
