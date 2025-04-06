console.log("Content script loaded");

// Define toxic words and images
const toxicWords = {
  violence: ["kill", "shoot", "attack"],
  nsfw: ["porn", "nude", "explicit"],
  abuse: ["stupid", "dumb", "idiot"]
};

// Hardcoded toxic image URLs (replace with real URLs or use placeholders)
const toxicImages = [
  "https://example.com/toxic-image1.jpg",
  "https://example.com/porn-image2.png",
  "https://example.com/violent-image3.gif"
];

let flaggedContent = [];

function blurToxicContent() {
  console.log("Starting blurToxicContent");
  flaggedContent = []; // Reset flagged content

  // Blur toxic text
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
              type: "text",
              text: match,
              label: label.toUpperCase(),
              confidence: 0.95
            });
            console.log(`Flagged text: ${match} as ${label.toUpperCase()}`);
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

  // Blur toxic images
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    const src = img.src.toLowerCase();
    toxicImages.forEach(toxicSrc => {
      if (src === toxicSrc) {
        img.style.filter = "blur(8px)";
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";

        const label = document.createElement("div");
        label.textContent = "NSFW IMAGE";
        Object.assign(label.style, {
          position: "absolute",
          top: "0",
          left: "0",
          background: "red",
          color: "white",
          fontSize: "10px",
          padding: "2px 4px",
          borderRadius: "3px",
          zIndex: "9999"
        });

        const parent = img.parentNode;
        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(label);

        flaggedContent.push({
          type: "image",
          text: src, // Use src as the "text" for images
          label: "NSFW",
          confidence: 0.95
        });
        console.log(`Flagged image: ${src} as NSFW`);
      }
    });
  });

  // Apply CSS for blurred text
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