// ==UserScript==
// @name         VK-Video-Downloader-desktop
// @namespace    https://github.com/JustKappaMan
// @version      1.1.7
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://vk.com/*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/desktop.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/desktop.js
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
      (/z=(?:video|clip)/.test(location.search) || /^\/(?:video|clip)[^\/s]+$/.test(location.pathname)) &&
      !checkerHasBeenCalled
    ) {
      checkerHasBeenCalled = true;
      const checker = setInterval(() => {
        if (!showPanelHasBeenCalled && document.querySelector('#video_player video')) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          showPanel(createDownloadPanel());
        } else if (!showPanelHasBeenCalled && document.querySelector('#video_player iframe')) {
          showPanelHasBeenCalled = true;
          clearInterval(checker);
          showPanel(createErrorPanel());
        }
      }, 500);
    }
  }).observe(document.body, { subtree: true, childList: true });

  function createDownloadPanel() {
    const supportedWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
    const videoSources = {
      '144p': supportedWindow.mvcur.player.vars.url144,
      '240p': supportedWindow.mvcur.player.vars.url240,
      '360p': supportedWindow.mvcur.player.vars.url360,
      '480p': supportedWindow.mvcur.player.vars.url480,
      '720p': supportedWindow.mvcur.player.vars.url720,
      '1080p': supportedWindow.mvcur.player.vars.url1080,
      '1440p': supportedWindow.mvcur.player.vars.url1440,
      '2160p': supportedWindow.mvcur.player.vars.url2160,
    };

    const label = document.createElement('span');
    label.innerText = 'Скачать:';
    label.style.marginRight = '2px';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.appendChild(label);

    for (const [quality, url] of Object.entries(videoSources)) {
      if (typeof url !== 'undefined') {
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.innerText = quality;
        aTag.style.margin = '0 2px';
        panel.appendChild(aTag);
      }
    }

    return panel;
  }

  function createErrorPanel() {
    const label = document.createElement('span');
    label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
    label.style.color = '#f00';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 0';
    panel.appendChild(label);

    return panel;
  }

  function showPanel(panel) {
    const isClip = location.search.includes('z=clip') || /^\/clip[^\/]+$/.test(location.pathname);
    if (!isClip) {
      const videoTitleBlock = document.querySelector('div.mv_title_wrap');
      if (videoTitleBlock) {
        panel.style.margin = '8px 0';
        videoTitleBlock.before(panel);
      } else {
        panel.style.margin = '8px 15px';
        document.querySelector('div.mv_actions_block').before(panel);
      }
    } else {
      panel.style.margin = '8px 15px 0';
      document.querySelector('div.VerticalVideoLayerInfo__mainInfoWrap').after(panel);
    }
  }
})();
