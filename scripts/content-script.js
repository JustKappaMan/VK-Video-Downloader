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
    showPanel(createDownloadPanel(getSources()));
  }

  function getSources() {
    const sourceTags = document.querySelectorAll(
      'video source[type="video/mp4"]'
    );
    let sources = {};

    for (const tag of sourceTags) {
      if (tag.src.includes('&type=4')) {
        // Да, 144p выбивается из общей логики и имеет тип 4.
        // Возможно отглоски какого-то легаси.
        sources['144p'] = tag.src;
      } else if (tag.src.includes('&type=0')) {
        sources['240p'] = tag.src;
      } else if (tag.src.includes('&type=1')) {
        sources['360p'] = tag.src;
      } else if (tag.src.includes('&type=2')) {
        sources['480p'] = tag.src;
      } else if (tag.src.includes('&type=3')) {
        sources['720p'] = tag.src;
      } else if (tag.src.includes('&type=5')) {
        sources['1080p'] = tag.src;
      }
    }

    return sources;
  }

  function createDownloadPanel(sources) {
    const label = document.createElement('span');
    label.innerText = 'Скачать:';
    label.style.margin = '0 2px 0 0';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 12px';
    panel.appendChild(label);

    for (const [quality, url] of Object.entries(sources)) {
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
    label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
    label.style.color = '#f00';
    label.style.margin = '0 2px 0 0';

    const panel = document.createElement('div');
    panel.id = 'vkVideoDownloaderPanel';
    panel.style.margin = '8px 12px';
    panel.appendChild(label);

    return panel;
  }

  function showPanel(panel) {
    document.querySelector('div.VideoPage__video').after(panel);
  }
}