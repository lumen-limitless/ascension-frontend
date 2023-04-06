/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ascensionprotocol.io',
  generateRobotsTxt: true, // (optional)
  exclude: ['/404', '/sentry_sample_error', '/deprecated/**/*'],
}
