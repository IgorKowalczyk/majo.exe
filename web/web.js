require("dotenv").config()
const express = require("express");
const config = require("../config/main_config");
const additional_config = require("../config/additional_config");
const web_config = require("../config/web_config");
const package = require("../package.json");
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
app.use(cookieParser());
// app.use(helmet.frameguard());

