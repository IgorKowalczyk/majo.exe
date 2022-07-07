module.exports = (app, client, port, config, secure_connection, domain, express) => {
 const { Permissions, MessageEmbed, WebhookClient, Util } = require("discord.js");
 const url = require("url");
 const path = require("path");
 const chalk = require("chalk");
 const csrf = require("csurf");
 const fetch = require("node-fetch");
 const additional_config = require("../config/additional_config");
 const web_config = require("../config/web_config");
 const ejs = require("ejs");
 const validator = require("validator");
 const moment = require("moment");
 const rate_limit = require("express-rate-limit");
 const package = require("../package.json");
 const fetch_stats = require("../utilities/mysql/util/server_stats/fetch");
 const fetch_message_channels = require("../utilities/mysql/util/member_messages/get_messages_channels");
 const { glob } = require("glob");
 const { promisify } = require("util");
 const { verify } = require("hcaptcha");
 const globPromise = promisify(glob);
 const csrfProtection = csrf({ cookie: true });
 const render_port = port == 8080 ? "" : `:${port}`;
 const session = require("express-session");
 const MemoryStore = require("memorystore")(session);
 const passport = require("passport");
 const Strategy = require("passport-discord").Strategy;
 app.use(express.static("dashboard/static"));
 const expire_date = 1000 * 60 * 60 * 24; // 1 day
 const sessionStore = new MemoryStore({
  checkPeriod: expire_date,
 });
 app.use(
  session({
   cookie: {
    expires: expire_date,
    secure: web_config.web.secure_connection,
    maxAge: expire_date,
   },
   secret: process.env.SESSION_SECRET,
   store: sessionStore,
   resave: false,
   saveUninitialized: true,
  })
 );
 passport.serializeUser((user, done) => done(null, user));
 passport.deserializeUser((obj, done) => done(null, obj));
 passport.use(
  new Strategy(
   {
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: `${domain}${port == 8080 ? "" : `:${port}`}/callback`,
    response_type: `code`,
    scope: ["identify", "guilds"],
   },
   (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
   }
  )
 );
 app.use(passport.initialize());
 app.use(passport.session());
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
 app.get(
  "/callback",
  passport.authenticate("discord", {
   failureRedirect: "/error",
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

 const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
 };

 const data_dir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
 const template_dir = path.resolve(`${data_dir}${path.sep}templates`);
 app.engine("html", ejs.renderFile);
 app.set("view engine", "html");
 const renderTemplate = (res, req, template, data = {}) => {
  let hostname = req.headers.host;
  let pathname = url.parse(req.url).pathname;
  const baseData = {
   bot: client,
   config: config,
   web_config: web_config,
   hostname: hostname,
   pathname: pathname,
   path: req.path,
   user: req.isAuthenticated() ? req.user : null,
   description: `${config.description} ${client.user.username} serve over ${client.all_commands} commands!`,
   domain: app.locals.domain,
   secure_connection: secure_connection,
   twitter: config.twitter,
   alert: "",
   url: res,
   title: client.username,
   additional_config: additional_config,
   package: package,
   req: req,
   port: render_port,
   name: client.username,
   recaptcha: process.env.RECAPTCHA_SITE_KEY,
   tag: client.tag,
  };
  return res.render(path.resolve(`${template_dir}${path.sep}${template}`), Object.assign(baseData, data));
 };
 const all_events = [];
 (async () => {
  const endpoints = await globPromise(`${process.cwd()}/bot/events/guild/*.js`);
  endpoints.map(async (value) => {
   const name = value.split("/").pop().replace(".js", "");
   if (!additional_config.ignored_events.includes(name)) {
    all_events.push(name.split(/(?=[A-Z])/).join(" "));
   }
  });
 })();

 const limiter = rate_limit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  handler: function (req, res) {
   renderTemplate(res, req, "rate_limit.ejs", {
    perms: Permissions,
   });
  },
 });
 app.use(limiter);

 function errorPage(req, res, alert) {
  if (alert) {
   renderTemplate(res, req, "error.ejs", {
    perms: Permissions,
    alert: alert,
   });
  } else {
   renderTemplate(res, req, "error.ejs", {
    perms: Permissions,
   });
  }
 }
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
  const user = req.user.id;
  const fetched_user = await client.users.fetch(user);
  await renderTemplate(res, req, "profile.ejs", {
   perms: Permissions,
   moment: moment,
   fetched: fetched_user,
  });
 });

 // Server redirect endpoint.
 if (config.support_server) {
  app.get("/server", (req, res) => {
   res.redirect(config.support_server);
  });
 }

 app.get("/invite", (req, res) => {
  res.redirect(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${config.permissions}&redirect_uri=${secure_connection}${app.locals.domain}%2Fcallback&response_type=code&scope=guilds%20identify%20bot%20applications.commands`);
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
 if (web_config.dashboard.privacy_policy_page) {
  app.get("/privacy-policy", (req, res) => {
   renderTemplate(res, req, "./legal/policy.ejs");
  });
 }

 // Policy privacy page endpoint.
 if (web_config.dashboard.terms_of_service_page) {
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
  res.set({ "content-type": "application/javascript; charset=utf-8", "cache-control": "no-transform" });
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
  return errorPage(req, res);
 });

 // Contact endpoint
 app.get("/contact", csrfProtection, async (req, res) => {
  renderTemplate(res, req, "contact.ejs", {
   csrfToken: req.csrfToken(),
  });
 });

 app.post("/contact", csrfProtection, checkAuth, async (req, res) => {
  const data = req.body;
  const reasons = ["feature_request", "bug_report", "general_question", "developer_question", "partnership", "other"];
  if (!data) {
   res.status(400);
   return errorPage(req, res, "No data was sent!");
  }
  if (!data.id) {
   res.status(401);
   return errorPage(req, res, "You must be logged in to perform this action!");
  }
  if (!data.name) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: data.name && data.name.length < 1 ? "Invaild nickname!" : "Please enter your nickname!",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (data.name && data.name.length > 100) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Too long username! (Max: 100)",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (!data.name.includes("#")) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Not vaild username!",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (!data.email || data.email.length < 1) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: data.email && data.email.length < 1 ? "Invaild email!" : "Please enter email!",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (!validator.isEmail(data.email)) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Please enter vaild email!",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (data.email.length > 100) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Too long email (Max: 100)!",
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
  if (data.message && data.message.length > 1000) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: "Too long message! (Max: 1000)",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  if (!data.reason || !reasons.includes(data.reason)) {
   return renderTemplate(res, req, "contact.ejs", {
    alert: !data.reason ? "Invaild reason selected!" : "Please select vaild reason!",
    error: true,
    csrfToken: req.csrfToken(),
   });
  }
  verify(process.env.RECAPTCHA_SECRET_KEY, data["h-captcha-response"]).then((recaptcha_data) => {
   if (recaptcha_data.success !== true) {
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Please verify that you are not a robot!",
     error: true,
     csrfToken: req.csrfToken(),
    });
   } else {
    const webhook = new WebhookClient({ url: process.env.CONTACT_WEBHOOK });
    const contact_form = new MessageEmbed() // Prettier
     .setColor("#4f545c")
     .setTitle(`📬 Contact Form`)
     .setDescription(`**Someone just send message to us!**`)
     .addField(`User`, `>>> Tag: \`${data.name.substr(0, 100)}\`\n Mention: <@${data.id}>\nID: \`${data.id}\`)`)
     .addField("Email", `> ||[${data.email.substr(0, 100)}](https://discord.com/users/${data.id})||`)
     .addField("Message", `> \`\`\`${Util.escapeCodeBlock(data.message.substr(0, 1000))}\`\`\` `)
     .addField("Reason", `> \`${data.reason.replaceAll("_", " ").capitalize()}\``)
     .setTimestamp()
     .setFooter({ text: client.user.username.capitalize(), iconURL: client.user.displayAvatarURL() });
    webhook.send({
     // Prettier
     username: `${client.user.username.capitalize()} Contact`,
     avatarURL: client.user.displayAvatarURL(),
     embeds: [contact_form],
    });
    return renderTemplate(res, req, "contact.ejs", {
     alert: "Your message have been send! ✅",
     error: false,
     csrfToken: req.csrfToken(),
    });
   }
  });
 });

 // Settings endpoint.
 app.get("/dashboard/:guildID", csrfProtection, checkAuth, async (req, res) => {
  try {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   const owner = await guild.fetchOwner();
   if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
   if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
   await fetch_stats(client, guild, function (stats) {
    if (!stats) {
     res.status(403);
     return errorPage(req, res, "No server statistics, please refresh the page...");
    }
    const joins_array = JSON.parse(stats.joins);
    const leaves_array = JSON.parse(stats.leaves);
    let total_joins = 0;
    let total_leaves = 0;
    let joins = new Array();
    let leaves = new Array();
    for (let el of Object.entries(joins_array)) {
     if (el[0].replaceAll("/", "-") == `${moment().year()}-${moment().format("MM")}-${moment().date() + 1}`) break;
     joins.push([el[0].replaceAll("/", "-"), el[1]]);
     total_joins += parseInt(el[1]);
    }
    for (let el of Object.entries(leaves_array)) {
     if (el[0].replaceAll("/", "-") == `${moment().year()}-${moment().format("MM")}-${moment().date() + 1}`) break;
     leaves.push([el[0].replaceAll("/", "-"), el[1]]);
     total_leaves += parseInt(el[1]);
    }
    renderTemplate(res, req, "/server/server.ejs", {
     guild: guild,
     perms: Permissions,
     joins: joins,
     total_joins: parseInt(total_joins),
     total_leaves: parseInt(total_leaves),
     leaves: leaves,
     guild_owner: owner,
     csrfToken: req.csrfToken(),
    });
   });
  } catch (e) {
   return errorPage(req, res, e);
  }
 });

 // Settings save endpoint
 app.post("/dashboard/:guildID", csrfProtection, checkAuth, async (req, res) => {
  try {
   const guild = await client.guilds.cache.get(req.params.guildID);
   if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
   const first_member = req.user.id;
   await guild.members.fetch({ first_member });
   const member = guild.members.cache.get(req.user.id);
   const owner = await guild.fetchOwner();
   if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
   if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
   const data = req.body;
   if (!data) {
    res.status(403);
    return errorPage(req, res, "No data send!");
   }
   const nickname = data.nickname;
   if (nickname && nickname.length < 1) nickname = guild.me.nickname || guild.me.user.username;
   if (data.nickname) {
    if (!nickname) nickname = guild.me.nickname || guild.me.user.username;
    await guild.me.setNickname(nickname);
   }
   await fetch_stats(client, guild, function (stats) {
    if (!stats) {
     res.status(403);
     return errorPage(req, res, "No server statistics, please refresh the page...");
    }
    const joins_array = JSON.parse(stats.joins);
    const leaves_array = JSON.parse(stats.leaves);
    let total_joins = 0;
    let total_leaves = 0;
    let joins = new Array();
    let leaves = new Array();
    for (let el of Object.entries(joins_array)) {
     if (el[0].replaceAll("/", "-") == `${moment().year()}-${moment().format("MM")}-${moment().date() + 1}`) break;
     joins.push([el[0].replaceAll("/", "-"), el[1]]);
     total_joins += parseInt(el[1]);
    }
    for (let el of Object.entries(leaves_array)) {
     if (el[0].replaceAll("/", "-") == `${moment().year()}-${moment().format("MM")}-${moment().date() + 1}`) break;
     leaves.push([el[0].replaceAll("/", "-"), el[1]]);
     total_leaves += parseInt(el[1]);
    }
    renderTemplate(res, req, "/server/server.ejs", {
     guild: guild,
     perms: Permissions,
     joins: joins,
     total_joins: parseInt(total_joins),
     total_leaves: parseInt(total_leaves),
     alert: "Your changes have been saved! ✅",
     leaves: leaves,
     guild_owner: owner,
     csrfToken: req.csrfToken(),
    });
   });
  } catch (e) {
   return errorPage(req, res, e);
  }
 });

 app.get("/dashboard/:guildID/roles", checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  renderTemplate(res, req, "/server/roles.ejs", {
   guild: guild,
   perms: Permissions,
   guild_owner: await guild.fetchOwner(),
  });
 });

 app.get("/dashboard/:guildID/roles/:roleID", checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  if (!req.params.roleID) return errorPage(req, res, "There is no such role! You cannot display information about it");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  const role = guild.roles.cache.find((role) => role.id === req.params.roleID);
  if (!role) return errorPage(req, res, "There is no such role! You cannot display information about it");
  renderTemplate(res, req, "/server/role-info.ejs", {
   guild: guild,
   perms: Permissions,
   role,
   guild_owner: await guild.fetchOwner(),
  });
 });

 app.get("/dashboard/:guildID/embeds", csrfProtection, checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  renderTemplate(res, req, "/server/embeds.ejs", {
   guild: guild,
   perms: Permissions,
   guild_owner: await guild.fetchOwner(),
  });
 });

 app.post("/dashboard/:guildID/embeds", csrfProtection, checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("ADMINISTRATOR")) return errorPage(req, res, "You do not have the ADMINISTRATOR permission!");
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

 app.get("/dashboard/:guildID/logging", csrfProtection, checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  renderTemplate(res, req, "/server/logging.ejs", {
   guild: guild,
   perms: Permissions,
   all_events: all_events,
   guild_owner: await guild.fetchOwner(),
  });
 });

 app.get("/dashboard/:guildID/messages", csrfProtection, checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const owner = await guild.fetchOwner();
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  await await fetch_message_channels(client, guild, function (channels) {
   if (channels) {
    welcome = channels.welcome_channel;
    leave = channels.leave_channel;
   } else {
    welcome = null;
    leave = null;
   }
   renderTemplate(res, req, "/server/messages.ejs", {
    guild: guild,
    perms: Permissions,
    welcome: welcome,
    leave: leave,
    csrfToken: req.csrfToken(),
    guild_owner: owner,
   });
  });
 });

 app.post("/dashboard/:guildID/messages", csrfProtection, checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.guildID);
  if (!guild) return errorPage(req, res, "No such server, add a bot to perform this action!");
  const first_member = req.user.id;
  await guild.members.fetch({ first_member });
  const member = guild.members.cache.get(req.user.id);
  if (!member) return errorPage(req, res, "You must be on this server to perform this action!");
  if (!member.permissions.has("MANAGE_GUILD")) return errorPage(req, res, "You do not have the MANAGE_GUILD permissions!");
  const data = req.body;
  if (data) {
   client.database.query(`SELECT \`leave\`.\`guildid\` AS \`guild_id\`, \`leave\`.\`channelid\` AS \`leave\`, \`welcome\`.\`channelid\` AS \`welcome\` FROM \`leave\` INNER JOIN \`welcome\` ON \`leave\`.\`guildid\` = \`welcome\`.\`guildid\` WHERE \`leave\`.\`guildid\` = ${guild.id}`, async function (error, results, fields) {
    if (results[0]) {
     welcome = guild.channels.cache.get(data.welcomechannel);
     leave = guild.channels.cache.get(data.leavechannel);
     data.welcome_enabled ? (welcome_enabled = true) : (welcome_enabled = false);
     data.leave_enabled ? (leave_enabled = true) : (leave_enabled = false);
     if (welcome_enabled && welcome) {
      await client.database.query(`UPDATE \`welcome\` SET channelid = ${welcome.id} WHERE guildid = ${guild.id};`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     } else if (welcome_enabled == false) {
      await client.database.query(`DELETE FROM \`welcome\` WHERE guildid = ${guild.id};`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     }
     if (leave_enabled && leave) {
      client.database.query(`UPDATE \`leave\` SET channelid = ${leave.id} WHERE guildid = ${guild.id};`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     } else if (leave_enabled == false) {
      await client.database.query(`DELETE FROM \`leave\` WHERE guildid = ${guild.id};`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     }
     client.database.query(`SELECT \`leave\`.\`guildid\` AS \`guild_id\`, \`leave\`.\`channelid\` AS \`leave\`, \`welcome\`.\`channelid\` AS \`welcome\` FROM \`leave\` INNER JOIN \`welcome\` ON \`leave\`.\`guildid\` = \`welcome\`.\`guildid\` WHERE \`leave\`.\`guildid\` =  "${guild.id}";`, async function (update_error, update_results, update_fields) {
      if (update_error) console.log(update_error);
      console.log(update_results);
      renderTemplate(res, req, "/server/messages.ejs", {
       guild: guild,
       perms: Permissions,
       welcome: welcome,
       leave: leave,
       alert: "Successfully updated channels! ✅",
       csrfToken: req.csrfToken(),
       guild_owner: await guild.fetchOwner(),
      });
     });
    } else {
     welcome = guild.channels.cache.get(data.welcomechannel);
     leave = guild.channels.cache.get(data.leavechannel);
     data.welcome_enabled ? (welcome_enabled = true) : (welcome_enabled = false);
     data.leave_enabled ? (leave_enabled = true) : (leave_enabled = false);
     if (welcome_enabled && welcome) {
      await client.database.query(`INSERT INTO \`welcome\`(\`guildid\`, \`channelid\`) VALUES (${guild.id}, ${welcome.id});`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     }
     if (leave_enabled && leave) {
      client.database.query(`INSERT INTO \`leave\`(\`guildid\`, \`channelid\`) VALUES (${guild.id}, ${leave.id});`, async function (update_error) {
       if (update_error) console.log(update_error);
      });
     }
     client.database.query(`SELECT \`leave\`.\`guildid\` AS \`guild_id\`, \`leave\`.\`channelid\` AS \`leave\`, \`welcome\`.\`channelid\` AS \`welcome\` FROM \`leave\` INNER JOIN \`welcome\` ON \`leave\`.\`guildid\` = \`welcome\`.\`guildid\` WHERE \`leave\`.\`guildid\` =  "${guild.id}";`, async function (update_error, update_results, update_fields) {
      if (update_error) console.log(update_error);
      renderTemplate(res, req, "/server/messages.ejs", {
       guild: guild,
       perms: Permissions,
       welcome: welcome,
       leave: leave,
       alert: "Successfully updated channels! ✅",
       csrfToken: req.csrfToken(),
       guild_owner: await guild.fetchOwner(),
      });
     });
    }
   });
  }
 });

 // 404
 app.use(function (req, res, next) {
  res.status(404);
  res.set("Cache-control", "no-cache, must-revalidate, max-age=0");
  renderTemplate(res, req, "404.ejs");
 });

 // 500
 app.use((error, req, res, next) => {
  console.error(error);
  res.status(500);
  renderTemplate(res, req, "500.ejs", {
   error: error.message,
  });
 });

 console.log(chalk.bold.magenta("> ") + chalk.blue.bold("[DASHBOARD]") + chalk.cyan.bold(` Dashboard is running on url `) + chalk.blue.bold(`${domain}${port == 8080 ? "" : `:${port}`}!`));
};
