/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  trailingSlash: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['res.cloudinary.com'],
    loader: 'custom',
    unoptimized: true,
  },
})
