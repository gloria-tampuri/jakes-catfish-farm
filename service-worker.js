
    // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js

    /*
      Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
      while also being easily customizeable. You can add in your own code to implement the capabilities
      listed below, or change anything else you would like.


      Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
      Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

      Did you know that Service Workers offer many more capabilities than just offline? 
        - Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
        - Periodic Background Sync: https://web.dev/periodic-background-sync/
        - Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
        - Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
    */

    // const HOSTNAME_WHITELIST = [
    //     self.location.hostname,
    //     'fonts.gstatic.com',
    //     'fonts.googleapis.com',
    //     'cdn.jsdelivr.net'
    // ]

    // // The Util Function to hack URLs of intercepted requests
    // const getFixedUrl = (req) => {
    //     var now = Date.now()
    //     var url = new URL(req.url)

    //     // 1. fixed http URL
    //     // Just keep syncing with location.protocol
    //     // fetch(httpURL) belongs to active mixed content.
    //     // And fetch(httpRequest) is not supported yet.
    //     url.protocol = self.location.protocol

    //     // 2. add query for caching-busting.
    //     // Github Pages served with Cache-Control: max-age=600
    //     // max-age on mutable content is error-prone, with SW life of bugs can even extend.
    //     // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
    //     // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
    //     if (url.hostname === self.location.hostname) {
    //         url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
    //     }
    //     return url.href
    // }

    // /**
    //  *  @Lifecycle Activate
    //  *  New one activated when old isnt being used.
    //  *
    //  *  waitUntil(): activating ====> activated
    //  */
    // self.addEventListener('activate', event => {
    //   event.waitUntil(self.clients.claim())
    // })

    // /**
    //  *  @Functional Fetch
    //  *  All network requests are being intercepted here.
    //  *
    //  *  void respondWith(Promise<Response> r)
    //  */
    // self.addEventListener('fetch', event => {
    // // Skip some of cross-origin requests, like those for Google Analytics.
    // if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
    //     // Stale-while-revalidate
    //     // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    //     // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
    //     const cached = caches.match(event.request)
    //     const fixedUrl = getFixedUrl(event.request)
    //     const fetched = fetch(fixedUrl, { cache: 'no-store' })
    //     const fetchedCopy = fetched.then(resp => resp.clone())

    //     // Call respondWith() with whatever we get first.
    //     // If the fetch fails (e.g disconnected), wait for the cache.
    //     // If there’s nothing in cache, wait for the fetch.
    //     // If neither yields a response, return offline pages.
    //     event.respondWith(
    //     Promise.race([fetched.catch(_ => cached), cached])
    //         .then(resp => resp || fetched)
    //         .catch(_ => { /* eat any errors */ })
    //     )

    //     // Update the cache with the version we fetched (only for ok status)
    //     event.waitUntil(
    //     Promise.all([fetchedCopy, caches.open("pwa-cache")])
    //         .then(([response, cache]) => response.ok && cache.put(event.request, response))
    //         .catch(_ => { /* eat any errors */ })
    //     )
    // }
    // })


    import { skipWaiting, clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

skipWaiting();
clientsClaim();

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST;
// Precache fallback route and image
WB_MANIFEST.push({
  url: '/fallback',
  revision: '1234567890',
});
precacheAndRoute(WB_MANIFEST);

cleanupOutdatedCaches();
registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 31536e3,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new NetworkOnly({
    cacheName: 'static-image-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-js-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:css|less)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-style-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: 'static-data-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: 'apis',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 16,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);
registerRoute(
  /.*/i,
  new NetworkFirst({
    cacheName: 'others',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks