window.name = 'parentWindow';

console.log('// Parent');

var containerElem,
  targetOrigin = "http://localhost:3000/index.html?"+Date.now(); // NOTE: need random string on end to prevent caching

window.addEventListener("load", () => {
  containerElem = document.getElementById("container");


  // window.addEventListener("loadstop", (event) => { // For webview
  containerElem.addEventListener("load", (event) => { // For iframe
    window.addEventListener("message", (event) => {
      console.log("....window message received:", event.data);

      switch (event.data.command) {
        case 'broadcastFromChild':{
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

        case 'reloadAll':
          parentApp.reloadAll();
          break;
      }
    });

    // Send initial message so child knows who parent is and can reply
    console.log('....sending handshake to child')
    containerElem.contentWindow.postMessage({ command: "handshakeToChild", }, "*" );
  });

  // Set webview src attribute
  containerElem.src = targetOrigin;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("....runtime message received:", request);

  switch (request.command) {
    case 'broadcastParentToOthers': {
      const message = request.message;
      containerElem.contentWindow.postMessage({ 
        command: "broadcastFromParent", 
        message,
      }, "*" );
      break;
    }
  }
});

class ParentApp {
  constructor() {
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
  
  reloadAll(message) {
    chrome.runtime.sendMessage({ 
      command : "reloadAll",
      message,
    });
  };
};

const parentApp = new ParentApp();
