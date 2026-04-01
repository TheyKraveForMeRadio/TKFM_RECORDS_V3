function animatePrice(el, newPrice, oldPrice){

  el.innerText = newPrice;

  if(newPrice > oldPrice){
    el.classList.remove("price-down");
    el.classList.add("price-up");
  } else if(newPrice < oldPrice){
    el.classList.remove("price-up");
    el.classList.add("price-down");
  }

  setTimeout(()=>{
    el.classList.remove("price-up","price-down");
  },1000);
}
