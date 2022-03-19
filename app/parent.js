document.name = 'parentWindow';
window.name = 'parentWindow';
window.id = 'parentWindow';

var webview,
  targetOrigin = "http://localhost:3000/index.html?"+Date.now(); // Needed to prevent caching

window.addEventListener("load", function () {
  webview = document.getElementById("webview");

  window.addEventListener("loadstop", function (event) {
    window.addEventListener("message", function (event) {
      console.log("....window message received:", event.data);

      switch (event.data.command) {
        case 'broadcast':
          parentApp.broadcastParentToOthers();
          break;

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
    webview.contentWindow.postMessage({ command: "handshake", }, "*" );
  });

  // Set webview src attribute
  webview.src = targetOrigin;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("....runtime message received:", request);
});

class ParentApp {
  constructor() {
    document.getElementById('close').addEventListener('click', () => this.close());
    document.getElementById('maximize').addEventListener('click', () => this.maximize());
    document.getElementById('minimize').addEventListener('click', () => this.minimize());
  };
  broadcastParentToOthers() {
    chrome.runtime.sendMessage({ command : "broadcastParentToOthers" });
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
    // chrome.runtime.sendMessage({ command : "messageParentToGrandParent" }, (response) => { console.log('...response: ', response); });
    chrome.runtime.sendMessage({ command : "messageParentToGrandParent" });
  };
  minimize() {
    chrome.app.window.current().minimize();
  };
  openWindow() {
    chrome.app.window.create('index.html', {
      id: 'parentAppWindow' + String(Date.now()),
      frame: 'none',
    });
  }
};

const parentApp = new ParentApp();
