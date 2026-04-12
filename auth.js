const supabase = window.supabase.createClient(
  "https://jgopbtuteqzooomxaulx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3BidHV0ZXF6b29vbXhhdWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODA1MzUsImV4cCI6MjA4MDQ1NjUzNX0.0ZiEaOd7ZXOgK1YXk-KcnyLFjTi4WngbX30j2gp5E0k"
);

async function handleAuth(){

  // 🔥 HANDLE MAGIC LINK TOKEN
  const hash = window.location.hash;

  if(hash && hash.includes("access_token")){
    const params = new URLSearchParams(hash.substring(1));

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if(access_token){
      await supabase.auth.setSession({
        access_token,
        refresh_token
      });

      // clean URL
      window.history.replaceState({}, document.title, "/");

      console.log("✅ Magic link login success");
    }
  }

  // 🔥 GET USER SESSION
  const { data } = await supabase.auth.getSession();

  if(data?.session?.user){
    const userId = data.session.user.id;

    localStorage.setItem("tkfm_user", userId);

    console.log("✅ Logged in:", userId);

    // 🔥 redirect after login
    if(window.location.pathname === "/" || window.location.pathname === "/login.html"){
      window.location.href = "/dashboard.html";
    }
  }

}

handleAuth();
