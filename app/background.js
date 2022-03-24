
document.name = 'grandparentWindow';
window.name = 'grandparentWindow';
window.id = 'grandparentWindow';

console.log('// Grandparent');

window.addEventListener("message", (event) => {
  console.log("....window message received:", event.data);
});

chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('./src/index.html', { // Chrome insists URL must be local
    id: 'parentAppWindow0',
    // bounds: { width: 500, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('....runtime message received:', request);

  if (request.command === 'helloGrandparent') {
    console.log('....sending helloParent')
    sendResponse('....helloParent');
  }
});