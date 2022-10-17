
    var automation = false;
$(document).ready(() => {
    $('#start-automation-btn').click(() => {

        console.log("Button Cllicked")
        if (automation) {
            chrome.runtime.sendMessage({ task: "stopAutomation" },
                function (response) {
                    console.log(response);
                    $('#task-status').text(response.status)
                    automation = false;
                });
                
        } else {
            chrome.runtime.sendMessage({ task: "startAutomation" },
                function (response) {
                    console.log(response);
                    automation = true;
                    $('#task-status').text(response.status)
                });
        }

    });
})

