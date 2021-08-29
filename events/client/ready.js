const Discord = require("discord.js");
const chalk = require("chalk");

module.exports = (client) => {
 try {
  function capitalize(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const datelog = new Date();
  currentDate = datelog.getDate();
  month = datelog.getMonth() + 1;
  year = datelog.getFullYear();
  hour = datelog.getHours();
  min = datelog.getMinutes();
  sec = datelog.getSeconds();
  console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.bold.cyan(" Generated at: " + chalk.blue.bold.underline(currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec)));
  console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag) + chalk.bold.cyan(" (ID: ") + chalk.bold.blue.underline(client.user.id) + chalk.bold.cyan(")!"));
  /* Status Webhook */
  if (!process.env.STATUS_WEBHOOK_ID) throw new Error("[HOST] You need to provide Discord Status Webhook ID in .env - STATUS_WEBHOOK_ID=YOUR_WEBHOOK_ID");
  if (!process.env.STATUS_WEBHOOK_TOKEN) throw new Error("[HOST] You need to provide Discord Status Webhook Token in .env - STATUS_WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN");
  const webhookid = process.env.STATUS_WEBHOOK_ID;
  const webhooktoken = process.env.STATUS_WEBHOOK_TOKEN;
  const statuswebhook = new Discord.WebhookClient({ webhookid, webhooktoken });
  const status = new Discord.MessageEmbed() // Prettier
   .setColor("#18A64E")
   .setTimestamp()
   .setAuthor(`${capitalize(client.user.username)} is online!`)
   .setThumbnail(client.user.displayAvatarURL()) // Prettier
   .setDescription(`• Guilds: \`${client.guilds.cache.size}\`
   • Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`
   • Logged at: \`${datelog}\``);
  statuswebhook.send({
   // Prettier
   username: capitalize(client.user.username) + " Status",
   avatarURL: client.user.displayAvatarURL(),
   embeds: [status],
  });
 } catch (err) {
  console.log(err);
 }
};
