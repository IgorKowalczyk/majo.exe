const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "create-backup",
 aliases: ["create-server-backup", "backup", "backup-create"],
 description: "Create server backup",
 category: "Moderation",
 timeout: 600000,
 usage: "create-backup",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to create backups! I need \`ADMINISTRATOR\` permission!`);
   }
   if (!message.member.permissions.has("ADMINISTRATOR")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permission to create backups! You need \`ADMINISTRATOR\` permission!`);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating server backup! It may even take a few minutes!`);
   message.reply({ embeds: [wait] }).then((msg) => {
    client.backupManager
     .create(message.guild, {
      maxMessagesPerChannel: 1000,
      jsonBeautify: true,
      saveImages: "base64",
     })
     .then((backupData) => {
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setTitle(`${client.bot_emojis.success} Backup Created!`)
       .setDescription(`>>> ${client.bot_emojis.channel} Backup ID: \`${backupData.id}\`\n${client.bot_emojis.role} Use \`${client.prefix} load-backup\` to load the backup!\n\nTip: You can load the backup on the same server or even on another guild!`);
      return msg.edit({ embeds: [embed] });
     })
     .catch(() => {
      return client.createError(message, `${client.bot_emojis.error} | An error occurred! Please check <@${client.user.id}> permissions (\`${client.prefix} check-perm\`)!`);
     });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
