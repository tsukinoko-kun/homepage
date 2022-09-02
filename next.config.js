/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["default", "en", "de"],
    defaultLocale: "default",
    localeDetection: true,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
