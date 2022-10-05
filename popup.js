// Sample URL = https://hcpl.overdrive.com/media/9157463
var allTabs = [];
var matchedTabs = [];
$('#start-automation-btn').click(() => {
    $('#start-automation-btn').text(allTabs[2].url)
});

chrome.windows.getAll({ populate: true }, function(winData) {
    for (var i in winData) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j = 0; j < totTabs; j++) {
          allTabs.push(winTabs[j]);
        }
      }
});


// function fetchMatchedTabs() {
//     allTabs.forEach(myTab => {
//         if(myTab.url === "https://hcpl.overdrive.com/media/")
//     });
// }