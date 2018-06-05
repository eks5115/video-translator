


chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "background-popup");
  port.onMessage.addListener(function(message) {
    if (message.action === 'RELOAD_ACTIVE_TAB_ID') {
      handleReloadActiveTabId(message.payload);
      port.postMessage({question: "Who's there?"});
    }
  });
});
