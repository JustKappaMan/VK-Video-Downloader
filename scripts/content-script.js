'use strict';

let lastUrl = location.href;

new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
  }
  if (location.pathname.includes('/video-')) {
    const checker = setInterval(() => {
      if (document.querySelector('div.VideoPage__video')) {
        clearInterval(checker);
        main();
      }
    }, 100);
  }
}).observe(document, { subtree: true, childList: true });

function main() {
  if (
    document.querySelector('div.VideoPage__video iframe') &&
    !document.querySelector('#vkVideoDownloaderPanel')
  ) {
    showPanel(createErrorPanel());
  } else if (
    document.querySelector('div.VideoPage__video video') &&
    !document.querySelector('#vkVideoDownloaderPanel')
  ) {
    showPanel(createDownloadPanel(getVideoSources()));
  }
}

function getVideoSources() {
  const sourceTags = document.querySelectorAll(
    'video source[type="video/mp4"]'
  );
  let videoSources = {};

  for (const tag of sourceTags) {
    if (tag.src.includes('&type=4')) {
      // Yes, 144p corresponds to type 4. May be some legacy stuff.
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
    }
  }

  return videoSources;
}

function createDownloadPanel(videoSources) {
  const label = document.createElement('span');
  label.innerText = 'Скачать:';
  label.style.marginRight = '2px';

  const panel = document.createElement('div');
  panel.id = 'vkVideoDownloaderPanel';
  panel.style.margin = '8px 12px';
  panel.appendChild(label);

  for (const [quality, url] of Object.entries(videoSources)) {
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.innerText = quality;
    aTag.style.margin = '0 2px';
    panel.appendChild(aTag);
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
  panel.style.margin = '8px 12px';
  panel.appendChild(label);

  return panel;
}

function showPanel(panel) {
  document.querySelector('div.VideoPage__video').after(panel);
}