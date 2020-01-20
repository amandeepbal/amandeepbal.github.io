const cacheName = 'V3'
const cacheAssets = [
    'index.html',
    'page.html',
    'examples.html',
    'contact.html',
    'another_page.html',
    '/js/main.js',
    '/style/style.css',
    '/style/background.png',
    '/style/bullet.png',
    '/style/graphic.png',
    '/style/link.png',
    '/style/search.png',
    '/style/transparent_light.png',
    '/style/transparent.png'
]

// Call insall Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
  
    e.waitUntil(
      caches
        .open(cacheName)
        .then(cache => {
          console.log('Service Worker: Caching Files');
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  });

// Call activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });

// Call Fetch Event 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Make copy/clone of response
          const resClone = res.clone();
          // Open cahce
          caches.open(cacheName).then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
          return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
  });