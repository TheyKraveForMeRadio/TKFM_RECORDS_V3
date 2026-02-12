(function(){
  const KEY = "TKFM_OWNER_OK";
  window.isTKFMOwner = true;

  try {
    localStorage.setItem(KEY,"true");
    sessionStorage.setItem(KEY,"true");
  } catch(e){}

  window.TKFM_IS_OWNER = () => true;
  console.log("TKFM RECORDS — OWNER IMMUNITY ACTIVE");
})();
