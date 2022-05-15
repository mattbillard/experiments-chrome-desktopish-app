window.name = 'backgroundWindow';

console.log('// background.js');

// On launch open, 2 windows for demo
chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('./src/index.html', { // NOTE: Chrome insists URL must be local
    id: 'parentAppWindow1',
    bounds: { width: 500, height: 600 },
    frame: 'none', // NOTE: removes Chrome close, minimize, maximize button
  });
  
  chrome.app.window.create('./src/index.html', {
    id: 'parentAppWindow2',
    bounds: { width: 500, height: 600 },
    frame: 'none',
  });
});

window.addEventListener("message", (event) => {
  console.log('background: window message received:', event);

  switch(event.data.command) {
    case 'reloadAll':
      chrome.runtime.reload();
      break;
  }
});