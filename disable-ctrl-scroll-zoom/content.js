let enabled = true;
let whitelist = [];

chrome.storage.sync.get(["enabled", "whitelist"], (data) => {
  enabled = data.enabled ?? true;
  whitelist = data.whitelist ?? [];
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) enabled = changes.enabled.newValue;
  if (changes.whitelist) whitelist = changes.whitelist.newValue;
});

function isWhitelisted() {
  return whitelist.some(site => location.hostname.endsWith(site));
}

// Ctrl + Scroll
window.addEventListener(
  "wheel",
  (e) => {
    if (!enabled) return;
    if (isWhitelisted()) return;

    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// Ctrl + +/-/0
window.addEventListener("keydown", (e) => {
  if (!enabled) return;
  if (isWhitelisted()) return;

  if (
    e.ctrlKey &&
    ["+", "-", "=", "0"].includes(e.key)
  ) {
    e.preventDefault();
  }
});
