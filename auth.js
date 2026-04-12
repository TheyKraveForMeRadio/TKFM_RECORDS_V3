const SUPABASE_URL = "https://jgopbtuteqzooomxaulx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3BidHV0ZXF6b29vbXhhdWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODA1MzUsImV4cCI6MjA4MDQ1NjUzNX0.0ZiEaOd7ZXOgK1YXk-KcnyLFjTi4WngbX30j2gp5E0k";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔥 HANDLE LOGIN ON PAGE LOAD
(async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const user = data.session.user.email;
    localStorage.setItem("tkfm_user", user);

    // ✅ ONLY redirect if NOT already on dashboard
    if (!window.location.pathname.includes("dashboard")) {
      window.location.href = "/dashboard.html";
    }
  }
})();
