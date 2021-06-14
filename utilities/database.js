const MySQL = require("mysql");

const sql = MySQL.createConnection({
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD,
 database: process.env.MYSQL_DATABASE,
 charset: "utf8mb4",
 port: "3306",
});
sql.connect((err) => {
 if (err) {
  throw new Error("SQL] Impossible to connect to MySQL server. Code: " + err.code);
  process.exit(99);
 } else {
  console.log("[SQL] Connected to the MySQL server! Connection ID: " + sql.threadId);
 }
});

module.exports = sql;
