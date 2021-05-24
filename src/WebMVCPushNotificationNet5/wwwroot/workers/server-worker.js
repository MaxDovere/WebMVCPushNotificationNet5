// Listen for messages received from the Service Worker.
self.addEventListener('message', function (message) {
    alert(message.data);
});

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
    var dir = 'auto';
    var persistent = true;
    var body = data.body;
    var image = data.hasOwnProperty('image') == true ? data.image : '';
    var icon = data.icon;
    var badge = data.badge;
    var tag = data.tag;
    var vibrate = data.vibrate;
    var renotify = data.renotify;
    var actions = data.actions;
    var requireInteraction = data.hasOwnProperty('requireInteraction') == true ? data.requireInteraction : false;
    var sticky = data.sticky;
    var notificationCloseEvent = data.hasOwnProperty('notificationCloseEvent') == true ? data.notificationCloseEvent : false;
    var url = data.url;
    //var timestamp = data.timestamp;
    //var silent = data.silent;
    //var container = data.data;


    var options = {
        dir: dir,
        persistent: persistent,
        body: body,
        image: image,
        icon: icon,
        badge: badge,
        vibrate: vibrate,
        tag: tag,
        renotify: renotify,
        requireinteraction: requireInteraction,
        actions: actions,
        //sticky: sticky,
        //url: url,
        //silent: silent,
        //notificationCloseEvent: notificationCloseEvent
        //timestamp: timestamp,
        //data: container
    };

    console.log('Data convert on options:');
    console.log(options);

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();

    if (event.action === 'like') {
        silentlyLikeItem();
    }
    else if (event.action === 'reply') {
        clients.openWindow("/messages?reply=" + messageId);
    }
    else {
        clients.openWindow("/messages?reply=" + messageId);
    }  
    var options = notification.data.options;

    var redirectUrl = options.url.toString();
    //var scopeUrl = e.notification.data.scope_url.toString();
    console.log(redirectUrl);
    //console.log(scopeUrl);

    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(function (clients) {
            for (i = 0; i < clients.length; i++) {
                console.log(clients[i].url);
                //if (clients[i].url.toString().indexOf(scopeUrl) !== -1) {
                    // Scope url is the part of main url
                    clients[i].navigate(redirectUrl);
                    clients[i].focus();
                    //break;
                //}
            }
        })
    );
});