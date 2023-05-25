/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ascensionprotocol.io',
  generateRobotsTxt: false, // (optional)
  generateIndexSitemap: false,
  outDir: 'src/app',
  exclude: ['/favicon.ico', '/sitemap.xml'],
}
