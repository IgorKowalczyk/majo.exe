const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 let backupID = args[1];
 if (!backupID) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide a backup ID!`);
 }
 await client.backupManager
  .fetch(backupID)
  .then((backup) => {
   const embed = new MessageEmbed()
    .setDescription(`> ${client.bot_emojis.role} **Server name:** \`${backup.data.name}\`\n> ${client.bot_emojis.channel} **Backup ID:** \`${backup.id}\`\n> ${client.bot_emojis.stage_channel} **Backup size:** \`${backup.size}kb\`\n> ${client.bot_emojis.stopwatch} **Created at:** <t:${parseInt(backup.data.createdTimestamp / 1000)}> (<t:${parseInt(backup.data.createdTimestamp / 1000)}:R>)\n\n> Note: You can load the backup by running \`/backup load ${backup.id}\`!`)
    .setAuthor({ name: `#${backup.id}`, iconURL: backup.data.iconURL })
    .setThumbnail(backup.data.iconURL)
    .setColor("#5865F2")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.editReply({ embeds: [embed] });
  })
  .catch((err) => {
   if (err === "No backup found") {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
   } else {
    return client.createSlashCommandError(interaction, err);
   }
  });
};
