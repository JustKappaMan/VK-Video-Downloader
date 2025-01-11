// ==UserScript==
// @name         VK-Video-Downloader-desktop
// @namespace    https://github.com/JustKappaMan
// @version      1.1.12
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://vk.com/*
// @match        https://vk.ru/*
// @match        https://vkvideo.ru/*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let lastUrl = location.href;
  let checkerHasBeenCalled = false;
  let showPanelHasBeenCalled = false;

  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      checkerHasBeenCalled = false;
      showPanelHasBeenCalled = false;

      const old_panel = document.querySelector("#vkVideoDownloaderPanel");
      if (old_panel !== null) {
        old_panel.remove();
      }
    }

    if (
      (/z=(?:video|clip)/.test(location.search) ||
        /^\/(?:video|clip)[^\/s]+$/.test(location.pathname) ||
        /^\/playlist\/[\d-]+/.test(location.pathname)) &&
      !checkerHasBeenCalled
    ) {
      checkerHasBeenCalled = true;
      const checker = setInterval(() => {
        if (!showPanelHasBeenCalled && document.querySelector("#video_player video")) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          document.body.appendChild(createDownloadPanel());
        } else if (!showPanelHasBeenCalled && document.querySelector("#video_player iframe")) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          document.body.appendChild(createErrorPanel());
        }
      }, 500);
    }
  }).observe(document.body, { subtree: true, childList: true });

  function createDownloadPanel() {
    const supportedWindow = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
    const playerVars = supportedWindow.mvcur?.player?.vars || supportedWindow.cur?.videoInlinePlayer?.vars;

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

    return panel;
  }

  function createErrorPanel() {
    const label = document.createElement("span");
    label.innerText = "Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с него.";

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

    return panel;
  }
})();
