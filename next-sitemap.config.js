/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.frank-mayer.io",
  generateRobotsTxt: true,
  autoLastmod: true,
  changefreq: "monthly",
  trailingSlash: false,
};
