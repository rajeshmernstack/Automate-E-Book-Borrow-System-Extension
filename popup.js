
var allTabs = [];
var matchedTabs = [];
$('#start-automation-btn').click(async() => {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(matchedTabs[0].id, {color: "#00FF00"}, function(response) {
        console.log(response);
    });
    $('#start-automation-btn').text(matchedTabs.length);
    // startAutomation();
    
});
chrome.windows.getAll({ populate: true }, function (winData) {
    for (var i in winData) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j = 0; j < totTabs; j++) {
            allTabs.push(winTabs[j]);
        }
    }
});

$(document).ready(() => {

    fetchMatchedTabs();
})




function fetchMatchedTabs() {
    allTabs.forEach(myTab => {
        if (myTab.url.includes("overdrive.com/media/")) {
            matchedTabs.push(myTab);
        }
    });
}

function startAutomation() {
    matchedTabs.forEach(myTab => {
        chrome.tabs.sendMessage(myTab.id, {"message": "click_borrow_button"});
    });
}