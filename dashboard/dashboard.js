const Discord = require("discord.js");
const url = require("url");
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const gradient = require("gradient-string");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const config = require("../config");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require("fs");
const { readdirSync } = require("fs");
const app = express();
const https = require("https");
app.use(express.static("dashboard/static"));
const MemoryStore = require("memorystore")(session);
const sql = require("../utilities/database");
const port = process.env.PORT || 6565;
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

if (!process.env.DASHBOARD) throw new Error("[HOST] You need to provide Dashboard (Boolean) in .env - DASHBOARD=BOOLEAN");
if (!process.env.SESSION_SECRET) throw new Error("[HOST] You need to provide Session Secret in .env - SESSION_SECRET=YOUR_SESSION_SECRET_RANDOM_WORDS");
if (!process.env.SECRET) throw new Error("[HOST] You need to provide Secret in .env - SECRET=YOUR_BOT_SECRET");
if (!process.env.PORT) throw new Error("[HOST] You need to provide Port in .env - PORT=YOUR_WEBSITE_PORT");
if (!process.env.ID) throw new Error("[HOST] You need to provide Discord Bot ID in .env - ID=YOUR_DISCORD_BOT_ID");
if (!process.env.DOMAIN) throw new Error("[HOST] You need to provide Webiste domain in .env - DOMAIN=YOUR_WEBISTE_DOMAIN Note: Only website domain eg. https://example.com without slash at end!");
if (!process.env.CONTACT_WEBHOOK_ID) throw new Error("[HOST] You need to provide Discord Contact Webhook ID in .env - CONTACT_WEBHOOK_ID=YOUR_WEBHOOK_ID");
if (!process.env.CONTACT_WEBHOOK_TOKEN) throw new Error("[HOST] You need to provide Discord Contact Webhook Token in .env - CONTACT_WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN");
if (!process.env.RECAPTCHA_KEY) throw new Error("[HOST] You need to provide Google Recaptcha v2 Token in .env - RECAPTCHA_KEY=YOUR_RECAPTCHA_TOKEN");
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
 app.use(
  session({
   store: new MemoryStore({
    checkPeriod: 86400000,
   }),
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
  })
 );
 if (config.localhost == false) {
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
   verification: config.verification,
   description: config.description,
   domain: app.locals.domain,
   twitter: config.twitter,
   url: res,
   title: client.username,
   prefix: process.env.PREFIX,
   req: req,
   mobile_support: config.mobile_support_support,
   image: config.image,
   name: client.username,
   sql: sql,
   recaptcha: process.env.RECAPTCHA_KEY,
   tag: client.tag,
   server: config.support_server,
   aurhor_website: config.author_website,
   github: config.github,
   analitics: config.google_analitics,
  };
  res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
 };
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" Setting up dashboard endpoints..."));
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
 if (config.aurhor_website) {
  app.get("/author", (req, res) => {
   res.redirect(config.aurhor_website);
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
  app.get("/policy", (req, res) => {
   renderTemplate(res, req, "policy.ejs");
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

 // Simple api endpoint
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
    process.env.PREFIX +
    `",
   "channels": "` +
    client.channels.cache.size +
    `",
   "uptime": "` +
    client.uptime +
    `"\n}`
  );
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
   const contactwebhook = new Discord.WebhookClient(process.env.CONTACT_WEBHOOK_ID, process.env.CONTACT_WEBHOOK_TOKEN);
   if (!req.body.name || !req.body.id || !req.body.email || !req.body.msg) return;
   const contact = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`📬 Contact Form`)
    .setDescription(`Someone just send message to us!`)
    .addField(`👥 User`, `${req.body.name.substr(0, 100) || "Unknown"}/<@${req.body.id}> (ID: \`${req.body.id || "Unknown"}\`)`)
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

 // 500
 app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500);
  renderTemplate(res, req, "500.ejs");
 });
 console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(" All dashboard process done... Starting in web"));
 // **See /certs folder!**
 if (config.certs == true) {
  https
   .createServer(
    {
     key: fs.readFileSync(path.resolve(__dirname, "./certs/server.key")),
     cert: fs.readFileSync(path.resolve(__dirname, "./certs/server.cert")),
    },
    app
   )
   .listen(port, null, null, () => console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(` Dashboard is up and running on port ${port}.`)));
 } else {
  app.listen(port, null, null, () => console.log(chalk.bold(chalk.blue.bold("[HOST]")) + chalk.cyan.bold(` Dashboard is up and running on port ${port}.`)));
 }
};
