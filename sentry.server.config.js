// // This file configures the initialization of Sentry on the server.
// // The config you add here will be used whenever the server handles a request.
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

// import * as Sentry from '@sentry/nextjs'

// const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// Sentry.init({
//   dsn:
//     SENTRY_DSN ||
//     'https://f1a17919ba284774a684737a0f910df3@o4504233290891264.ingest.sentry.io/4504233293774848',
//   // Adjust this value in production, or use tracesSampler for greater control
//   tracesSampleRate: 1.0,
//   // ...
//   // Note: if you want to override the automatic release value, do not set a
//   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
//   // that it will also get attached to your source maps
// })
