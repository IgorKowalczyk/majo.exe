module.exports = (client) => {
 const express = require("express");
 const config = require("../config/main_config");
 const additional_config = require("../config/additional_config");
 const web_config = require("../config/web_config");
 const ratelimit = require("./util/ratelimit");
 const domain = process.env.DOMAIN.endsWith("/") ? process.env.DOMAIN.slice(0, -1) : process.env.DOMAIN;
 const secure_connection = web_config.web.secure_connection == true ? "https://" : "http://";
 const port = process.env.PORT || 8080;
 const chalk = require("chalk");
 const cookieParser = require("cookie-parser");
 const compression = require("compression");
 const helmet = require("helmet");
 const app = express();
 app.use(compression({ threshold: 0 }));
 app.use(helmet.dnsPrefetchControl());
 app.use(helmet.expectCt());
 app.use(helmet.hidePoweredBy());
 app.use(helmet.hsts());
 app.use(helmet.ieNoOpen());
 app.use(helmet.noSniff());
 app.use(helmet.permittedCrossDomainPolicies());
 app.use(helmet.referrerPolicy());
 app.use(helmet.xssFilter());
 app.use(ratelimit);
 app.use(cookieParser());
 app.locals.domain = domain.split("//")[1];
 app.use(express.static("dashboard/static"));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 // app.use(helmet.frameguard());
 if (web_config.web.secure_connection) {
  app.enable("trust proxy");
  app.use((req, res, next) => {
   req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
 }
 app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "	accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
 });
 client.on("ready", async () => {
  app.listen(port, null, null, async () => {
   if (config.bypass_modules.api || process.argv.includes("--api")) {
    console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(" Starting api..."));
    require("../api/index")(app, client, port, config, secure_connection, domain);
   }
   if (config.bypass_modules.dashboard || process.argv.includes("--dashboard")) {
    console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASHBOARD]")) + chalk.cyan.bold(` Starting dashboard...`));
    require("../dashboard/dashboard")(app, client, port, config, secure_connection, domain);
   }
  });
 });
};
