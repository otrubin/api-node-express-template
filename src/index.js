require('dotenv').config();
const app = require('./api/server');
const db = require('./api/db');

const PORT = process.env.PORT || 3000;

//db.initial();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "App worked" });
});

//all routes
require('./api/routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});