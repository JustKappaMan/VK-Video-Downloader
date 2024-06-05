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
  panel.style.position = 'fixed';
  panel.style.left = '16px';
  panel.style.bottom = '16px';
  panel.style.zIndex = '2147483647';
  panel.style.padding = '4px';
  panel.style.color = '#fff';
  panel.style.backgroundColor = '#07f';
  panel.style.border = '1px solid #fff';
  panel.appendChild(label);

  for (const [quality, url] of Object.entries(videoSources)) {
    if (typeof url !== 'undefined') {
      const aTag = document.createElement('a');
      aTag.href = url;
      aTag.innerText = quality;
      aTag.style.margin = '0 2px';
      aTag.style.color = '#fff';
      panel.appendChild(aTag);
    }
  }

  document.body.appendChild(panel);
})();
