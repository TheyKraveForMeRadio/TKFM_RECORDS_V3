const API = "https://tkfm-records-v3.onrender.com/engine"

function authFetch(url, options = {}){
  return fetch(API + url, {
    ...options,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  })
}
