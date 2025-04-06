console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background received message:", request);
  if (request.action === "testNow") {
    const tabId = request.tabId || sender.tab.id;
    console.log("Executing script on tab", tabId);
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Script injection failed:", chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      console.log("Sending analyzeContent message to tab", tabId);
      chrome.tabs.sendMessage(tabId, { action: "analyzeContent", tabId: tabId }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message sending failed:", chrome.runtime.lastError.message);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        console.log("Response from content script:", response);
        sendResponse(response);
      });
    });
    return true; // Async response
  }
});