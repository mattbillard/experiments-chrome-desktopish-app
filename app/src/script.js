document.name = 'parentWindow';
window.name = 'parentWindow';
window.id = 'parentWindow';

// window.location = 'http://localhost:8080'

console.log('// Parent');

var webview,
  targetOrigin = "http://localhost:3000/index.html?"+Date.now(); // Needed to prevent caching

window.addEventListener("load", () => {
  webview = document.getElementById("webview");

  console.log('...sending helloGrandparent')
  chrome.runtime.sendMessage({ command : "helloGrandparent" }, (response) => { 
    console.log('...response: ', response); 
  });

  // window.addEventListener("loadstop", (event) => { // For webview
  webview.addEventListener("load", (event) => { // For iframe
    window.addEventListener("message", (event) => {
      console.log("....window message received:", event.data);

      switch (event.data.command) {
        case 'broadcast':{
          const message = event.data.message;
          parentApp.broadcastParentToOthers(message);
          break;
        }

        case 'close':
          parentApp.close();
          break;

        case 'focus':
          parentApp.focus();
          break;

        case 'maximize':  
          parentApp.maximize();
          break;

        case 'messageChildToParent':
          parentApp.messageParentToGrandParent();
          break;

        case 'minimize':
          parentApp.minimize();
          break;

        case 'openWindow':
          parentApp.openWindow();
          break;
      }
    });

    // Send initial message so child knows who parent is and can reply
    console.log('....sending handshake to child')
    webview.contentWindow.postMessage({ command: "handshakeToChild", }, "*" );
  });

  // Set webview src attribute
  webview.src = targetOrigin;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("....runtime message received:", request);

  switch (request.command) {
    case 'broadcastParentToOthers': {
      const message = request.message;
      webview.contentWindow.postMessage({ 
        command: "broadcastFromParent", 
        message,
      }, "*" );
      break;
    }
  }
});

class ParentApp {
  constructor() {
    // document.getElementById('close').addEventListener('click', () => this.close());
    // document.getElementById('maximize').addEventListener('click', () => this.maximize());
    // document.getElementById('minimize').addEventListener('click', () => this.minimize());
  };
  broadcastParentToOthers(message) {
    chrome.runtime.sendMessage({ 
      command : "broadcastParentToOthers",
      message,
    });
  };
  close() {
    chrome.app.window.current().close();
  };
  focus() {
    chrome.app.window.current().focus();
  };
  maximize() {
    const appWindow = chrome.app.window.current()
    appWindow.isMaximized() ? appWindow.restore() : appWindow.maximize();
  };
  messageParentToGrandParent() {
    console.log('....passing messageParentToGrandParent');
    chrome.runtime.getBackgroundPage(backgroundWindow => {
      backgroundWindow.postMessage({ command : "messageParentToGrandParent" });
    })
  };
  minimize() {
    chrome.app.window.current().minimize();
  };
  openWindow() {
    chrome.app.window.create('./src/index.html', {
      id: 'parentAppWindow' + String(Date.now()),
      frame: 'none',
      bounds: { width: 500, height: 600 },
    });
  }
};

const parentApp = new ParentApp();
