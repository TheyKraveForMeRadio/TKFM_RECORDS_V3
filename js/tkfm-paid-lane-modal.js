function openPaidLane(plan){
  if(!ownerLock('open-paid-lane')) return;
  if(confirm('Proceed to checkout?')){
    tkfmQuickCheckout(plan);
  }
}
