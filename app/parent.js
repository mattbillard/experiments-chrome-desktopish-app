var webview,
  targetOrigin = "http://localhost:3000/index.html?"+Date.now(); // Needed to prevent caching

window.addEventListener("load", function () {
  webview = document.getElementById("webview");
  console.log("....got webview:", webview);

  window.addEventListener("loadstop", function (event) {
    window.addEventListener("message", function (event) {
      console.log("....window received message:", event.data);
    });

    webview.contentWindow.postMessage({ command: "handshake", }, "*" );
  });

  // Set webview src attribute
  webview.src = targetOrigin;
});
