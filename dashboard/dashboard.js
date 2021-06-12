const Discord = require("discord.js");
const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const config = require("../config");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const app = express();
app.use(express.static("dashboard/static"));
const MemoryStore = require("memorystore")(session);
const sql = require("../utilities/database");
const port = process.env.PORT || 6565;

console.log("Starting dashboard...");

module.exports = async (client) => {
 console.log("Setting up dashboard main config...");
 const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
 const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
 passport.serializeUser((user, done) => done(null, user));
 passport.deserializeUser((obj, done) => done(null, obj));
 passport.use(
  new Strategy(
   {
    clientID: config.id,
    clientSecret: config.clientSecret,
    callbackURL: `${config.domain}${config.port != 80 ? "" : `:${config.port}`}/callback`,
    response_type: `token`,
    scope: ["identify", "guilds"],
   },
   (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
   }
  )
 );
 app.use(
  session({
   store: new MemoryStore({
    checkPeriod: 86400000,
   }),
   secret: config.sessionSecret,
   resave: false,
   saveUninitialized: false,
  })
 );

 app.use(passport.initialize());
 app.use(passport.session());
 app.locals.domain = config.domain.split("//")[1];
 app.engine("html", ejs.renderFile);
 app.set("view engine", "html");
 app.use(bodyParser.json());
 app.use(
  bodyParser.urlencoded({
   extended: true,
  })
 );

 const renderTemplate = (res, req, template, data = {}) => {
  var hostname = req.headers.host;
  var pathname = url.parse(req.url).pathname;
  const baseData = {
   bot: client,
   config: config,
   hostname: hostname,
   pathname: pathname,
   path: req.path,
   user: req.isAuthenticated() ? req.user : null,
   verification: config.verification,
   description: config.description,
   domain: app.locals.domain,
   twitter: config.twitter,
   url: res,
   title: client.username,
   prefix: config.prefix,
   req: req,
   mobile: config.mobile_support,
   image: config.image,
   name: client.username,
   sql: sql,
   tag: client.tag,
   server: config.server,
   authorwebsite: config.author_website,
   github: config.github,
   analitics: config.google_analitics,
  };
  res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
 };
 console.log("Setting up dashboard endpoints...");
 const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
 };

 // Login endpoint.
 app.get(
  "/login",
  (req, res, next) => {
   if (req.session.backURL) {
    req.session.backURL = req.session.backURL;
   } else if (req.headers.referer) {
    const parsed = url.parse(req.headers.referer);
    if (parsed.hostname === app.locals.domain) {
     req.session.backURL = parsed.path;
    }
   } else {
    req.session.backURL = "/";
   }
   next();
  },
  passport.authenticate("discord")
 );

 // Callback endpoint.
 app.get(
  "/callback",
  passport.authenticate("discord", {
   failureRedirect: "/",
  }),
  (req, res) => {
   if (req.session.backURL) {
    const url = req.session.backURL;
    req.session.backURL = null;
    res.redirect(url);
   } else {
    res.redirect("/");
   }
  }
 );

 // Features list redirect endpoint.
 app.get("/features", (req, res) => {
  renderTemplate(res, req, "features.ejs", {
   readdirSync: readdirSync,
   perms: Discord.Permissions,
  });
 });

 // Server redirect endpoint.
 if (config.server) {
  app.get("/server", (req, res) => {
   res.redirect(config.server);
  });
 }

 // Github redirect endpoint.
 if (config.github && config.repo) {
  app.get("/github", (req, res) => {
   res.redirect(`https://github.com/` + config.github + "/" + config.repo);
  });
 }

 // Author page redirect endpoint.
 if (config.authorwebsite) {
  app.get("/author", (req, res) => {
   res.redirect(config.authorwebsite);
  });
 }

 // External status page redirect endpoint.
 if (config.status) {
  app.get("/host-status", (req, res) => {
   res.redirect(config.status);
  });
 }

 // Status page endpoint.
 if (config.status) {
  app.get("/status", (req, res) => {
   renderTemplate(res, req, "status.ejs");
  });
 }

 // Logout endpoint.
 app.get("/logout", function (req, res) {
  // We destroy the session || logout user.
  req.session.destroy(() => {
   req.logout();
   res.redirect("/");
  });
 });

 app.get("/api", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(
   `{
   "guilds": "` +
    client.guilds.cache.size +
    `",
   "members": "` +
    client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) +
    `",
   "prefix": "` +
    config.prefix +
    `",
   "channels": "` +
    client.channels.cache.size +
    `"
  }`
  );
 });

 // Index endpoint.
 app.get("/", (req, res) => {
  renderTemplate(res, req, "index.ejs");
 });

 // Dashboard endpoint.
 app.get("/dashboard", checkAuth, (req, res) => {
  renderTemplate(res, req, "dashboard.ejs", {
   perms: Discord.Permissions,
  });
 });

 // Dashboard error handler
 app.get("/error", (req, res) => {
  renderTemplate(res, req, "error.ejs", {
   perms: Discord.Permissions,
  });
 });

 app.get("/admin", (req, res) => {
  res.redirect("https://youtu.be/dQw4w9WgXcQ");
 });

 // Settings endpoint.
 app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
  // Vlidate the request, check if guild exists, member is in guild and if member has minimum permissions
  const guild = client.guilds.cache.get(req.params.guildID);
  if (!guild) return res.redirect("/error");
  const member = guild.members.cache.get(req.user.id);
  if (!member) return res.redirect("/error");
  if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error");
  renderTemplate(res, req, "server.ejs", {
   guild: guild,
  });
 });

 // 404
 app.use(function (req, res, next) {
  res.status(404);
  renderTemplate(res, req, "404.ejs");
 });

 console.log("All dashboard process done... Starting in web");
 app.listen(port, null, null, () => console.log(`Dashboard is up and running on port ${port}.`));
};
