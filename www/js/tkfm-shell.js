// TKFM Records Shell FX — Production Grade
// Neon orbit + subtle drift, performance-safe

document.addEventListener("DOMContentLoaded", () => {
  const bgMain  = document.querySelector(".tkfm-bg-main");
  const bgOrbit = document.querySelector(".tkfm-bg-orbit");

  if (!bgMain || !bgOrbit) return;

  // Respect reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let t = 0;
  let running = true;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const updateFX = () => {
    if (!running) return;

    t += 0.008;

    const x = clamp(Math.sin(t) * 2, -2, 2);
    const y = clamp(Math.cos(t) * 2, -2, 2);
    const r = (t * 50) % 360;

    bgMain.style.transform =
      `translate3d(${x}%, ${y}%, 0) scale(1.02)`;

    bgOrbit.style.transform =
      `rotate(${r}deg) scale(1.06)`;

    requestAnimationFrame(updateFX);
  };

  // Pause when tab not visible (CPU/GPU save)
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(updateFX);
  });

  requestAnimationFrame(updateFX);
});
