(function() {
  if (!window.TKFM_LABEL_GATE || !window.TKFM_LABEL_GATE.isActive()) return;

  // Load AI Drops
  const aiDropsScript = document.createElement("script");
  aiDropsScript.src = "/js/ai-drops-ui.js";
  document.head.appendChild(aiDropsScript);

  // Load Label Studio UI
  const labelStudioScript = document.createElement("script");
  labelStudioScript.src = "/js/label-studio-ui.js";
  document.head.appendChild(labelStudioScript);

  // Load Sponsor Reads UI
  const sponsorReadsScript = document.createElement("script");
  sponsorReadsScript.src = "/js/sponsor-reads-ui.js";
  document.head.appendChild(sponsorReadsScript);
})();
