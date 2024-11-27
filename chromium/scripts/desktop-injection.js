"use strict";

(() => {
  const playerVars = window.mvcur?.player?.vars || window.cur?.videoInlinePlayer?.vars;

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
})();
