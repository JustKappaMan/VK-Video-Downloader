'use strict';

(() => {
  const videoSources = {
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
})();