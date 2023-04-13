const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('API is working!! Lessgo :D');
});

app.listen(5000, () => {
  console.log('Server Listening on port 5000');
});
