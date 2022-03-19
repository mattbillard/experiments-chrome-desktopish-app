// window.addEventListener('click', () => {
window.myButton.addEventListener('click', () => {
  console.log('....hi');
  // alert();
  // window.postMessage('message', '*');

  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
})

// document.addEventListener("message", () => {
//   console.log('....postMessage received')
//   debugger;
// });
