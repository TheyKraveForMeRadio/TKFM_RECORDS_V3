if(!localStorage.getItem('TKFM_OWNER_KEY')) {
  alert('Access Denied: Owner Key Required');
  window.location.href = '/';
}
