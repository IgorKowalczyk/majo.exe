if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Majo.exe requires Node.js v16 or higher. Re-run the bot with Node.js v16 or higher!");
const Discord = require("discord.js");
const url = require("url");
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const config = require("../config/main_config");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const https = require("https");
const rate_limit = require("express-rate-limit");
const helmet = require("helmet");
const { constants } = require("crypto");
const port = process.env.PORT || 6565;
require("dotenv").config();
require("../utilities/dashboard");
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}
process.env.SESSION_SECRET = "";
for (let i = 0; i <= 15; i++) {
 process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
}

console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" Starting dashboard..."));

module.exports = async (client) => {
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" Setting up dashboard main config..."));
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(` Dashboard credentials: \n* Domain: ${process.env.DOMAIN}\n* Port: ${process.env.PORT}\n* ID: ${process.env.ID}\n* G Analytics: ${process.env.ANALYTICS || "Not set"}`));
 const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
 const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
 passport.serializeUser((user, done) => done(null, user));
 passport.deserializeUser((obj, done) => done(null, obj));
 passport.use(
  new Strategy(
   {
    clientID: process.env.ID,
    client_secret: process.env.SECRET,
    clientSecret: process.env.SECRET,
    // Choose one ^ XD
    callbackURL: `${process.env.DOMAIN}${process.env.PORT != 80 ? "" : `:${process.env.PORT}`}/callback`,
    response_type: `token`,
    scope: ["identify", "guilds"],
   },
   (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
   }
  )
 );
 app.use(express.static("dashboard/static"));
 app.use(helmet.dnsPrefetchControl());
 app.use(helmet.expectCt());
 app.use(helmet.frameguard());
 app.use(helmet.hidePoweredBy());
 app.use(helmet.hsts());
 app.use(helmet.ieNoOpen());
 app.use(helmet.noSniff());
 app.use(helmet.permittedCrossDomainPolicies());
 app.use(helmet.referrerPolicy());
 app.use(helmet.xssFilter());
 app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "	accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
 });
 const expire_date = 1000 * 60 * 60 * 24; // 1 day
 const sessionStore = new MemoryStore({
  checkPeriod: expire_date,
 });
 app.use(
  session({
   cookie: {
    expires: expire_date,
    secure: true,
    maxAge: expire_date,
   },
   secret: process.env.SESSION_SECRET,
   store: sessionStore,
   resave: false,
   saveUninitialized: false,
  })
 );
 if (config.secure_connection == true) {
  app.enable("trust proxy");
  app.use((req, res, next) => {
   req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
 }
 app.use(passport.initialize());
 app.use(passport.session());
 app.locals.domain = process.env.DOMAIN.split("//")[1];
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
   description: config.description,
   domain: app.locals.domain,
   secure_connection: config.secure_connection == true ? "https://" : "http://",
   twitter: config.twitter,
   url: res,
   title: client.username,
   prefix: process.env.PREFIX,
   req: req,
   name: client.username,
   recaptcha: process.env.RECAPTCHA_KEY,
   tag: client.tag,
  };
  res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
 };
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" Setting up dashboard endpoints..."));
 const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
 };

 const limiter = rate_limit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
 });
 app.use(limiter);

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
 app.get("/profile", checkAuth, async (req, res) => {
  renderTemplate(res, req, "profile.ejs", {
   perms: Discord.Permissions,
  });
 });

 // Server redirect endpoint.
 if (config.support_server) {
  app.get("/server", (req, res) => {
   res.redirect(config.support_server);
  });
 }

 // Github redirect endpoint.
 if (config.github && config.github_repo) {
  app.get("/github", (req, res) => {
   res.redirect(`https://github.com/` + config.github + "/" + config.github_repo);
  });
 }

 // Author page redirect endpoint.
 if (config.author_website) {
  app.get("/author", (req, res) => {
   res.redirect(config.author_website);
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

 // Policy privacy page endpoint.
 if (config.privacy_policy_page == true) {
  app.get("/privacy-policy", (req, res) => {
   renderTemplate(res, req, "./legal/policy.ejs");
  });
 }

 // Policy privacy page endpoint.
 if (config.terms_of_service_page == true) {
  app.get("/tos", (req, res) => {
   renderTemplate(res, req, "./legal/tos.ejs");
  });
 }

 // Commands list endoint.
 app.get("/commands", (req, res) => {
  renderTemplate(res, req, "commands.ejs");
 });

 // Logout endpoint.
 app.get("/logout", function (req, res) {
  // We destroy the session || logout user.
  req.session.destroy(() => {
   req.logout();
   res.redirect("/");
  });
 });

 // API endpoint
 app.get("/api", function (req, res) {
  res.header("Content-Type", "application/json");
  const json = {
   guilds: client.guilds.cache.size,
   id: client.id,
   members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
   prefix: process.env.PREFIX,
   channels: client.channels.cache.size,
   uptime: client.uptime,
  };
  res.send(json);
 });

 // Index endpoint.
 app.get("/", (req, res) => {
  renderTemplate(res, req, "index.ejs");
 });

 // Arc.io file
 app.get("/arc-sw.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/js/arc.js"));
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

 // Something ;)
 app.get("/admin", (req, res) => {
  res.redirect("https://youtu.be/dQw4w9WgXcQ");
 });

 // Contact endpoint
 app.get("/contact", async (req, res) => {
  renderTemplate(res, req, "contact.ejs");
 });
 app.post("/contact", async (req, res) => {
  if (req.body.type === "contact") {
   const contactwebhook = new Discord.WebhookClient({ url: process.env.CONTACT_WEBHOOK });
   if (!req.body.name || !req.body.id || !req.body.email || !req.body.msg) return;
   const contact = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`📬 Contact Form`)
    .setDescription(`Someone just send message to us!`)
    .addField(`👥 User`, `\`${req.body.name.substr(0, 100) || "Unknown"}\` | <@${req.body.id}> (ID: \`${req.body.id || "Unknown"}\`)`)
    .addField("📧 Email", `\`\`\`${req.body.email.substr(0, 100) || "Unknown"}\`\`\``)
    .addField("📝 Message", `\`\`\`${req.body.msg.substr(0, 2000) || "None"}\`\`\``)
    .setTimestamp()
    .setFooter(capitalize(client.user.username), client.user.displayAvatarURL());
   contactwebhook.send({
    // Prettier
    username: capitalize(client.user.username) + " Contact",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [contact],
   });
  }
 });

 // Settings endpoint.
 app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
  const guild = client.guilds.cache.get(req.params.guildID);
  if (!guild) return res.redirect("/error");
  const member = guild.members.cache.get(req.user.id);
  if (!member) return res.redirect("/error");
  if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error");
  renderTemplate(res, req, "server.ejs", {
   guild: guild,
   perms: Discord.Permissions,
  });
 });

 // 404
 app.use(function (req, res, next) {
  res.status(404);
  renderTemplate(res, req, "404.ejs");
 });

 // 500
 app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500);
  renderTemplate(res, req, "500.ejs");
 });
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" All dashboard process done... Starting in web"));
 // **See $config/certs folder!**
 if (config.certs == true) {
  const http_options = {
   key: fs.readFileSync(path.resolve(__dirname, "../config/certs/server.key")),
   cert: fs.readFileSync(path.resolve(__dirname, "../config/certs/server.cert")),
   secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
  };
  https.createServer(http_options, app).listen(port, null, null, () => {
   console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(` Dashboard is up and running on port ${port}.`));
  });
 } else {
  app.listen(port, null, null, () => {
   console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(` Dashboard is up and running on port ${port}.`));
  });
 }
};
