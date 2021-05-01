self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }

    console.log('Notification Received:');
    console.log(data);

    var title = data.title;
    var message = data.message;
    var image = data.image;
    var icon = data.icon; //"./images/icon-512.png";
    
    event.waitUntil(self.registration.showNotification(title, {
        body: message,
        image: image,
        icon: icon,
        badge: icon
    }));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
});
