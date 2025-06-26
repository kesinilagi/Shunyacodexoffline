// Nama untuk "gudang" cache kita
const CACHE_NAME = 'shunya-codex-cache-v1';

// Daftar semua "bahan baku" yang perlu disimpan agar bisa offline
// PENTING: Jika Anda menambah audio atau gambar baru, tambahkan link-nya di sini!
const URLS_TO_CACHE = [
    // File inti aplikasi
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    
    // Library dari CDN
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',

    // Aset Audio
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/sugesti-energi-illahi.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/suara%20ruang%20afirmasi%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20nariyah%20bowl.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20munjiyat%20bowl.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Futuh%20Rizq%20wal%20Afiyah%20bowl%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Nuril%20Anwar%20bowl%208d.mp3',
    'https://raw.githubusercontent.com/kesinilagi/asetmusik/main/Sholawat%20Ibrahim%20wal%20Afiyah%20bowl%208d.mp3',
    
    // Aset Gambar
    'https://www.dropbox.com/scl/fi/vubk41qgzk0hh98bs6pvl/bingkai-emas.png?rlkey=3f27xyyp094g7dgrg4j7ja2y2&st=50j3kgh7&dl=1'
];

// Saat Service Worker di-install, simpan semua file di atas ke "gudang" (cache)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache dibuka, menyimpan aset untuk offline...');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Setiap kali ada permintaan file, cek dulu di "gudang"
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Jika ada di gudang, berikan dari gudang. Jika tidak, ambil dari internet.
            return response || fetch(event.request);
        })
    );
});