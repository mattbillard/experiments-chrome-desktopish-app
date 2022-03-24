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

  switch (event.data.command) {
    case 'broadcastFromParent': {
      const { message } = event.data;
      const messagesElem = window.messages;
      messagesElem.innerHTML += `\n${message}`;
      messagesElem.classList.add('flash');
      setTimeout(() => messagesElem.classList.remove('flash'), 250);
      break;
    }

  }
});



class ChildApp {
  broadcast(event) {
    event.preventDefault();
    const message = myInput.value || '';
    parentWindow.postMessage({ 
      command: 'broadcast', 
      message 
    }, '*');
  }
  close() {
    parentWindow.postMessage({ command: 'close' }, '*');
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
}

const childApp = new ChildApp();

