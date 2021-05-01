$(document).ready(function () {
    $("#Message").keyup(function () {
        var payloadObject = {
            title: $("#Title").val(),
            message: $("#Message").val(),
            image: $("#Image").val(),
            icon: $("#Icon").val()
        };

        $("#Payload").val(JSON.stringify(payloadObject));
    });
});