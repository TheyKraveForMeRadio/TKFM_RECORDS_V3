function recordTrackPlay(artistEmail, trackName, amount=0){
  const trackId = artistEmail + "_" + trackName.replace(/\s+/g,'_');
  TKFM_CHARTS.recordPlay(trackId, amount);
}

// Example: every AI drop play
// recordTrackPlay("artist@example.com","Drop001", 0.25);
