const CACHE_NAME = 'static-cache:0.0.4';

const cacheStaticFiles = [
  '1-1.png',
  '1-2.png',
  '2-1.png',
  'comment-bg.svg',
  'galsses.png',
  'github-bg.svg',
  'icon1.svg',
  'icon2.svg',
  'icon3.svg',
  'icon4.svg',
  'icon5.svg',
  'icon6.svg',
  'lab-bg.svg',
  'me-bg.svg',
  'note-bg.svg',
  'wrapper.png',
  'style.css',
  'script.js'
];

const cacheIcons = ['32', '64', '72', '96', '128', '144', '152', '192', '256', '384', '512'];

// const cdnFiles = [
//   'https://at.alicdn.com/t/font_1721575_eh4rtw96r6p.css',
//   'https://note-cdn.hxtao.xyz/images/1-1.png',
//   'https://note-cdn.hxtao.xyz/images/1-2.png',
//   'https://note-cdn.hxtao.xyz/images/2-1.png'
// ];


/**
 * sw install
 */
self.addEventListener('install', (e) => {
  console.log('✅ sw installed!');

  // self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['manifest.json'].concat(
        // cdnFiles,
        cacheStaticFiles.map(v => `assets/${v}`),
        cacheIcons.map(v => `/icons/${v}.png`)
      ));
    })
  );
});

/**
 * sw actived (delete expired caches)
 */
self.addEventListener('activate', (e) => {
  console.log('💋 sw actived!');

  e.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }));
});



/**
 * manage fetch
 */
self.addEventListener('fetch', (e) => {
  const { url, method } = e.request;
  let isFromSW = false;

  e.respondWith(caches.match(e.request).then((res) => {
    if (res) {
      isFromSW = true;
      return res;
    }

    return fetch(e.request, { mode: 'no-cors' });
  }).then((e) => {
    const color = isFromSW ? '#00bcd4' : '#4caf50';

    console.log(
      `%c ${method} `, `background:${color};color:#fff;border-radius:2px`,
      `${url}`,
      `(from ${isFromSW ? 'sw' : 'network'})`
    );
    return e;
  }));
});

/**
 * push event
 */
self.addEventListener('push', (e) => {
  console.log('push event:', e);
});

/**
 * sync event
 */
self.addEventListener('sync', (e) => {
  console.log('sync event:', e)
});

