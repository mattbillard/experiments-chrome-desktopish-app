

// parent 
chrome.app.window.getAll();
chrome.app.window.current(); // AppWindow (not same as window). Fails if you use key commands to reload parentWindow. Use chrome.runtime.reload() instead.
chrome.app.window.current().close(); // Same as window.close()
chrome.app.window.current().focus(); // Similar to restore
chrome.app.window.current().minimize();
chrome.app.window.current().maximize();
chrome.app.window.current().restore(); // unmaximize, unminimize + focus(?)
chrome.app.window.current().fullscreen();
chrome.app.window.current().moveTo(  );
chrome.app.window.current().resizeTo(  ); // Same as window.resizeTo()
chrome.app.window.current().setAlwaysOnTop(  );
chrome.app.window.current().setIcon(  );

chrome.browser.openTab({ url: 'http://localhost:3000' }); // Same as window.open(  )

chrome.contextMenus//...

chrome.management.getSelf(console.log);

chrome.runtime.getBackgroundPage(console.log); // Grandparent window (not AppWindow). Maybe same as  
chrome.runtime.reload(); // Essentially reboots. Lose any extra windows you've opened 
chrome.runtime.sendMessage();

chrome.storage//...

window.opener(); // The window that opened parent. Could be grandparent or another parent
window.location.reload(); // DOES NOT WORK





// child 
window.open(  ); // DOES NOT WORK. Webview doesn't seem to be allowed to open additional windows
window.resizeTo(100, 100); // DOES NOT WORK 

