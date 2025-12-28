(function(){
  let enabled = true;
  function onWheel(e){
    if(e.ctrlKey){
      e.preventDefault();
      return false;
    }
  }
  function onKeyDown(e){
    if(!(e.ctrlKey || e.metaKey)) return;
    const k = e.key;
    if(k === "+" || k === "-" || k === "=" || k === "0" || k === "Add" || k === "Subtract"){
      e.preventDefault();
      return false;
    }
  }
  const wheelOpts = { passive: false, capture: true };
  const keyOpts = { capture: true };
  function addListeners(){
    window.addEventListener("wheel", onWheel, wheelOpts);
    window.addEventListener("keydown", onKeyDown, keyOpts);
  }
  function removeListeners(){
    window.removeEventListener("wheel", onWheel, wheelOpts);
    window.removeEventListener("keydown", onKeyDown, keyOpts);
  }
  chrome.storage.local.get({ enabled: true }, (res) => {
    enabled = !!res.enabled;
    if(enabled) addListeners();
  });
  chrome.runtime.onMessage.addListener((msg) => {
    if(msg && msg.type === "set-enabled"){
      const prev = enabled;
      enabled = !!msg.enabled;
      if(enabled && !prev) addListeners();
      if(!enabled && prev) removeListeners();
    }
  });
})();
