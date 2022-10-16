

console.log("OK")

// function randomNumber(min, max) { 
//   return Math.random() * (max - min) + min;
// }

// // Function call
// document.write( randomNumber(1, 5) ); 


chrome.runtime.onMessage.addListener(function(req, sender, cb) {
    console.log(sender)
    console.log(req);
    cb({msg: 'back'});
  }
);