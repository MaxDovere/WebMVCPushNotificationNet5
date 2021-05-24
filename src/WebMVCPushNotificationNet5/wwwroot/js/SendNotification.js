//const { data } = require("jquery");

$(document).ready(function () {

    var title_custom = $("#title").val();
    var body_custom = $("#body").val();
    var image_custom = $("#image").val();
    var icon_custom = $("#icon").val();
    var tag_custom = $("#tag").val();
    var badge_custom = $("#badge").val();
    var vibrate_custom = $("#vibrate").val();
    var timestamp_custom = $("#timestamp").val();
    var sticky_custom = $("#sticky").val();
    var url_custom = $("#url_custom").val();
    var actions = $("#actions").val();
    var action = $("#action").val();
    var require_interaction = false;
    var close = true;
    var notification_close_event = false;
    var silent = false;
    var renotify = false;

    $('#title').change(function (e) {
        $('#title_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#title_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#body').change(function (e) {
        $('#body_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#body_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#image').change(function (e) {
        $('#image_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#image_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#icon').change(function (e) {
        $('#icon_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#icon_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#tag').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#badge').change(function (e) {
        $('#badge_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#badge_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#vibrate').change(function (e) {
        $('#vibrate_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#vibrate_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#timestamp').change(function (e) {
        $('#timestamp_custom').val('');
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#timestamp_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#action').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#actions").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#notification_close_event").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#require_interaction").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#close").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#silent").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $("#renotify").change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });
    $('#url_custom').change(function (e) {
        $("#Payload").val(JSON.stringify(CreatePayloadOptions()));
    });

    //$('#title,#title_custom,#url_custom,#body,#body_custom,#image,#image_custom,#icon,#icon_custom,#badge,#badge_custom,#persistent,#tag,#vibrate,#vibrate_custom,#timestamp,#timestamp_custom,#actions,#silent,#renotify,#require_interaction,#notification_close_event,#action,#close,#show_trigger,#show_trigger_custom').on('keyup change', function () {
    function CreatePayloadOptions() {

        title_custom = $("#title").val() == 'custom' ? $("#title_custom").val() : $("#title").val();
        body_custom = $("#body").val() == 'custom' ? $("#body_custom").val() : $("#body").val();
        image_custom = $("#image").val() == 'custom' ? $("#image_custom").val() : $("#image").val();
        icon_custom = $("#icon").val() == 'custom' ? $("#icon_custom").val() : $("#icon").val();
        tag_custom = $("#tag").val() == 'custom' ? $("#tag_custom").val() : $("#tag").val();
        badge_custom = $("#badge").val() == 'custom' ? $("#badge_custom").val() : $("#badge").val();
        vibrate_custom = $("#vibrate").val() == 'custom' ? $("#vibrate_custom").val() : $("#vibrate").val();
        timestamp_custom = $("#timestamp").val() == 'custom' ? $("#timestamp_custom").val() : $("#timestamp").val();
        sticky_custom = $("#sticky").val() == 'custom' ? $("#sticky_custom").val() : $("#sticky").val();
        url_custom = $("#url_custom").val();

        actions = JSON.parse($("#actions").val());

        //let jsonObject = {};
        //actions.forEach(item => obj[item.id] = item.name);
        //let json = JSON.stringify(jsonObject);
        //console.log(actions);
        //console.log(json);  

        action = $("#action").val();
        require_interaction = $("#require_interaction").is(':checked') ? true : false;
        close = $("#close").is(':checked') ? true : false;
        notification_close_event = $("#notification_close_event").is(':checked') ? true : false;
        silent = $("#silent").is(':checked') ? true : false;
        renotify = $("#renotify").is(':checked') ? true : false;
        var container = {
            options: {
                action: $("#action").val(),
                close: $("#close").is(':checked') ? true : false,
                notificationCloseEvent: $("#notification_close_event").is(':checked') ? true : false,
                url: $("#url_custom").val(),
            }
        }

        return payloadObject = {
            title: title_custom,
            body: body_custom,
            image: image_custom == '' ? undefined : image_custom,
            icon: icon_custom == '' ? undefined : icon_custom,
            vibrate: vibrate_custom == '' ? undefined : vibrate_custom,
            tag: tag_custom, // se esiste visualizza la notifica con image
            badge: badge_custom == '' ? undefined : badge_custom,
            timestamp: timestamp_custom == '' ? undefined : timestamp_custom,
            renotify: renotify,
            url: url_custom,
            actions: actions, //actions == '' ? [] : [JSON.stringify(actions)],
            //[{ action: 'like', title: '👍Like' },
            //{ action: 'reply', title: '⤻ Reply' }],
            //actions == '' ? undefined : actions,
            silent: silent,
            persistent: true,
            requireInteraction: require_interaction,
            sticky: sticky_custom,
            notificationCloseEvent: notification_close_event,
            data: container
        }
    };
});