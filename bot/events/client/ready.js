const { MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");

module.exports = async (client) => {
 try {
  function capitalize(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // Todo: Allow dynamic strings
  client.status = await require("../../../config/status_config");
  await require("../../handlers/slash_command")(client);
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + ` text commands! (${client.prefix})`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot User: `) + chalk.blue.underline(`${client.user.tag}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot ID: `) + chalk.blue.underline(`${client.user.id}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Guild(s): `) + chalk.blue.underline(`${client.guilds.cache.size}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Watching: `) + chalk.blue.underline(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Prefix: `) + chalk.blue.underline(`${client.prefix}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Node.js: `) + chalk.blue.underline(`${process.version}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Plattform: `) + chalk.blue.underline(`${process.platform} ${process.arch}`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Memory: `) + chalk.blue.underline(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Report generated at: " + chalk.blue.bold.underline(moment().format("LLLL"))));
  console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag));
  require("../../../utilities/anti-crash")(client);
  if (!process.env.STATUS_WEBHOOK) throw new Error("[HOST] You need to provide Discord Status Webhook URL in .env - STATUS_WEBHOOK=YOUR_WEBHOOK_URL");
  const status_webhook = new WebhookClient({ url: process.env.STATUS_WEBHOOK });
  const status_embed = new MessageEmbed() // Prettier
   .setColor("GREEN")
   .setTimestamp()
   .setAuthor({ name: `${capitalize(client.user.username)} is online!`, iconURL: client.user.displayAvatarURL() })
   .setThumbnail(client.user.displayAvatarURL()) // Prettier
   .setDescription(`>>> Guilds: \`${client.guilds.cache.size} servers\`
   Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\`
   Logged at: <t:${moment(new Date()).unix()}>`);
  status_webhook.send({
   // Prettier
   username: capitalize(client.user.username) + " Status",
   avatarURL: client.user.displayAvatarURL(),
   embeds: [status_embed],
  });
  setInterval(() => {
   const emoji = client.status.emojis[Math.floor(Math.random() * client.status.emojis.length)];
   if (client.status.options.type == "dynamic") {
    const today = moment().format("MM-DD");
    const special_message = client.status.dates[today];
    if (special_message) {
     const motd = special_message[Math.floor(Math.random() * special_message.length)];
     if (motd.message && motd.type) {
      client.user.setActivity(motd.message, {
       type: motd.type,
      });
     }
    } else {
     const dynamic_message = client.status.dynamic[Math.floor(Math.random() * client.status.dynamic.length)];
     // Todo: Allow dynamic strings
     const message = dynamic_message.message
      .replaceAll("{{ emoji }}", emoji)
      .replaceAll(
       "{{ members }}",
       client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
      )
      .replaceAll("{{ servers }}", client.guilds.cache.size);
     client.user.setActivity(message, {
      type: dynamic_message.type,
     });
    }
   } else {
    if (client.status.static.message && client.status.static.type) {
     client.user.setActivity(client.status.static.message, {
      type: client.status.static.type,
     });
    }
   }
   if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully changed client status"));
  }, 10000);
  if (client.additional_config.pm2.enabled == true) {
   if (client.additional_config.pm2.metrics.ws_ping == true) {
    setInterval(() => {
     client.bot_ping_metrics.update(Math.round(client.ws.ping));
    }, 30000);
   }
   if (client.additional_config.pm2.metrics.users_count == true) {
    setInterval(() => {
     client.users_count.update(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0));
    }, 10000);
   }
   if (client.additional_config.pm2.metrics.guilds_count == true) {
    setInterval(() => {
     client.guilds_count.update(client.guilds.cache.size);
    }, 10000);
   }
  }
 } catch (err) {
  console.log(err);
 }
};
