var appWindow;
var appOrigin;

function _receiveMessage(event) {
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

myButton.addEventListener('click', () => {
  appWindow.postMessage('test', appOrigin);
})
