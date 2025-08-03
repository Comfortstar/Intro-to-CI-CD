const express = require('express');
const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Another route
app.get('/about', (req, res) => {
  res.send('This is a simple Node.js app!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

