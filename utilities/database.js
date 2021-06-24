const MySQL = require("mysql");
const chalk = require("chalk");
const gradient = require("gradient-string");

// Checking env values
if (!process.env.MYSQL_HOST) throw new Error("[SQL] You need to provide MYSQL Host in .env file - MYSQL_HOST=YOUR_MYSQL_HOST Note: You don't need to provide port to MYSQL Server, you only need to provide domain eg. localhost not localhost:3306!");
if (!process.env.MYSQL_USER) throw new Error("[SQL] You need to provide MYSQL User in .env file - MYSQL_USER=YOUR_MYSQL_USER_NAME");
if (!process.env.MYSQL_PASSWORD) throw new Error("[SQL] You need to provide MYSQL Password in .env file - MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD");
if (!process.env.MYSQL_DATABASE) throw new Error("[SQL] You need to provide MYSQL Database name in .env file - MYSQL_DATABASE=YOUR_MYSQL_DATABASE_NAME");

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
  throw new Error("[SQL] Impossible to connect to MySQL server. Code: " + err.code);
 } else {
  console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Connected to the MySQL server! Connection ID: ") + chalk.blue.bold.underline(sql.threadId));
 }
});

module.exports = sql;
