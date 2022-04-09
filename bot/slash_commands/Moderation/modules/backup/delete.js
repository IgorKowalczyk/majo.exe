const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 let backupID = args[1];
 if (!backupID) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide a backup ID!`);
 }
 client.backupManager
  .fetch(backupID)
  .then((backupInfos) => {
   client.backupManager.remove(backupID);
   const backup_deleted = new MessageEmbed() // Prettier
    .setColor("GREEN")
    .setTitle(`${client.bot_emojis.success} Backup deleted!`)
    .setDescription(`Successfully deleted backup \`${backupID}\`!`)
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
   interaction.followUp({ embeds: [backup_deleted] });
  })
  .catch((err) => {
   if (err === "No backup found") {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
   } else {
    return client.createSlashCommandError(interaction, err);
   }
  });
};
