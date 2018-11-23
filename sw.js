self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v9')
			.then(cache => cache.addAll([
				'/',
        'restaurant.html',
				'css/styles.css',
        'data/restaurants.json',
        'img/1.jpg',
        'img/10.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js'
			]))
      .catch(error => console.log( error ))
	);
})
//ss
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
		caches.match(event.request, {ignoreSearch: true})
			// Match returns a promise if passed
			// If fails then send the request to the network
			.then(response => response || fetch(event.request))
      .catch(error => {
        if(event.request.mode === 'cors') console.log(event.request.url);
        if(event.request.mode === 'navigate') {
          return fetch('/');
        } else {
          console.log(error);
        }
      })
	);
});
