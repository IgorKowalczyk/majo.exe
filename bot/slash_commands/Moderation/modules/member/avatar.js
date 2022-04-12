const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (client, interaction, args) => {
 const user = interaction.guild.members.cache.get(args[1]);
 if (!user) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user!`);
 }
 const avatar = user.user.displayAvatarURL({
  dynamic: true,
  format: "png",
  size: 4096,
 });
 const row = new MessageActionRow() // Prettier
  .addComponents(
   // Prettier
   new MessageButton() // Prettier
    .setLabel("Avatar Link")
    .setStyle("LINK")
    .setURL(avatar)
  );
 const embed = new MessageEmbed() // Prettier
  .setColor("#5865f2")
  .setDescription(`${user.user.tag}'s Avatar`)
  .setImage(avatar)
  .setTimestamp()
  .setFooter({
   text: `Requested by ${interaction.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
  });
 await interaction.followUp({ embeds: [embed], components: [row] });
};
