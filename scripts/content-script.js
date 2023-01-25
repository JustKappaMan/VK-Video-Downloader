'use strict';

if (
  location.hostname === 'm.vk.com' &&
  document.querySelector('div.VideoPage__video iframe')
) {
  alert('Видео встроено со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.');
} else if (
  location.hostname === 'm.vk.com' &&
  document.querySelector('div.VideoPage__video video.vv_inline_video') &&
  !document.querySelector('#downloadPanel')
) {
  document
    .querySelector('div.VideoPage__video')
    .after(createDownloadPanel(getSources()));
}


function getSources() {
  const sourceTags = document.querySelectorAll(
    'video.vv_inline_video source[type="video/mp4"]'
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
  let panel = document.createElement('div');
  panel.id = 'downloadPanel';
  panel.style.margin = '8px 12px';

  let label = document.createElement('span');
  label.innerText = 'Скачать:';
  label.style.margin = '0 2px 0 0';
  panel.appendChild(label);

  for (const [quality, url] of Object.entries(sources)) {
    let aTag = document.createElement('a');
    aTag.href = url;
    aTag.innerText = quality;
    aTag.style.margin = '0 2px';
    panel.appendChild(aTag);
  }

  return panel;
}