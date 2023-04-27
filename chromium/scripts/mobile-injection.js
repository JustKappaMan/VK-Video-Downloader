'use strict';

(() => {
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
})();