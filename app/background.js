
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('....message from sender:', sender);
  if (request.greeting === "hello") {
    sendResponse({farewell: "goodbye"});
  }
  
  chrome.app.window.create('index.html', {
    id: String(Date.now()),
    // bounds: { width: 620, height: 500 },
    frame: 'none', // Important: removes Chrome close, minimize, maximize button
  });
});