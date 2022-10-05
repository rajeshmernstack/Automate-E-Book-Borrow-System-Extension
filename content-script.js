chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.color === "green") {
        document.body.style.backgroundColor = "green !important";
        document.body.innerHTML = "<h1>DONE</h1>"
        console.log("OK")
        sendResponse({status: "done"});
      }
    }
);