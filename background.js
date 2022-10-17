


var workingTabs = [];
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
                    console.log("Borrow Button Found")
                } else {
                    console.log("Borrow Button Not Found")
                }
            },
        });

        chrome.windows.update(workingTabs[i].windowId, { focused: true }, (window) => {
            chrome.tabs.update(workingTabs[i].id, { active: true })
            i++;
        })
    } else {
        clearInterval(autoBorrow);
        i = 0;
    }
}, 5000)