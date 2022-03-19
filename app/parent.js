document.name = 'parentWindow';
window.name = 'parentWindow';
window.id = 'parentWindow';

var webview,
  targetOrigin = "http://localhost:3000/index.html?"+Date.now(); // Needed to prevent caching

window.addEventListener("load", function () {
  webview = document.getElementById("webview");
  console.log("....got webview:", webview);

  window.addEventListener("loadstop", function (event) {
    window.addEventListener("message", function (event) {
      console.log("....window received message:", event.data);

      // Does this go to all windows or just the grandparent?
      chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });

      if (event.data.command === 'openWindow') {

        chrome.app.window.create('index.html', {
          id: 'parentAppWindow' + String(Date.now()),
          frame: 'none',
        });
      }
    });

    // Send initial message so child knows who parent is and can reply
    webview.contentWindow.postMessage({ command: "handshake", }, "*" );
  });

  // Set webview src attribute
  webview.src = targetOrigin;
});

// setInterval(() => {
//   console.log('...parent')
// }, 1000)
