document.name = 'childWindow';
window.name = 'childWindow';
window.id = 'childWindow';

console.log('// Child');

var appWindow;
var appOrigin;


window.addEventListener("message", (event) => {
  console.log("....window message received:", event.data);

  // First message: store appWindow and appOrigin
  if (!appWindow || !appOrigin) {
    appWindow = event.source;
    appOrigin = event.origin;

    console.log('....sending handShakeReplyToParent')
    // appWindow.postMessage({ command: "handShakeReplyToParent", }, appOrigin);
    appWindow.postMessage({ command: "handShakeReplyToParent", }, '*');
  }
});



class ChildApp {
  broadcast() {
    appWindow.postMessage({ command: 'broadcast' }, appOrigin);
  }
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
      command: 'messageChildToParent',
      message,
    }, '*');
  }
}

const childApp = new ChildApp();

