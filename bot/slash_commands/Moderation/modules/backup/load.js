const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  let backupID = args[1];
  let selected = false;
  if (!backupID) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide a backup ID!`);
  }
  client.backupManager
   .fetch(backupID)
   .then(async () => {
    const confirm = new MessageEmbed() // Prettier
     .setTitle(`Load backup?`)
     .setDescription(">>> **Are you sure you want to load the backup?**\n**This will delete all channels, roles, messages, emojis, bans etc.**")
     .setColor("RED")
     .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
    const row = new MessageActionRow() // Prettier
     .addComponents(
      new MessageButton() // Prettier
       .setLabel("Yes")
       .setStyle("SUCCESS")
       .setEmoji(client.bot_emojis.success)
       .setCustomId("bk_yes_load")
     )
     .addComponents(
      new MessageButton() // Prettier
       .setLabel("No")
       .setStyle("DANGER")
       .setEmoji(client.bot_emojis.error)
       .setCustomId("bk_no_load")
     );

    interaction.followUp({
     embeds: [confirm],
     components: [row],
    });

    const collector = await interaction.channel.createMessageComponentCollector({
     time: 15000,
     componentType: "BUTTON",
    });

    collector.on("collect", async (i) => {
     if (i.user.id !== interaction.user.id) {
      const error = new MessageEmbed() // Prettier
       .setAuthor({ name: "You can't do this!", iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
       .setDescription(`> You can't confirm this action!`);
      return i.reply({
       embeds: [error],
       ephemeral: true,
      });
     }
     if (i.customId === "bk_yes_load") {
      i.deferUpdate();
      selected = true;
      try {
       client.backupManager
        .load(backupID, interaction.guild, {
         clearGuildBeforeRestore: true,
        })
        .then(() => {
         let backup_loaded = new MessageEmbed() // Prettier
          .setTitle(`${client.bot_emojis.success} Backup loaded!`)
          .setColor("GREEN")
          .setDescription(`> Successfully loaded backup \`${backupID}\` on ${interaction.guild.name} (ID: ${interaction.guild.id}!`)
          .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
         return interaction.user.send({ embeds: [backup_loaded] });
        })
        .catch((err) => {
         return;
        });
      } catch (err) {
       return;
      }
     } else if (i.customId === "bk_no_load") {
      i.deferUpdate();
      selected = true;
      const confirm_disabled = new MessageEmbed()
       .setTitle(`${client.bot_emojis.error} Backup Confirmation`)
       .setDescription(`> You have stopped the backup loading process!`)
       .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
       .setColor("RED");
      const row_disabled = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setLabel("Yes")
         .setStyle("SUCCESS")
         .setCustomId("backup-confirm")
         .setDisabled(true)
         .setEmoji(client.bot_emojis.success)
       )
       .addComponents(
        new MessageButton() // Prettier
         .setLabel("No")
         .setStyle("DANGER")
         .setCustomId("backup-no")
         .setDisabled(true)
         .setEmoji(client.bot_emojis.error)
       );
      return interaction.editReply({
       embeds: [confirm_disabled],
       components: [row_disabled],
      });
     }
    });
    collector.on("end", () => {
     if (!selected) {
      const timeout = new MessageEmbed() // Prettier
       .setTitle(`${client.bot_emojis.error} Backup Load Timeout!`)
       .setDescription("> You didn't respond in time!")
       .setColor("RED")
       .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
      const row_disabled = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setLabel("Yes")
         .setStyle("SUCCESS")
         .setCustomId("bk_yes_load")
         .setDisabled(true)
         .setEmoji(client.bot_emojis.success)
       )
       .addComponents(
        new MessageButton() // Prettier
         .setLabel("No")
         .setStyle("DANGER")
         .setCustomId("bk_no_load")
         .setDisabled(true)
         .setEmoji(client.bot_emojis.error)
       );
      return interaction.editReply({
       embeds: [timeout],
       components: [row_disabled],
      });
     }
    });
   })
   .catch((err) => {
    if (err === "No backup found") {
     return client.createSlashError(interaction, `${client.bot_emojis.error} | No backup found for ID \`${backupID}\`!`);
    } else {
     return;
    }
   });
 } catch (err) {
  return;
 }
};
