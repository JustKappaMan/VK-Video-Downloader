"use strict";

(() => {
  // 1. Listen for messages sent from the page-world script
  window.addEventListener("message", (e) => {
    if (e.data?.source !== "vk-downloader") return;

    const playerVars = e.data.vars;

    const videoSources = {
      "144p": playerVars.url144,
      "240p": playerVars.url240,
      "360p": playerVars.url360,
      "480p": playerVars.url480,
      "720p": playerVars.url720,
      "1080p": playerVars.url1080,
      "1440p": playerVars.url1440,
      "2160p": playerVars.url2160,
    };

    const label = document.createElement("span");
    label.innerText = "Скачать:";
    label.style.marginRight = "2px";

    const panel = document.createElement("div");
    panel.id = "vkVideoDownloaderPanel";
    panel.style.position = "fixed";
    panel.style.left = "16px";
    panel.style.bottom = "16px";
    panel.style.zIndex = "2147483647";
    panel.style.padding = "4px";
    panel.style.color = "#fff";
    panel.style.backgroundColor = "#07f";
    panel.style.border = "1px solid #fff";
    panel.appendChild(label);

    for (const [quality, url] of Object.entries(videoSources)) {
      if (typeof url !== "undefined") {
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.innerText = quality;
        aTag.style.margin = "0 2px";
        aTag.style.color = "#fff";
        panel.appendChild(aTag);
      }
    }

    document.body.appendChild(panel);
  });

  // 2. Inject a script into the page context to access player variables
  const script = document.createElement("script");
  script.textContent = `
    (function () {
      let tries = 0;
      const MAX_TRIES = 50;

      // Repeatedly check until the player variables become available
      const timer = setInterval(() => {
        tries++;

        const vars =
          window.VideoPlayerService?.activePlayer?.vars ||
          window.mvcur?.player?.vars ||
          window.cur?.videoInlinePlayer?.vars;

        // VK player exposes URLs as non-enumerable properties; must check known fields explicitly
        const urlsExist = vars && (
          vars.url144 || vars.url240 || vars.url360 || vars.url480 ||
          vars.url720 || vars.url1080 || vars.url1440 || vars.url2160
        );
        
        if (!urlsExist) {
          if (tries >= MAX_TRIES) {
            clearInterval(timer);
          }
          return;
        }


        clearInterval(timer);

        // Send detected URLs back to the content script
        window.postMessage({
          source: "vk-downloader",
          vars
        }, "*");
      }, 200);
    })();
  `;

  (document.head || document.documentElement).appendChild(script);
  script.remove();
})();
