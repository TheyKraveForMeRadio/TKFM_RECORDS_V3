function ownerLock(action){
  const key = localStorage.getItem('TKFM_OWNER_KEY');
  if(!key){
    alert('Owner access required');
    return false;
  }
  console.log('[OWNER]', action);
  return true;
}
