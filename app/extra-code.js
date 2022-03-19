// https://groups.google.com/a/chromium.org/g/chromium-apps/c/8SJH5gl-7bc/m/X3lWGidwsR0J




// index.html + script.js
document.name = "parent";
window.name = "parent";
// webview.addEventListener("message", function (event) {
//   console.log("window received message:", event.data);
// });
window.addEventListener("message", function (event) {
  console.log("window received message:", event.data);
});

webview.contentWindow.postMessage({ command: "handshake" }, "*");







// inside webview
document.name = "child";
window.name = "child";
var appWindow;
var appOrigin;
function _receiveMessage(event) {
  debugger;

  // First message: store appWindow and appOrigin
  if (!appWindow || !appOrigin) {
    appWindow = event.source;
    appOrigin = event.origin;

    _sendMessage({
      command: "handshakereply",
    });
  }
}

function _sendMessage(data) {
  if (!appWindow || !appOrigin) {
    return console.error(
      "Cannot send message to Chrome wrapper app - communication channel has not yet been opened"
    );
  }
  appWindow.postMessage(data, appOrigin);
}

window.addEventListener("message", _receiveMessage);
