const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction, args) => {
 let selected = Boolean;
 const confirm = new MessageEmbed() // Prettier
  .setTitle(`Backup Confirmation`)
  .setDescription("> Are you sure you want to create a backup?")
  .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
  .setColor("RED");

 const row = new MessageActionRow() // Prettier
  .addComponents(
   new MessageButton() // Prettier
    .setLabel("Yes")
    .setStyle("SUCCESS")
    .setCustomId("backup-confirm")
    .setEmoji(client.bot_emojis.success)
  )
  .addComponents(
   new MessageButton() // Prettier
    .setLabel("No")
    .setStyle("DANGER")
    .setCustomId("backup-no")
    .setEmoji(client.bot_emojis.error)
  );
 interaction.followUp({ embeds: [confirm], components: [row] });

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
  if (i.customId === "backup-confirm") {
   // i.deferUpdate();

   const creation_embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.loading} Creating backup...`)
    .setDescription(`> Creating backup... This might take a while, Please wait! `)
    .setColor("#5865F2")
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
   interaction.editReply({ embeds: [creation_embed], components: [] });
   client.backupManager
    .create(interaction.guild, {
     jsonBeautify: true,
     saveImages: "base64",
     maxMessagesPerChannel: 1000,
    })
    .then((backupData) => {
     let backup_created = new MessageEmbed() // Prettier
      .setTitle(`${client.bot_emojis.success} Backup created!`)
      .setColor("GREEN")
      .setDescription(`>>> ${client.bot_emojis.channel} Backup ID: \`${backupData.id}\`\n${client.bot_emojis.role} Use \`/backup load <backup id>\` to load the backup!\n\nTip: You can load the backup on the same server or even on another guild!`)
      .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
     interaction.editReply({ embeds: [backup_created] });
    });
  } else if (i.customId === "backup-no") {
   i.deferUpdate();
   selected = true;
   const confirm_disabled = new MessageEmbed()
    .setTitle(`${client.bot_emojis.error} Backup Confirmation`)
    .setDescription(`> You have cancelled the backup creation!`)
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
    .setTitle(`${client.bot_emojis.error} Backup Creation Timeout!`)
    .setDescription("> You didn't respond in time!")
    .setColor("RED")
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
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
    embeds: [timeout],
    components: [row_disabled],
   });
  }
 });
};
