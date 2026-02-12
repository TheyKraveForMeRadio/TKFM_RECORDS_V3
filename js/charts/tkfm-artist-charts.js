window.TKFM_CHARTS = (function(){
  const plays = {}; // trackId -> play count
  const earnings = {}; // trackId -> $ earned

  function recordPlay(trackId, amount=0){
    plays[trackId] = (plays[trackId] || 0) + 1;
    earnings[trackId] = (earnings[trackId] || 0) + amount;
  }

  function artistStats(artistEmail){
    const stats = [];
    for(const trackId in plays){
      if(trackId.startsWith(artistEmail + "_")){
        stats.push({ trackId, plays: plays[trackId], earnings: earnings[trackId] });
      }
    }
    return stats.sort((a,b)=>b.plays - a.plays);
  }

  function artistRank(artistEmail){
    const totalPlays = Object.entries(plays)
      .filter(([k,_])=>k.startsWith(artistEmail+"_"))
      .reduce((sum,[_,v])=>sum+v,0);

    if(totalPlays >= 1000) return "Platinum";
    if(totalPlays >= 500) return "Gold";
    if(totalPlays >= 250) return "Silver";
    if(totalPlays >= 50) return "Bronze";
    return "Newbie";
  }

  return { recordPlay, artistStats, artistRank };
})();
