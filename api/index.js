if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Majo.exe requires Node.js v16 or higher. Re-run the bot with Node.js v16 or higher!");
const chalk = require("chalk");
const { readdirSync } = require("fs");
require("dotenv").config();

module.exports = (app, client, port, config, secure_connection) => {
 console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(" Starting api..."));
 console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(" Setting up api endpoints..."));
 readdirSync(`${process.cwd()}/api/endpoints`).forEach((dir) => {
  const endpoints = readdirSync(`${process.cwd()}/api/endpoints/${dir}/`).filter((file) => file.endsWith(".js"));
  const endpoint = endpoints.map((eachendp) => {
   require(`${process.cwd()}/api/endpoints/${dir}/${eachendp}`)(app, client);
   console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` Loaded endpoint ${process.env.DOMAIN}:${port}/api/${dir}/${eachendp.replace(".js", "")}`));
  });
 });
 app.get("/api/*", (req, res, next) => {
  res.send({
   code: 0,
   message: "Invaild endpoint!",
  });
 });
};
