const supabase = window.supabase.createClient(
  "https://jgopbtuteqzooomxaulx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3BidHV0ZXF6b29vbXhhdWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODA1MzUsImV4cCI6MjA4MDQ1NjUzNX0.0ZiEaOd7ZXOgK1YXk-KcnyLFjTi4WngbX30j2gp5E0k"
);

async function initAuth(){

  // 🔥 handle login from magic link
  const { data, error } = await supabase.auth.getSession();

  if(data?.session?.user){
    localStorage.setItem("tkfm_user", data.session.user.id);
    console.log("✅ Logged in:", data.session.user.id);
  }

}

initAuth();
