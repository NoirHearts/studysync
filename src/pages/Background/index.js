console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
