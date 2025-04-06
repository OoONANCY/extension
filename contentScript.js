console.log("Content script loaded");

// Define toxic words with categories
const toxicWords = {
  violence: ["kill", "shoot", "attack"],
  nsfw: ["porn", "nude", "explicit", "nsfw"],
  abuse: ["stupid", "dumb", "idiot"]
};

let flaggedContent = [];

function blurToxicContent() {
  console.log("Starting blurToxicContent");
  flaggedContent = []; // Reset flagged content

  // Use querySelectorAll for broader coverage
  const elements = document.querySelectorAll("body, body *");
  elements.forEach(el => {
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        let modified = false;
        let newHTML = text;

        for (const [label, words] of Object.entries(toxicWords)) {
          const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
          newHTML = newHTML.replace(regex, (match) => {
            modified = true;
            flaggedContent.push({
              text: match,
              label: label.toUpperCase(),
              confidence: 0.95
            });
            console.log(`Flagged: ${match} as ${label.toUpperCase()}`);
            return `<span class="blurred-word" data-label="${label.toUpperCase()}">${match}</span>`;
          });
        }

        if (modified) {
          const span = document.createElement("span");
          span.innerHTML = newHTML;
          node.replaceWith(span);
        }
      }
    });
  });

  // Apply CSS
  const style = document.createElement("style");
  style.textContent = `
    .blurred-word {
      filter: blur(4px);
      position: relative;
      display: inline-block;
      background-color: rgba(255, 0, 0, 0.1);
    }
    .blurred-word:hover {
      filter: none;
    }
    .blurred-word::after {
      content: attr(data-label);
      position: absolute;
      top: -1.5em;
      left: 0;
      background: red;
      color: white;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 3px;
      zIndex: 9999;
    }
  `;
  document.head.appendChild(style);
  console.log("CSS applied, flagged content:", flaggedContent);
}

// Handle messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  if (request.action === "analyzeContent") {
    blurToxicContent();
    chrome.storage.local.set({ [request.tabId]: flaggedContent }, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log("Stored flagged content for tab", request.tabId, flaggedContent);
        sendResponse({ success: true, flagged: flaggedContent });
      }
    });
    return true; // Async response
  }
});