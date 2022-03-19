/**
 * Listens for the app launching then creates the window
 *
 * @see /apps/app.window.html
 */
 chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === "hello") {
    sendResponse({farewell: "goodbye"});
  }
  
  chrome.app.window.create('index.html', {
    id: String(Date.now()),
    // bounds: { width: 620, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });
});