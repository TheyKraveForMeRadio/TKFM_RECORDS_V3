module.exports = function(event){
  const key = event.headers["x-admin-key"];
  const ADMIN_KEY = process.env.TKFM_OWNER_KEY;

  if(!ADMIN_KEY){
    return { ok:false, error:"ADMIN KEY NOT SET" };
  }

  if(key !== ADMIN_KEY){
    return { ok:false, error:"UNAUTHORIZED" };
  }

  return { ok:true };
};
