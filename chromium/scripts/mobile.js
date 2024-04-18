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
    /^\/(?:video|clip)[^\/]+$/.test(location.pathname) &&
    !checkerHasBeenCalled &&
    (document.querySelector('div.VideoPage__playerContainer') || document.querySelector('div.VideoPage__video'))
  ) {
    checkerHasBeenCalled = true;
    const checker = setInterval(() => {
      if (
        !showPanelHasBeenCalled &&
        (document.querySelector('div.VideoPage__playerContainer vk-video-player') ||
          document.querySelector('div.VideoPage__video video'))
      ) {
        showPanelHasBeenCalled = true;
        clearInterval(checker);
        showDownloadPanel();
      } else if (!showPanelHasBeenCalled && document.querySelector('div.VideoPage__playerContainer iframe')) {
        showPanelHasBeenCalled = true;
        clearInterval(checker);
        showErrorPanel();
      }
    }, 500);
  }
}).observe(document.body, { subtree: true, childList: true });

function showDownloadPanel() {
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL('scripts/mobile-injection.js');
  document.body.appendChild(script);
}

function showErrorPanel() {
  const label = document.createElement('span');
  label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с него.';
  label.style.color = '#f00';

  const panel = document.createElement('div');
  panel.id = 'vkVideoDownloaderPanel';
  panel.style.margin = '8px 16px';
  panel.appendChild(label);

  document.querySelector('div.VideoPage__playerContainer').after(panel);
}
