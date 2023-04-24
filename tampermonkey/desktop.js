// ==UserScript==
// @name         VK-Video-Downloader-desktop
// @namespace    https://github.com/JustKappaMan
// @version      1.1.0
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://vk.com/*
// @run-at       document-idle
// @iconURL      https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/icons/icon32.png
// @icon64URL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/icons/icon64.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @supportURL   https://github.com/JustKappaMan/VK-Video-Downloader/issues
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/scripts/desktop.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/tampermonkey/scripts/desktop.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let lastUrl = location.href;
  let mainHasBeenCalled = false;

  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      mainHasBeenCalled = false;
    }

    if (location.search.includes('z=video')) {
      const checker = setInterval(() => {
        if (document.querySelector('#video_player')) {
          clearInterval(checker);
          main();
        }
      }, 100);
    }
  }).observe(document, { subtree: true, childList: true });

  function main() {
    if (mainHasBeenCalled) {
      return;
    } else {
      mainHasBeenCalled = true;
    }

    if (document.querySelector('#video_player iframe')) {
      showPanel(createErrorPanel());
    } else if (document.querySelector('#video_player video')) {
      showPanel(createDownloadPanel());
    }
  }

  function createDownloadPanel() {
    let videoSources = {
      '144p': window.mvcur.player.vars.url144,
      '240p': window.mvcur.player.vars.url240,
      '360p': window.mvcur.player.vars.url360,
      '480p': window.mvcur.player.vars.url480,
      '720p': window.mvcur.player.vars.url720,
      '1080p': window.mvcur.player.vars.url1080,
      '1440p': window.mvcur.player.vars.url1440,
      '2160p': window.mvcur.player.vars.url2160,
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
    label.innerText =
      'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
    label.style.color = '#f00';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 0';
    panel.appendChild(label);

    return panel;
  }

  function showPanel(panel) {
    /*
     * Не под всеми видео есть блок с названием.
     * Если он есть - располагаем ссылки над ним.
     * Иначе - над блоком с кнопками лайка, репоста и т.п.
     * Таким образом ссылки всегда будут находиться сразу под плеером.
     */
    const videoTitleBlock = document.querySelector('div.mv_title_wrap');
    if (videoTitleBlock) {
      panel.style.margin = '8px 0';
      videoTitleBlock.before(panel);
    } else {
      panel.style.margin = '8px 15px';
      document.querySelector('div.mv_actions_block').before(panel);
    }
  }
})();