


var workingTabs = [];
var downloadTab = {};
console.log("I am background.js")
chrome.windows.getAll({ populate: true }, function (winData) {
    for (var i in winData) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j = 0; j < totTabs; j++) {
            if (winTabs[j].url.includes("overdrive.com/media/")) {
                console.log(winTabs[j])
                workingTabs.push(winTabs[j]);
            }
            if (winTabs[j].url.includes("overdrive.com/account/loans")) {
                downloadTab = winTabs[j]
            }
        }
    }
});
var i = 0;

var autoBorrow = setInterval(() => {
    if (i < workingTabs.length) {

        chrome.scripting.executeScript({
            target: { tabId: workingTabs[i].id },
            func: () => {
                // write your code here
                if (document.querySelector('.TitleActionButton.u-allCaps.button.radius.is-button.secondary.is-borrow.js-borrow.secondary') != null) {
                    document.querySelector('.TitleActionButton.u-allCaps.button.radius.is-button.secondary.is-borrow.js-borrow.secondary').click();
                    var borrowInner = setInterval(() => {

                        if (document.querySelector('button.radius.secondary.contrast.u-allCaps.borrow-button') != null) {
                            console.log("Borrow Button 2 Found")


                            document.querySelector('button.radius.secondary.contrast.u-allCaps.borrow-button').click();
                            clearInterval(borrowInner);
                            setTimeout(() => {

                                window.close();

                            }, 4000)

                        } else {
                            console.log("Borrow Button 2 Not Found")
                        }
                    }, 5000)
                    console.log("Brorrow Buttton 1 Found")
                } else {
                    console.log("Borrow Button 1 Not Found")
                }
            },
        });

        chrome.windows.update(workingTabs[i].windowId, { focused: true }, (window) => {
            chrome.tabs.update(workingTabs[i].id, { active: true })
            i++;
        })
    } else {
        clearInterval(autoBorrow);
        console.log("Borrowing Done")
        console.log(downloadTab)
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
                            console.log("All Downloading Done")
                            clearInterval(downloadButtonInterval);
                        }
                    }, 5000)
                },
            });

            chrome.windows.update(downloadTab.windowId, { focused: true }, (window) => {
                chrome.tabs.update(downloadTab.id, { active: true })
            })
        }, 6000)
    }
}, 15000)



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "GetURL") {
        var tabURL = "Not set yet";
        chrome.tabs.query({ active: true }, function (tabs) {
            if (tabs.length === 0) {
                sendResponse({});
                return;
            }
            tabURL = tabs[0].url;
            sendResponse({ navURL: tabURL });
        });
    }
});

