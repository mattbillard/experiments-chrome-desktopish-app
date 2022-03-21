document.name = 'childWindow';
window.name = 'childWindow';
window.id = 'childWindow';

console.log('// Child');

var parentWindow;
var parentOrigin;


window.addEventListener("message", (event) => {
  console.log("....window message received:", event.data);

  // First message: store parentWindow and parentOrigin
  if (!parentWindow || !parentOrigin) {
    parentWindow = event.source;
    parentOrigin = event.origin;

    console.log('....sending handShakeReplyToParent')
    // parentWindow.postMessage({ command: "handShakeReplyToParent", }, parentOrigin);
    parentWindow.postMessage({ command: "handShakeReplyToParent", }, '*');
  }
});



class ChildApp {
  broadcast() {
    parentWindow.postMessage({ command: 'broadcast' }, '*');
  }
  close() {
    parentWindow.postMessage({ command: 'close' }, '*');
  }
  focus() {
    setTimeout(() => {
      parentWindow.postMessage({ command: 'focus' }, '*');
    }, 5000);
  }
  minimize() {
    parentWindow.postMessage({ command: 'minimize' }, '*');
  }
  maximize() {
    parentWindow.postMessage({ command: 'maximize' }, '*');
  }
  openWindow () {
    parentWindow.postMessage({
      command: 'openWindow',
    }, '*');
  }
  sendMessage(event) {
    event.preventDefault();
    const message = myInput.value || 'default message3';
    parentWindow.postMessage({
      command: 'messageChildToParent',
      message,
    }, '*');
  }
}

const childApp = new ChildApp();

