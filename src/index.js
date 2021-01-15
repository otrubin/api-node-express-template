const app = require('./api/server');

const PORT = process.env.PORT || 3000;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "App worked" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});