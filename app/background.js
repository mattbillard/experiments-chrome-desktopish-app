
document.name = 'grandparentWindow';
window.name = 'grandparentWindow';
window.id = 'grandparentWindow';

chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('index.html', { // Chrome insists URL must be local
    id: 'parentAppWindow0',
    // bounds: { width: 500, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });

  setTimeout(() => {
    console.log('....broadcastGrandParentToParents')
    chrome.runtime.sendMessage({ command: 'broadcastGrandParentToParents' });
  }, 10000)
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('....runtime message received:', request);

  // if (request.command === 'messageParentToGrandParent') {
  //   console.log('....acknowledging')
  //   sendResponse('....acknowledged');

  //   console.log('....broadcastGrandParentToParents')
  //   chrome.runtime.sendMessage({ command: 'broadcastGrandParentToParents' });
  // }
});