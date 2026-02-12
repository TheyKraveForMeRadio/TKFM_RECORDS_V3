window.TKFM_RADIO = (function() {

  async function getRotation() {
    const res = await fetch("/.netlify/functions/radio-rotation");
    const data = await res.json();
    return data.rotation || [];
  }

  async function playNext(trackElementId) {
    const rotation = await getRotation();
    if (!rotation.length) return alert("No tracks available for rotation.");
    const audioEl = document.getElementById(trackElementId);
    let index = 0;
    audioEl.src = rotation[index];
    audioEl.play();

    audioEl.onended = () => {
      index = (index + 1) % rotation.length;
      audioEl.src = rotation[index];
      audioEl.play();
    };
  }

  return { getRotation, playNext };

})();
