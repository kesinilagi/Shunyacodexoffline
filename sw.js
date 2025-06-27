// --- GANTI SELURUH ISI FILE sw.js DENGAN INI ---
const CACHE_NAME = 'shunya-codex-cache-v2'; // Versi baru agar cache diperbarui

// Daftar semua file yang perlu disimpan. PASTIKAN SEMUA LINK BENAR!
const URLS_TO_CACHE = [
    // File inti aplikasi
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',

    // Library dari CDN (ini sudah benar)
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',

    // Aset Audio dari GitHub (lebih stabil daripada Dropbox)
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/sugesti-energi-illahi.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara%20ruang%20afirmasi%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20nariyah%20bowl.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20munjiyat%20bowl.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Futuh%20Rizq%20wal%20Afiyah%20bowl%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Nuril%20Anwar%20bowl%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Ibrahim%20wal%20Afiyah%20bowl%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/ya%20hayy%20ya%20qayy.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Allahuma%20qanni.mp3',

    // Aset Gambar
    'https://www.dropbox.com/scl/fi/vubk41qgzk0hh98bs6pvl/bingkai-emas.png?rlkey=3f27xyyp094g7dgrg4j7ja2y2&st=50j3kgh7&dl=1' // Dropbox kadang bermasalah, jika gagal, pindahkan juga ke GitHub
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache dibuka, menyimpan aset untuk offline...');
            // fetch() untuk setiap request dan memasukkannya ke cache
            const promises = URLS_TO_CACHE.map(url => {
                return fetch(new Request(url, { mode: 'no-cors' })).then(response => {
                    return cache.put(url, response);
                }).catch(err => {
                    console.error('Gagal fetch & cache:', url, err);
                });
            });
            return Promise.all(promises);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Hapus cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
