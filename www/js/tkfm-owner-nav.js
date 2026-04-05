document.addEventListener('DOMContentLoaded', () => {
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <ul style="display:flex;gap:10px">
      <li><a href="owner-upload.html">Upload</a></li>
      <li><a href="owner-analytics.html">Analytics</a></li>
      <li><a href="owner-label-lab.html">Label Lab</a></li>
      <li><a href="owner-mixes.html">Mixtapes</a></li>
    </ul>`;
  document.body.prepend(nav);
});
