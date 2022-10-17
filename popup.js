
    var automation = false;
$(document).ready(() => {
    $('#start-automation-btn').click(() => {

        if (automation) {
            chrome.runtime.sendMessage({ task: "stopAutomation" },
                function (response) {
                    $('#task-status').text(response.status)
                    automation = false;
                });
                
        } else {
            chrome.runtime.sendMessage({ task: "startAutomation" },
                function (response) {
                    automation = true;
                    $('#task-status').text(response.status)
                });
        }

    });
})

