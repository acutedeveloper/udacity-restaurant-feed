self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v9')
			.then(cache => cache.addAll([
				'index.html',
				'css/styles.css'
			]))
      .catch(error => console.log( error ))
	);
})

this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['static-v9'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Intercept requests
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			// Match returns a promise if passed
			// If fails then send the request to the network
			.then(response => response || fetch(event.request))
      .catch(() => {
        if(event.request.mode === 'navigate') {
          return fetch('/index.html');
        }
      })
	);
});
