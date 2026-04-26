const express = require('express');
const path = require('path');

const app = express();

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'OK' });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ FIXED CATCH-ALL (NO "*")
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('🔥 Server running on ' + PORT);
});
