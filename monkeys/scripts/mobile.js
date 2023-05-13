// ==UserScript==
// @name         VK-Video-Downloader-mobile
// @namespace    https://github.com/JustKappaMan
// @version      1.1.6
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://m.vk.com/*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/mobile.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/mobile.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let lastUrl = location.href;
  let checkerHasBeenCalled = false;
  let showPanelHasBeenCalled = false;

  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      checkerHasBeenCalled = false;
      showPanelHasBeenCalled = false;
    }

    if (
      /^\/(?:video|clip)[^\/]+$/.test(location.pathname) &&
      !checkerHasBeenCalled &&
      (document.querySelector('div.VideoPage__playerContainer') || document.querySelector('div.VideoPage__video'))
    ) {
      checkerHasBeenCalled = true;
      const checker = setInterval(() => {
        if (
          !showPanelHasBeenCalled &&
          (document.querySelector('div.VideoPage__playerContainer vk-video-player') ||
            document.querySelector('div.VideoPage__video video'))
        ) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          showDownloadPanel();
        } else if (!showPanelHasBeenCalled && document.querySelector('div.VideoPage__playerContainer iframe')) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          showErrorPanel();
        }
      }, 500);
    }
  }).observe(document.body, { subtree: true, childList: true });

  function showDownloadPanel() {
    const isClip = /^\/clip[^\/]+$/.test(location.pathname);
    const supportedWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
    let videoSources = {};

    if (!isClip) {
      videoSources = supportedWindow.videoMvkSdk.config.videos[0].sources.MPEG;
    } else {
      const sourceTags = Array.from(document.querySelectorAll('video source[type="video/mp4"]')).reverse();

      for (const tag of sourceTags) {
        if (tag.src.includes('&type=4')) {
          videoSources['144p'] = tag.src;
        } else if (tag.src.includes('&type=0')) {
          videoSources['240p'] = tag.src;
        } else if (tag.src.includes('&type=1')) {
          videoSources['360p'] = tag.src;
        } else if (tag.src.includes('&type=2')) {
          videoSources['480p'] = tag.src;
        } else if (tag.src.includes('&type=3')) {
          videoSources['720p'] = tag.src;
        } else if (tag.src.includes('&type=5')) {
          videoSources['1080p'] = tag.src;
        } else if (tag.src.includes('&type=6')) {
          videoSources['1440p'] = tag.src;
        } else if (tag.src.includes('&type=7')) {
          videoSources['2160p'] = tag.src;
        }
      }
    }

    const label = document.createElement('span');
    label.innerText = 'Скачать:';
    label.style.marginRight = '2px';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.appendChild(label);

    for (const [quality, url] of Object.entries(videoSources)) {
      const aTag = document.createElement('a');
      aTag.href = url;
      aTag.innerText = quality;
      aTag.style.margin = '0 2px';
      panel.appendChild(aTag);
    }

    if (!isClip) {
      panel.style.margin = '8px 16px';
      document.querySelector('div.VideoPage__playerContainer').after(panel);
    } else {
      panel.style.margin = '8px 12px';
      document.querySelector('div.VideoPage__video').after(panel);
    }
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