const chalk = require("chalk");
const { glob } = require("glob");
const { promisify } = require("util");
const { Collection } = require("discord.js");
const globPromise = promisify(glob);
const api_config = require("../config/web_config").api;
const all_endpoints = new Collection();

module.exports = async (app, client, port, config, secure_connection, domain) => {
 app.get("/api/", (req, res, next) => {
  res.json(all_endpoints);
 });
 app.get("/api/*", (req, res, next) => {
  const path = req.originalUrl.split("/");
  const original_url = `/${path[1]}/${path[2]}/${path[3]}/${path[4]}`;
  const params = path.slice(5);
  const api_name = all_endpoints.get(original_url);
  if (api_name) {
   api_name.run(client, req, res, next, params);
  } else {
   res.send({
    code: 0,
    message: "Invaild endpoint!",
   });
  }
 });
 const endpoints = await globPromise(`${process.cwd()}/api/endpoints/*/*/*.js`);
 endpoints.map(async (value) => {
  const file = require(value.replace(".js", ""));
  if (api_config.show_endpoints_list) console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` Loaded endpoint ${process.env.DOMAIN}${port == 8080 ? "" : `:${port}`}${file.name}`));
  all_endpoints.set(file.name, file);
 });
 console.log(chalk.bold.red("> ") + chalk.blue.bold("[API]") + chalk.cyan.bold(` API is running on url `) + chalk.blue.bold(`${domain}${port == 8080 ? "" : `:${port}`}/api!`));
};
