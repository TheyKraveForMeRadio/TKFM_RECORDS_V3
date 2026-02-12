async function renderLabelOS() {
  const res = await fetch('/.netlify/functions/label-os-cron');
  document.getElementById('labelOSStatus').innerText = await res.text();
}
renderLabelOS();
