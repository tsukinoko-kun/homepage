const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    compress: true,
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
}

module.exports = withPWA(nextConfig)
