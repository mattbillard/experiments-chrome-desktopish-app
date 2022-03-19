document.name = 'childWindow';
window.name = 'childWindow';
window.id = 'childWindow';

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



class ChildApp {
  close() {
    appWindow.postMessage({ command: 'close' }, appOrigin);
  }
  focus() {
    setTimeout(() => {
      appWindow.postMessage({ command: 'focus' }, appOrigin);
    }, 5000);
  }
  minimize() {
    appWindow.postMessage({ command: 'minimize' }, appOrigin);
  }
  maximize() {
    appWindow.postMessage({ command: 'maximize' }, appOrigin);
  }
  openWindow () {
    appWindow.postMessage({
      command: 'openWindow',
    }, appOrigin);
  }
  sendMessage() {
    const message = myInput.value || 'default message3';
    appWindow.postMessage({
      command: 'sendMessage',
      message,
    }, appOrigin);
  }
}

const childApp = new ChildApp();

