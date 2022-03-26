const { MessageEmbed, WebhookClient } = require("discord.js");
if (!process.env.ERRORS_WEBHOOK) throw new Error("You need to enter ERRORS_WEBHOOK url in .env!");
const errors_webhook = new WebhookClient({ url: process.env.ERRORS_WEBHOOK });

module.exports = (client) => {
 process.on("unhandledRejection", (reason, p) => {
  if (!reason) return;
  console.error(reason);
  return errors_webhook.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Unhandled Rejection/Catch**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Unhandled Rejection/Catch`)
     .setDescription(`\`\`\`js\n${reason}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
 process.on("uncaughtException", (err, origin) => {
  if (!err || !origin) return;
  console.error(err);
  return errors_webhook.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Uncaught Exception/Catch**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Uncaught Exception/Catch`)
     .setDescription(`\`\`\`js\n${err}\`\`\``)
     .addField("At", `\`\`\`${origin}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
 process.on("uncaughtExceptionMonitor", (err, origin) => {
  if (!err || !origin) return;
  console.error(err);
  return errors_webhook.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Uncaught Exception/Catch (MONITOR)**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Uncaught Exception/Catch (MONITOR)`)
     .setDescription(`\`\`\`js\n${err}\`\`\``)
     .addField("At", `\`\`\`${origin}\`\`\``)
     .setTimestamp()
     .setColor("RED"),
   ],
  });
 });
 process.on("multipleResolves", (type, promise, reason) => {
  if (!reason) return;
  console.error(reason);
  return errors_webhook.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Multiple Resolves**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Multiple Resolves`)
     .setDescription(`\`\`\`js\n${reason}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
};
