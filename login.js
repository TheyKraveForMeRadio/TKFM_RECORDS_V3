const SUPABASE_URL = "https://jgopbtuteqzooomxaulx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3BidHV0ZXF6b29vbXhhdWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODA1MzUsImV4cCI6MjA4MDQ1NjUzNX0.0ZiEaOd7ZXOgK1YXk-KcnyLFjTi4WngbX30j2gp5E0k"; // 🔥 KEEP YOUR REAL KEY

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🚀 SEND MAGIC LINK / CODE
async function sendCode() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://www.tkfmrecords.com"
    }
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Check your email for login 🚀");
  }
}

// 🚀 VERIFY 6-DIGIT CODE
async function verifyCode() {
  const email = document.getElementById("email").value;
  const token = document.getElementById("code").value;

  if (!email || !token) {
    alert("Enter email + code");
    return;
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    localStorage.setItem("tkfm_user", email);
    window.location.href = "/dashboard.html";
  }
}

// 🔥 AUTO LOGIN IF MAGIC LINK USED
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    const user = session.user.email;
    localStorage.setItem("tkfm_user", user);
    window.location.href = "/dashboard.html";
  }
});

// 🔗 BUTTON HOOKS
window.sendCode = sendCode;
window.verifyCode = verifyCode;
