const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "donate",
 description: "🪙 Make a donation to this project to help us",
 usage: "/donate",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.sparkles} Donate to ${client.user.username}`) //
    .setTimestamp()
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setAuthor({ name: client.config.author })
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    }) // Prettier
    .setDescription(`${client.config.patreon ? `• ${client.bot_emojis.patreon_logo} **Patreon:** https://patreon.com/` + client.config.patreon : `${client.bot_emojis.patreon_logo} **Patreon:** -`}
    ${client.config.open_collective ? `• ${client.bot_emojis.open_collective_logo} **OpenCollective:** https://opencollective.com/` + client.config.open_collective : `${client.bot_emojis.open_collective_logo} **OpenCollective:** -`}
    ${client.config.ko_fi ? `• ${client.bot_emojis.kofi_logo} **Ko-Fi:** https://ko-fi.com/` + client.config.ko_fi : `${client.bot_emojis.kofi_logo} **Ko-Fi:** -`}
    ${client.config.buymeacoffee ? `• ${client.bot_emojis.buymeacoffee_logo} **BuyMeaCoffee:** https://buymeacoffee.com/` + client.config.buymeacoffee : `${client.bot_emojis.buymeacoffee_logo} **BuyMeaCoffee:** -`}
    `);

   const row = new MessageActionRow();
   if (client.config.patreon) {
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`https://patreon.com/${client.config.patreon}`)
      .setEmoji(client.bot_emojis.patreon_logo)
      .setLabel("Patreon")
      .setStyle("LINK")
    );
   }
   if (client.config.open_collective) {
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`https://opencollective.com/${client.config.open_collective}`)
      .setEmoji(client.bot_emojis.open_collective_logo)
      .setLabel("OpenCollective")
      .setStyle("LINK")
    );
   }
   if (client.config.ko_fi) {
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`https://ko-fi.com/${client.config.ko_fi}`)
      .setEmoji(client.bot_emojis.kofi_logo)
      .setLabel("Ko-Fi")
      .setStyle("LINK")
    );
   }
   if (client.config.buymeacoffee) {
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`https://buymeacoffee.com/${client.config.buymeacoffee}`)
      .setEmoji(client.bot_emojis.buymeacoffee_logo)
      .setLabel("Buy Me a Coffee")
      .setStyle("LINK")
    );
   }

   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
