require('dotenv').config();
const app = require('./api/server');
const db = require('./api/db');

const PORT = process.env.PORT || 3000;

// db.initial(); //! уничтожит все изменения в базе

const { emailToLowerString } = require('./api/middleware/global.middleware');
app.use(emailToLowerString);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "App workeddd" });
});

//all routes
require('./api/routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//! Черные списки jwt-токенов
//! Ограничение числа попыток авторизации (автоматическая блокировка)
// ! В таблице passwordresets надо, время от времени, удалять записи с истекшим сроком (см. (process.env.PASSWORD_RESET_TOKEN_EXPIRES)