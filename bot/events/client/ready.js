const { MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");

module.exports = async (client) => {
 try {
  if (client.config.member_limit.respect) {
   client.guilds.cache.forEach(async (guild) => {
    if (guild.memberCount <= client.config.member_limit.min_members && !client.config.member_limit.ignore.id.includes(guild.id)) {
     console.log(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`) + chalk.cyan.bold(` Leaving guild (below minimal members) `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(")"));
     guild.leave();
     client.database.query(`DELETE FROM guild_stats WHERE guild_id = '${guild.id}'`);
    }
   });
  }
  client.status = await require("../../../config/presence_config"); // Todo: Allow dynamic strings
  await require("../../handlers/slash_command")(client);
  if (process.env.STATUS_WEBHOOK) {
   const status_webhook = new WebhookClient({ url: process.env.STATUS_WEBHOOK });
   const status_embed = new MessageEmbed() // Prettier
    .setColor("GREEN")
    .setTimestamp()
    .setAuthor({ name: `${client.user.username.capitalize()} is online!`, iconURL: client.user.displayAvatarURL() })
    .setThumbnail(client.user.displayAvatarURL()) // Prettier
    .setDescription(`>>> Guilds: \`${client.guilds.cache.size} servers\`
   Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\`
   Logged at: <t:${moment(new Date()).unix()}>`);
   status_webhook.send({
    // Prettier
    username: `${client.user.username.capitalize()} Status`,
    avatarURL: client.user.displayAvatarURL(),
    embeds: [status_embed],
   });
  }
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
   if (client.config.advanved_logging) console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully changed client status"));
  }, 10000);
 } catch (err) {
  console.log(err);
 }
};
