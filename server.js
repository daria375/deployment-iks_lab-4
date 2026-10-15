const express = require("express");
const mysql = require("mysql2");
const app = express();

const PORT = process.env.PORT || 4000;
const APP_ENV = process.env.APP_ENV || "development";

// Налаштування підключення до бази даних MySQL всередині Docker-мережі
const db = mysql.createConnection({
  host: "db",         // Ім'я контейнера MySQL у спільній мережі myapp-net
  user: "root",
  password: "1234"
});

// Перевірка підключення при затупу серверу
db.connect((err) => {
  if (err) {
    console.error("Помилка підключення до бази даних:", err);
  } else {
    console.log("Успішно підключено до MySQL бази даних (host: db)!");
  }
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello from my custom Node.js Docker image! (Environment: ${APP_ENV})</h1>`);
});

app.get("/about", (req, res) => {
  res.send(`<h2>This is a simple Express app running on port ${PORT}</h2>`);
});

// Додатковий маршрут для перевірки з'єднання з БД через браузер
app.get("/db-check", (req, res) => {
  db.query("SELECT 1", (err, results) => {
    if (err) {
      res.status(500).send(`<h3>Помилка запиту до БД: ${err.message}</h3>`);
    } else {
      res.send(`<h3>База даних успішно відповідає на запити! З'єднання стабільне.</h3>`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
