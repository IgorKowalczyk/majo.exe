const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "backup-info",
 aliases: ["info-backup"],
 description: "Display info about server backup",
 category: "Moderation",
 usage: "backup-info",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to display info about backups! I need \`MANAGE_MESSAGES\` permission!`);
   }
   if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permission to display info about backups! You need \`MANAGE_MESSAGES\` permission!`);
   }
   const backupID = args.join(" ");

   if (!backupID) {
    return client.createError(message, `${client.bot_emojis.error} You need to enter backup ID!`);
   }

   client.backupManager
    .fetch(backupID)
    .then((backup) => {
     const embed = new MessageEmbed()
      .setDescription(`> ${client.bot_emojis.role} Server name: ${backup.data.name}\n> ${client.bot_emojis.channel} Backup ID: \`${backup.id}\`\n> ${client.bot_emojis.stage_channel} Backup size: \`${backup.size}kb\`\n> ${client.bot_emojis.stopwatch} Created at: <t:${parseInt(backup.data.createdTimestamp / 1000)}> (<t:${parseInt(backup.data.createdTimestamp / 1000)}:R>)\n\n> Note: You can load the backup by running \`${client.prefix} load-backup ${backup.id}\`!`)
      .setAuthor({ name: `#${backup.id}`, iconURL: backup.data.iconURL })
      .setThumbnail(backup.data.iconURL)
      .setColor("4f545c")
      .setFooter("Backup ID: " + backup.id)
      .setFooter({
       text: `Requested by ${message.author.username}`,
       iconURL: message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });
     return message.reply({ embeds: [embed] });
    })
    .catch((err) => {
     if (err === "No backup found") {
      return client.createError(message, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
     } else {
      const error = new MessageEmbed()
       .setColor("RED")
       .setTitle(`${client.bot_emojis.error} A wild error appeared!`)
       .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... ${client.bot_emojis.sadness}`}\`\`\``);
      return message.reply({ embeds: [error] });
     }
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
