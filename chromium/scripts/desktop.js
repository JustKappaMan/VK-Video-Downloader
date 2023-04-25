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
        if (!mainHasBeenCalled) {
          mainHasBeenCalled = true;
          main();
        }
      }
    }, 100);
  }
}).observe(document.body, { subtree: true, childList: true });

function main() {
  if (document.querySelector('#video_player iframe')) {
    showErrorPanel();
  } else if (document.querySelector('#video_player video')) {
    showDownloadPanel();
  }
}

function showDownloadPanel() {
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL('scripts/desktop-injection.js');
  document.querySelector('body').appendChild(script);
}

function showErrorPanel() {
  const label = document.createElement('span');
  label.innerText =
    'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
  label.style.color = '#f00';

  const panel = document.createElement('div');
  panel.id = 'vkVideoDownloaderPanel';
  panel.style.margin = '8px 0';
  panel.appendChild(label);

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