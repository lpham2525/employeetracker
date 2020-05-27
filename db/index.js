const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "cms_db",
});

db.connect((err) => {
  console.log("connected!")
  if (err) {
    console.error(err);
  }
});

module.exports = db;
