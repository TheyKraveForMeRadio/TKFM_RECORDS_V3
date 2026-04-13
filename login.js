const SUPABASE_URL = "https://jgopbtuteqzooomxaulx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3BidHV0ZXF6b29vbXhhdWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODA1MzUsImV4cCI6MjA4MDQ1NjUzNX0.0ZiEaOd7ZXOgK1YXk-KcnyLFjTi4WngbX30j2gp5E0k";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function sendCode() {
  const email = document.getElementById("email").value;

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://www.tkfmrecords.com"
    }
  });

  console.log("OTP RESPONSE:", data, error);

  if (error) {
    alert("ERROR: " + error.message);
  } else {
    alert("Code sent (check ALL folders)");
  }
}

async function verifyCode() {
  const email = document.getElementById("email").value;
  const token = document.getElementById("code").value;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });

  console.log("VERIFY:", data, error);

  if (error) {
    alert("VERIFY ERROR: " + error.message);
  } else {
    localStorage.setItem("tkfm_user", email);
    window.location.href = "/dashboard.html";
  }
}

window.sendCode = sendCode;
window.verifyCode = verifyCode;
