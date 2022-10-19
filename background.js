var workingTabs = [];
var downloadTab = {};
chrome.windows.getAll({ populate: true }, function (winData) {
    for (var i in winData) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j = 0; j < totTabs; j++) {
            if (winTabs[j].url.includes("overdrive.com/media/")) {
                workingTabs.push(winTabs[j]);
            }
            if (winTabs[j].url.includes("overdrive.com/account/loans")) {
                downloadTab = winTabs[j]
            }
        }
    }
});

var i = 0;
var autoBorrow = null;
function runMyTask() {
    autoBorrow = setInterval(() => {
        if (i < workingTabs.length) {
            chrome.runtime.sendMessage({ data: i });
            chrome.scripting.executeScript({
                target: { tabId: workingTabs[i].id },
                func: () => {
                    if (document.querySelector('.TitleActionButton.u-allCaps.button.radius.is-button.secondary.is-borrow.js-borrow.secondary') != null) {
                        document.querySelector('.TitleActionButton.u-allCaps.button.radius.is-button.secondary.is-borrow.js-borrow.secondary').click();
                        var borrowInner = setInterval(() => {
                            if (document.querySelector('button.radius.secondary.contrast.u-allCaps.borrow-button') != null) {
                                document.querySelector('button.radius.secondary.contrast.u-allCaps.borrow-button').click();
                                clearInterval(borrowInner);
                                setTimeout(() => {
                                    window.close();
                                }, 3000)
                            }
                        }, 5000)
                    }
                },
            });

            chrome.windows.update(workingTabs[i].windowId, { focused: true }, (window) => {
                chrome.tabs.update(workingTabs[i].id, { active: true })
                i++;
            })
        } else {
            i = 0;
            clearInterval(autoBorrow);
            chrome.tabs.reload(downloadTab.id);
            setTimeout(() => {
                chrome.scripting.executeScript({
                    target: { tabId: downloadTab.id },
                    func: () => {
                        var downloadButtonCounter = 0;
                        var allDownloadButtons = document.querySelectorAll('.loan-button-nonkindle.button.radius.primary.downloadButton')
                        let downloadButtonInterval = setInterval(() => {
                            if (downloadButtonCounter < allDownloadButtons.length) {
                                allDownloadButtons[downloadButtonCounter].click();
                                downloadButtonCounter++;
                            } else {
                                clearInterval(downloadButtonInterval);
                            }
                        }, 5000)
                    },
                });
                chrome.windows.update(downloadTab.windowId, { focused: true }, (window) => {
                    chrome.tabs.update(downloadTab.id, { active: true })
                })
            }, 8000)
        }
    }, 10000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.task === "startAutomation") {
        runMyTask();
    }
    if (request.task === "stopAutomation") {

        clearInterval(autoBorrow)
        i = 0;

    }
});

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "popup") {
        let popUpInterval = setInterval(() => {

            chrome.runtime.sendMessage({ data: i })
        }, 1000)
        chrome.runtime.sendMessage({ data: i });
        port.onDisconnect.addListener(function () {
            clearInterval(popUpInterval);
        });
    }
});






