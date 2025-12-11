const CACHE_NAME = 'kakeibo-cleanup-v1';

// 1. インストールされたら、すぐに動き出す
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. 起動したら、過去のキャッシュを全て削除する
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('古いキャッシュを削除しました:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // 3. 自分自身（Service Worker）の登録を解除する
            return self.registration.unregister();
        }).then(() => {
            // 4. 開いているページをコントロール下に置く（リロードを促すため）
            return self.clients.claim();
        })
    );
});