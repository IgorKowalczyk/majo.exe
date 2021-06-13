const { EconomyManager } = require("quick.eco");

const eco = new EconomyManager({
 adapter: "mysql",
 adapterOptions: {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: "3306",
  table: "money"
 },
});

module.exports = eco;
