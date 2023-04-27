// ==UserScript==
// @name         VK-Video-Downloader-mobile
// @namespace    https://github.com/JustKappaMan
// @version      1.1.2
// @license      MIT
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://m.vk.com/*
// @run-at       document-idle
// @iconURL      https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @supportURL   https://github.com/JustKappaMan/VK-Video-Downloader/issues
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/scripts/mobile.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/scripts/mobile.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let lastUrl = location.href;
  let playerObserverIsRunning = false;

  const pageObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      playerObserverIsRunning = false;
    }

    if (
      /^\/video[^\/]+$/.test(location.pathname) &&
      document.querySelector('vk-video-player') &&
      !playerObserverIsRunning
    ) {
      playerObserverIsRunning = true;
      const hiddenPlayer = document.querySelector('vk-video-player').shadowRoot;
      const playerObserver = new MutationObserver(() => {
        if (hiddenPlayer.querySelector('video')) {
          playerObserver.disconnect();
          showDownloadPanel();
        } else if (hiddenPlayer.querySelector('iframe')) {
          playerObserver.disconnect();
          showErrorPanel();
        }
      });
      playerObserver.observe(hiddenPlayer, { subtree: true, childList: true });
    }
  });

  pageObserver.observe(document.body, { subtree: true, childList: true });

  function showDownloadPanel() {
    const videoSources = window.videoMvkSdk.config.videos[0].sources.MPEG;

    const label = document.createElement('span');
    label.innerText = 'Скачать:';
    label.style.marginRight = '2px';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 16px';
    panel.appendChild(label);

    for (const [quality, url] of Object.entries(videoSources)) {
      const aTag = document.createElement('a');
      aTag.href = url;
      aTag.innerText = quality;
      aTag.style.margin = '0 2px';
      panel.appendChild(aTag);
    }

    document.querySelector('div.VideoPage__playerContainer').after(panel);
  }

  function showErrorPanel() {
    const label = document.createElement('span');
    label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
    label.style.color = '#f00';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 16px';
    panel.appendChild(label);

    document.querySelector('div.VideoPage__playerContainer').after(panel);
  }
})();