const DEFAULT_ENABLED = true;
function updateIcon(enabled) {
  const path = enabled
    ? { "16": "src/active_icon16.png", "96": "src/active_icon96.png" }
    : { "16": "src/icon16.png", "96": "src/icon96.png" };
  chrome.action.setIcon({ path });
}
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ enabled: DEFAULT_ENABLED }, (res) => {
    const enabled = !!res.enabled;
    chrome.storage.local.set({ enabled });
    updateIcon(enabled);
  });
});
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({ enabled: DEFAULT_ENABLED }, (res) => updateIcon(!!res.enabled));
});
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get({ enabled: DEFAULT_ENABLED }, (res) => {
    const enabled = !res.enabled;
    chrome.storage.local.set({ enabled }, () => {
      updateIcon(enabled);
      chrome.runtime.sendMessage({ type: "set-enabled", enabled });
    });
  });
});
