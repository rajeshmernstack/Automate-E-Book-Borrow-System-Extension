
$(document).ready(() => {

    chrome.storage.sync.get(['automation'], function (result) {
        console.log(result);
        console.log(result.automation)

        if (result.automation === undefined) {
            $('#start-automation-btn').show();
            $('#stop-automation-btn').hide();
        } else {
            if (result.automation === true) {
                $('#start-automation-btn').hide();
                $('#stop-automation-btn').show();
            } else {
                $('#start-automation-btn').show();
                $('#stop-automation-btn').hide();
            }
        }
    });
    // $('#start-automation-btn').click(() => {

    //     if (automation) {
    //         chrome.runtime.sendMessage({ task: "stopAutomation" },
    //             function (response) {
    //                 $('#task-status').text(response.status)
    //                 automation = false;
    //             });

    //     } else {
    //         chrome.runtime.sendMessage({ task: "startAutomation" },
    //             function (response) {
    //                 automation = true;
    //                 $('#task-status').text(response.status)
    //             });
    //     }

    // });


    chrome.runtime.connect({ name: "popup" });

    $('#start-automation-btn').click(() => {
        chrome.runtime.sendMessage({ task: "startAutomation" });
        $('#start-automation-btn').hide();
        $('#stop-automation-btn').show();

        chrome.storage.sync.set({ automation: true });
    });

    $('#stop-automation-btn').click(() => {
        $('#start-automation-btn').show();
        $('#stop-automation-btn').hide();
        chrome.storage.sync.set({ automation: false });
        chrome.runtime.sendMessage({ task: "stopAutomation" });
    })

});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        $('#task-status').text(request.data);
    }
);
