chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    console.log("I am onInstalled Function, I will be visible one time only.")
});


console.log("I am background.js")

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^https/.test(tab.url)) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["./content-script.js"]
//         })
//             .then(() => {
//                 console.log("INJECTED THE FOREGROUND SCRIPT.");
//             })
//             .catch(err => console.log(err));
//     }
// });



var myTab = 0;
chrome.windows.getAll({ populate: true }, function (winData) {
    for (var i in winData) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j = 0; j < totTabs; j++) {
            // allTabs.push(winTabs[j]);
            // console.log(winTabs[j]);
            if (winTabs[j].url.includes("overdrive.com/media/")) {
                console.log(winTabs[j])
                if(myTab === 0 ){
                    myTab = winTabs[j].id
                }
                    
            }
        }
    }
});

function fetchMatchedTabs() {
    allTabs.forEach(myTab => {
        if (myTab.url.includes("overdrive.com/media/")) {
            matchedTabs.push(myTab);
            
        }
    });
}

// chrome.tabs.sendMessage(myTab, {some: 'abc'}, function(r) {
//     console.log(myTab)
//     console.log(r)
//   });
chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response);
    });
  });