console.log("Popup script loaded");

function displayFlaggedContent(flaggedItems) {
  console.log("Displaying flagged items:", flaggedItems);
  const list = document.getElementById("flaggedList");
  list.innerHTML = "";
  if (flaggedItems.length === 0) {
    list.innerHTML = "<li>No toxic content flagged.</li>";
  } else {
    flaggedItems.forEach(item => {
      const li = document.createElement("li");
      // Show actual text/image src with label and confidence
      li.textContent = `${item.type === "image" ? "Image: " : "Text: "} ${item.text} - ${item.label} (${(item.confidence * 100).toFixed(1)}%)`;
      list.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup DOM loaded");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id.toString();
    console.log("Fetching stored data for tab", tabId);
    chrome.storage.local.get(tabId, (data) => {
      const flaggedItems = data[tabId] || [];
      displayFlaggedContent(flaggedItems);
    });
  });

  document.getElementById("testButton").addEventListener("click", () => {
    console.log("Test button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      console.log("Sending testNow message for tab", tabId);
      chrome.runtime.sendMessage({ action: "testNow", tabId: tabId }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
          return;
        }
        if (response && response.success) {
          console.log("Test succeeded, fetching updated data");
          chrome.storage.local.get(tabId.toString(), (data) => {
            const flaggedItems = data[tabId.toString()] || [];
            displayFlaggedContent(flaggedItems);
          });
        } else {
          console.error("Test failed:", response?.error || "Unknown error");
        }
      });
    });
  });
});