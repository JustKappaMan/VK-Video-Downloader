'use strict';

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/content-script.js'],
  });
});
