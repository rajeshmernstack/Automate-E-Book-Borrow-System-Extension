
$(document).ready(() => {
    $('#start-automation-btn').click(() => {
        chrome.runtime.sendMessage({ greeting: "GetURL" },
            function (response) {
                tabURL = response.navURL;
                console.log(tabURL);
            });
    });
})

