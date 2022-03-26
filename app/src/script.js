window.name = 'parentWindow';

console.log('// Parent');

class ParentApp {
  containerElem = document.getElementById("container");

  constructor() {
    this.addChromeListeners(); // NOTE: Chrome app window listenes for broadcasts from other Chrome app windows
    this.addWindowListeners(); // NOTE: parent window listens to messages from iframe child window
    this.containerElem.src = "http://localhost:3000/index.html?"+Date.now(); // NOTE: need random string on end to prevent caching;
  };

  addChromeListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("parent: runtime message received:", request);
    
      switch (request.command) {
        case 'broadcastParentToOthers': {
          const message = request.message;
          this.containerElem.contentWindow.postMessage({ 
            command: "broadcastFromParent", 
            message,
          }, "*" );
          break;
        }
      }
    });
  }

  addWindowListeners() {
    // window.addEventListener("loadstop", (event) => { // NOTE: syntax for webview is slightly different from iframe
    this.containerElem.addEventListener("load", (event) => {
      window.addEventListener("message", (event) => {
        console.log("parent: window message received:", event.data);
    
        switch (event.data.command) {
          case 'broadcastFromChild':
            parentApp.broadcastParentToOthers(event.data.message);
            break;

          case 'close':
            chrome.app.window.current().close();
            break;

          case 'focus':
            chrome.app.window.current().focus();
            break;

          case 'maximize':  
            const appWindow = chrome.app.window.current()
            appWindow.isMaximized() ? appWindow.restore() : appWindow.maximize();
            break;

          case 'minimize':
            chrome.app.window.current().minimize();
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
      console.log('parent: sending handshake to child')
      this.containerElem.contentWindow.postMessage({ command: "handshakeToChild", }, "*" );
    });
  }
  
  broadcastParentToOthers(message) {
    // NOTE: broadcasts message to Chrome app windows (not iframe child windows)
    chrome.runtime.sendMessage({ 
      command : "broadcastParentToOthers",
      message,
    });
  };

  openWindow() {
    chrome.app.window.create('./src/index.html', {
      id: 'parentAppWindow' + String(Date.now()),
      frame: 'none',
      bounds: { width: 500, height: 600 },
    });
  }
  
  reloadAll() {
    // NOTE: message background.js
    chrome.runtime.getBackgroundPage(backgroundWindow => {
      backgroundWindow.postMessage({ command : "messageParentToGrandParent" });
    })
  };
};

const parentApp = new ParentApp();
