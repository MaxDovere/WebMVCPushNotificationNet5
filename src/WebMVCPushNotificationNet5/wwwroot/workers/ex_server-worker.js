function showNotification(data) {
    var notificationOptions = {
        dir: 'auto',
        body: data.body,
        icon: data.icon,
        tag: data.tag,
        image: data.image,
        badge: data.badge,
        vibrate: data.vibrate,
        timestamp: data.timestamp,
        renotify: data.renotify,
        actions: data.actions,
        silent: data.silent,
        persistent: true,
        requireInteraction: data.requireInteraction,
        sticky: data.sticky,
        notificationCloseEvent: data.notificationCloseEvent,
        showTrigger: data.showTrigger,
        data: {
            options: {
                action: data.hasOwnProperty("action") == true ? data.options.action : 'default',
                close: data.hasOwnProperty("close") == true ? data.options.close : false,
                notificationCloseEvent: data.notificationCloseEvent,
                url: data.hasOwnProperty("url") == true ? data.options.url : document.location.toString(),
            }
        }
    };

    alert(notificationOptions.toString());

    self.registration.showNotification(title, notificationOptions);
    return;
};

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event);

    if (Notification.prototype.hasOwnProperty('data')) {
        console.log('Using Data');
        var url = event.notification.data.url;
        event.waitUntil(clients.openWindow(url));
    } else {
        var redirectUrl = '/redirect.html?redirect=' + url;
        event.waitUntil(clients.openWindow(redirectUrl));
    };
});

self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        console.log(event.data.json().toString());
        data = event.data.json();
    }

    console.log('Notification Received:');
    console.log(data);


    event.waitUntil(showNotification(data));
});

//self.addEventListener('notificationclick', function (event) {
//    event.notification.close();
//});
