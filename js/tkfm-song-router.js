
document.addEventListener("click",function(e){

const el = e.target.closest("[data-token]")

if(!el) return

const token = el.dataset.token

window.location =
"/tkfm-song-trading.html?token_id=" + token

})

