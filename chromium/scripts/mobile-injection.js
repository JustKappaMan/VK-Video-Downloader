'use strict';

(() => {
  const isClip = /^\/clip[^\/]+$/.test(location.pathname);
  let videoSources = {};

  if (!isClip) {
    videoSources = window.videoMvkSdk.config.videos[0].sources.MPEG;
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
})();