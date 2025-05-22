// src/server.js
import app from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Podcast Service is running on port ${PORT}`);
});
