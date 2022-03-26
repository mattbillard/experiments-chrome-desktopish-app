window.name = 'childWindow';

console.log('// Child');

class ChildApp {
  parentWindow;

  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("message", (event) => {
      console.log("....window message received:", event.data);
    
      // NOTE: store this.parentWindow and this.parentOrigin from first message
      if (!this.parentWindow) {
        this.parentWindow = event.source;
      }
    
      switch (event.data.command) {
        case 'broadcastFromParent': {
          this.outputBroadcastFromParent(event);
          break;
        }
      }
    });    
  };

  broadcastToParent(event) {
    event.preventDefault();
    const message = myInput.value;
    this.parentWindow.postMessage({ 
      command: 'broadcastFromChild', 
      message 
    }, '*');
  };

  commandParent(command) {
    this.parentWindow.postMessage({ command }, '*');
  }

  outputBroadcastFromParent(event) {
    const { message } = event.data;
    const messagesElem = window.messages;
    messagesElem.innerHTML += `\n${message}`;
    messagesElem.classList.add('flash');
    setTimeout(() => messagesElem.classList.remove('flash'), 250);
  }
}

const childApp = new ChildApp();

