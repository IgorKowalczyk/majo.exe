if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Majo.exe requires Node.js v16 or higher. Re-run the bot with Node.js v16 or higher!");
const { Permissions, MessageEmbed, WebhookClient, Client } = require("discord.js");
const Discord = require("discord.js");
const client = new Client({
 allowedMentions: {
  parse: ["users", "roles"],
  repliedUser: true,
 },
 // Uncomment line below (and delete line after ofc) if you enabled all indents!
 intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});
const url = require("url");
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const compression = require("compression");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const config = require("../config/main_config");
const additional_config = require("../config/additional_config");
const ejs = require("ejs");
const validator = require("validator");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const https = require("https");
const moment = require("moment");
const rate_limit = require("express-rate-limit");
const helmet = require("helmet");
const { constants } = require("crypto");
const package = require("../package.json");
const secure_connection = config.secure_connection == true ? "https://" : "http://";
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const all_events = [];

require("dotenv").config();
require("../utilities/dashboard");
client.on("ready", () => {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 require(`../bot/handlers/dashboard-handler`)(client);
 const port = process.env.PORT || 8080;
 function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
 process.env.SESSION_SECRET = "";
 for (let i = 0; i <= 15; i++) {
  process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
 }
 app.use(compression({ threshold: 0 }));
 app.use(helmet.dnsPrefetchControl());
 app.use(helmet.expectCt());
 // app.use(helmet.frameguard());
 app.use(helmet.hidePoweredBy());
 app.use(helmet.hsts());
 app.use(helmet.ieNoOpen());
 app.use(helmet.noSniff());
 app.use(helmet.permittedCrossDomainPolicies());
 app.use(helmet.referrerPolicy());
 app.use(helmet.xssFilter());
 app.use(cookieParser());
 const csrfProtection = csrf({ cookie: true });
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
 if (process.argv.includes(`--api`)) {
  (async () => {
   await require("../api/index")(app, client, port, config, secure_connection);
  })();
 }
 if (process.argv.includes(`--dashboard`)) {
  console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(" Starting dashboard..."));
  console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(" Setting up dashboard main config..."));
  // console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(` Dashboard credentials: \n* Domain: ${process.env.DOMAIN}\n* Port: ${process.env.PORT}\n* ID: ${process.env.ID}\n* G Analytics: ${process.env.ANALYTICS || "Not set"}`));
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
    secure_connection: secure_connection,
    twitter: config.twitter,
    alert: "",
    url: res,
    title: client.username,
    prefix: process.env.PREFIX,
    additional_config: additional_config,
    package: package,
    req: req,
    name: client.username,
    recaptcha: process.env.RECAPTCHA_KEY,
    tag: client.tag,
   };
   res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  (async () => {
   const endpoints = await globPromise(`${process.cwd()}/bot/events/guild/*.js`);
   endpoints.map(async (value) => {
    const name = value.split("/").pop().replace(".js", "");
    if (!additional_config.ignored_events.includes(name)) {
     all_events.push(name.split(/(?=[A-Z])/).join(" "));
    }
   });
  })();

  console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(" Setting up dashboard endpoints..."));
  const checkAuth = (req, res, next) => {
   if (req.isAuthenticated()) return next();
   req.session.backURL = req.url;
   res.redirect("/login");
  };
  const limiter = rate_limit({
   windowMs: 60 * 1000, // 1 minute
   max: 30,
   message: "my initial message",
   handler: function (req, res) {
    renderTemplate(res, req, "rate_limit.ejs", {
     perms: Permissions,
    });
   },
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
    perms: Permissions,
   });
  });

  // Server redirect endpoint.
  if (config.support_server) {
   app.get("/server", (req, res) => {
    res.redirect(config.support_server);
   });
  }

  app.get("/invite", (req, res) => {
   res.redirect(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1916267615&redirect_uri=${secure_connection + app.locals.domain}%2Fcallback&response_type=code&scope=guilds%20identify%20bot%20applications.commands`);
  });

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
    renderTemplate(res, req, "status.ejs", {
     moment: moment,
    });
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
    perms: Permissions,
   });
  });

  // Dashboard error handler
  app.get("/error", (req, res) => {
   renderTemplate(res, req, "error.ejs", {
    perms: Permissions,
   });
  });

  // Something ;)
  app.get("/admin", (req, res) => {
   res.redirect("https://youtu.be/dQw4w9WgXcQ");
  });

  // Contact endpoint
  app.get("/contact", csrfProtection, async (req, res) => {
   renderTemplate(res, req, "contact.ejs", {
    csrfToken: req.csrfToken(),
   });
  });

  app.post("/contact", csrfProtection, checkAuth, async (req, res) => {
   const data = req.body;
   if (!data) {
    res.status(400);
    return res.redirect("/error?message=no+data+send");
   }
   if (!data.id) {
    res.status(401);
    return res.redirect("/error?message=please+login");
   }
   if (!data.name || data.name.length < 1) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: data.name && data.name.lenght < 1 ? "Invaild nickname!" : "Please enter your nickname!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   if (data.name && data.name.lenght > 100) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Too long nickname!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }

   if (!data.email || data.email.length < 1) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: data.email && data.email.lenght < 1 ? "Invaild email!" : "Please enter email!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   if (data.email && !validator.isEmail(data.email)) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Please enter vaild email!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   if (data.email && data.email.lenght > 100) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Too long email!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   if (!data.message || data.message.length < 1) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Please enter your message!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   if (data.message && data.message.lenght > 1000) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Too long message!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   }
   const webhook = new WebhookClient({ url: process.env.CONTACT_WEBHOOK });
   const contact_form = new MessageEmbed() // Prettier
    .setColor("#4f545c")
    .setTitle(`📬 Contact Form`)
    .setDescription(`Someone just send message to us!`)
    .addField(`User`, `> \`${req.body.name.substr(0, 100)}\` | <@${req.body.id}> (ID: \`${req.body.id}\`)`)
    .addField("Email", `> [${req.body.email.substr(0, 100)}](https://discord.com/users/${req.body.id})`)
    .addField("Message", `> \`\`\`${req.body.message.substr(0, 2000)}\`\`\``)
    .setTimestamp()
    .setFooter({text: capitalize(client.user.username), iconURL: client.user.displayAvatarURL()});
   await webhook.send({
    // Prettier
    username: capitalize(client.user.username) + " Contact",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [contact_form],
   });
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Your message have been send! ✅",
    error: false,
    csrfToken: req.csrfToken(),
   });
  });

  // Settings endpoint.
  app.get("/dashboard/:guildID", csrfProtection, checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   renderTemplate(res, req, "server.ejs", {
    guild: guild,
    perms: Permissions,
    guild_owner: await guild.fetchOwner(),
    csrfToken: req.csrfToken(),
   });
  });

  // Settings save endpoint
  app.post("/dashboard/:guildID", csrfProtection, checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   const data = req.body;
   if (!data) {
    res.status(403);
    return res.redirect("/error?message=no+data+send");
   }
   const nickname = data.nickname;
   if (nickname && nickname.length < 1) nickname = guild.me.nickname || guild.me.user.username;
   if (data.nickname) {
    if (!nickname) nickname = guild.me.nickname || guild.me.user.username;
    await guild.me.setNickname(nickname);
   }
   await renderTemplate(res, req, "server.ejs", {
    guild: guild,
    perms: Permissions,
    alert: "Your changes have been saved! ✅",
    guild_owner: await guild.fetchOwner(),
    csrfToken: req.csrfToken(),
   });
  });

  app.get("/dashboard/:guildID/roles", checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   renderTemplate(res, req, "/server/roles.ejs", {
    guild: guild,
    perms: Permissions,
    guild_owner: await guild.fetchOwner(),
   });
  });

  app.get("/dashboard/:guildID/roles/:roleID", checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   if (!req.params.roleID) return res.redirect("/error?message=no+role");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   const role = guild.roles.cache.find((role) => role.id === req.params.roleID);
   if (!role) return res.redirect("/error?message=invaild+role");
   renderTemplate(res, req, "/server/role-info.ejs", {
    guild: guild,
    perms: Permissions,
    role,
    guild_owner: await guild.fetchOwner(),
   });
  });

  app.get("/dashboard/:guildID/embeds", csrfProtection, checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   renderTemplate(res, req, "/server/embeds.ejs", {
    guild: guild,
    perms: Permissions,
    guild_owner: await guild.fetchOwner(),
   });
  });

  app.post("/dashboard/:guildID/embeds", csrfProtection, checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("ADMINISTRATOR")) return res.redirect("/error?message=missing+perm");
   const channel = guild && guild.channels.cache.get(req.body.to);
   const data = req.body.json;
   if (!guild || !channel || !data) return res.status(400).send("Some data is missing");
   if (!channel.permissionsFor(channel.guild.client.user).has("SEND_MESSAGES")) return res.status(403).send("I'm missing 'send message' permissions");
   try {
    await channel.send(data);
   } catch (err) {
    res.status(403).send(`403`);
    return;
   }
   res.send();
  });

  app.get("/dashboard/:guildID/logging", checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   renderTemplate(res, req, "/server/logging.ejs", {
    guild: guild,
    perms: Permissions,
    all_events: all_events,
    guild_owner: await guild.fetchOwner(),
   });
  });

  app.get("/dashboard/:guildID/messages", checkAuth, async (req, res) => {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return res.redirect("/error?message=no+guild");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   if (!member) return res.redirect("/error?message=no+member");
   if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/error?message=missing+perm");
   renderTemplate(res, req, "/server/messages.ejs", {
    guild: guild,
    perms: Permissions,
    guild_owner: await guild.fetchOwner(),
   });
  });

  // 404
  app.use(function (req, res, next) {
   res.status(404);
   renderTemplate(res, req, "404.ejs");
  });

  // 500
  app.use((error, req, res, next) => {
   console.error(error);
   res.status(500);
   renderTemplate(res, req, "500.ejs", {
    error: error,
   });
  });
  console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(" All dashboard process done... Starting in web"));
 }

 // **See $config/certs folder!**
 if (config.certs == true) {
  const http_options = {
   key: fs.readFileSync(path.resolve(__dirname, "../config/certs/server.key")),
   cert: fs.readFileSync(path.resolve(__dirname, "../config/certs/server.cert")),
   secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
  };
  https.createServer(http_options, app).listen(port, null, null, () => {
   if (process.argv.includes(`--dashboard`)) console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(` Dashboard is up and running on url ${process.env.DOMAIN}${port}!`));
   if (process.argv.includes(`--api`)) console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` API is up and running on url ${process.env.DOMAIN} and port ${port}!`));
  });
 } else {
  app.listen(port, null, null, () => {
   if (process.argv.includes(`--dashboard`)) console.log(chalk.bold(chalk.bold.magenta("> ") + chalk.blue.bold("[DASH]")) + chalk.cyan.bold(` Dashboard is up and running on url ${process.env.DOMAIN}${port == 8080 ? "" : `:${port}`} !`));
   if (process.argv.includes(`--api`)) console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` API is up and running on url ${process.env.DOMAIN}${port == 8080 ? "" : `:${port}`} !`));
  });
 }
});
client.login(process.env.TOKEN);
