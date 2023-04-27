'use strict';

let lastUrl = location.href;
let playerObserverIsRunning = false;

const pageObserver = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    playerObserverIsRunning = false;
  }

  if (
    /^\/video[^\/]+$/.test(location.pathname) &&
    document.querySelector('vk-video-player') &&
    !playerObserverIsRunning
  ) {
    playerObserverIsRunning = true;
    const hiddenPlayer = document.querySelector('vk-video-player').shadowRoot;
    const playerObserver = new MutationObserver(() => {
      if (hiddenPlayer.querySelector('video')) {
        playerObserver.disconnect();
        showDownloadPanel();
      } else if (hiddenPlayer.querySelector('iframe') || document.querySelector('iframe.VideoPage__externalPlayer')) {
        playerObserver.disconnect();
        showErrorPanel();
      }
    });
    playerObserver.observe(hiddenPlayer, { subtree: true, childList: true });
  }
});

pageObserver.observe(document.body, { subtree: true, childList: true });

function showDownloadPanel() {
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL('scripts/mobile-injection.js');
  document.querySelector('body').appendChild(script);
}

function showErrorPanel() {
  const label = document.createElement('span');
  label.innerText = 'Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с исходного сайта.';
  label.style.color = '#f00';

  const panel = document.createElement('div');
  panel.id = 'vkVideoDownloaderPanel';
  panel.style.margin = '8px 16px';
  panel.appendChild(label);

  document.querySelector('div.VideoPage__playerContainer').after(panel);
}