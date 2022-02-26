const { MessageEmbed, WebhookClient } = require("discord.js");
if (!process.env.ERRORS_WEBHOOK) throw new Error("You need to enter ERRORS_WEBHOOK url in .env!");
const errweb = new WebhookClient({ url: process.env.ERRORS_WEBHOOK });
const discord_protection = /(?:https?:\/\/)?(?:[^.]+\.)?discord\.com(\/.*)?$/;

module.exports = (client) => {
 process.on("unhandledRejection", (reason, p) => {
  //console.log(" [antiCrash] :: Unhandled Rejection/Catch");
  return errweb.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Unhandled Rejection/Catch**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Unhandled Rejection/Catch`)
     .setDescription(`\`\`\`js\n${reason.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
 process.on("uncaughtException", (err, origin) => {
  //console.log(" [antiCrash] :: Uncaught Exception/Catch");
  return errweb.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Uncaught Exception/Catch**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Uncaught Exception/Catch`)
     .setDescription(`\`\`\`js\n${err.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .addField("At", `\`\`\`${origin.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
 process.on("uncaughtExceptionMonitor", (err, origin) => {
  //console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
  return errweb.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Uncaught Exception/Catch (MONITOR)**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Uncaught Exception/Catch (MONITOR)`)
     .setDescription(`\`\`\`js\n${err.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .addField("At", `\`\`\`${origin.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .setTimestamp()
     .setColor("RED"),
   ],
  });
 });
 process.on("multipleResolves", (type, promise, reason) => {
  //console.log(" [antiCrash] :: Multiple Resolves");
  return errweb.send({
   username: `${client.user.username} Error`,
   avatarURL: client.user.displayAvatarURL({ dynamic: true }),
   content: `__**[antiCrash] :: Multiple Resolves**__`,
   embeds: [
    new MessageEmbed()
     .setAuthor({ name: `AntiCrash`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setTitle(`Multiple Resolves`)
     .setDescription(`\`\`\`js\n${reason.replace(discord_protection, "[https://discord.com/[replaced-token]")}\`\`\``)
     .setColor("RED")
     .setTimestamp(),
   ],
  });
 });
};
