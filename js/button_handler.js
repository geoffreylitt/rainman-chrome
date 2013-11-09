// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // inject jquery
  chrome.tabs.executeScript({
    file: '/js/lib/jquery-1.10.2.js'
  });

  //inject our logic
  chrome.tabs.executeScript({
    file: '/js/page_loader.js'
  });
});