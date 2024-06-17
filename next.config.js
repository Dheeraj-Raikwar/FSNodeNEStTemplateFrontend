/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  reactStrictMode: true, 
    eslint: { 
      ignoreDuringBuilds: true, 
    }, 
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    TENANT_ID: process.env.TENANT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  async rewrites() {
    return [
      { source: '/', destination: '/home' },
      { source: '/login', destination: '/auth/login' },
      { source: '/reset-password', destination: '/auth/reset-password' },
    ]
  },

  async redirects() {
    return [
      { source: '/', destination: '/home', permanent: true },
    ]
  }
}

module.exports = nextConfig
