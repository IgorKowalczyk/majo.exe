const { EconomyManager } = require("quick.eco");

// Checking env values
if (!process.env.MYSQL_HOST) throw new Error("[SQL] You need to provide MYSQL Host in .env file - MYSQL_HOST=YOUR_MYSQL_HOST Note: You don't need to provide port to MYSQL Server, you only need to provide domain eg. localhost not localhost:3306!");
if (!process.env.MYSQL_USER) throw new Error("[SQL] You need to provide MYSQL User in .env file - MYSQL_USER=YOUR_MYSQL_USER_NAME");
if (!process.env.MYSQL_PASSWORD) throw new Error("[SQL] You need to provide MYSQL Password in .env file - MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD");
if (!process.env.MYSQL_DATABASE) throw new Error("[SQL] You need to provide MYSQL Database name in .env file - MYSQL_DATABASE=YOUR_MYSQL_DATABASE_NAME");

const eco = new EconomyManager({
 adapter: "mysql",
 adapterOptions: {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: "3306",
  table: "money",
 },
});

module.exports = eco;
