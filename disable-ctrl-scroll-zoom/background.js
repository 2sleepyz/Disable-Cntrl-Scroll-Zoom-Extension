function updateIcon(enabled) {
  chrome.action.setIcon({
    path: {
      16: enabled ? "./src/active_icon16.png" : "./src/icon16.png",
      96: enabled ? "./src/active_icon96.png" : "./src/icon96.png"
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    enabled: true,
    whitelist: []
  });

  updateIcon(true);
});

chrome.action.onClicked.addListener(async () => {
  const data = await chrome.storage.sync.get("enabled");
  const newState = !data.enabled;

  chrome.storage.sync.set({ enabled: newState });
  updateIcon(newState);
});

chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.sync.get("enabled");
  updateIcon(data.enabled ?? true);
});
