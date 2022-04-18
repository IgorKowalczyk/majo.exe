const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  const embed = new MessageEmbed()
   .setColor("#5865F2")
   .setTitle(`${client.bot_emojis.success} Emojis on this server`)
   .addField(`Total Emojis`, `\`\`\`${interaction.guild.emojis.cache.size}\`\`\``, true)
   .addField(`Animated Emojis`, `\`\`\`${interaction.guild.emojis.cache.filter((emoji) => emoji.animated).size}\`\`\``, true)
   .addField(`Static Emojis`, `\`\`\`${interaction.guild.emojis.cache.filter((emoji) => !emoji.animated).size}\`\`\``, true)
   .setDescription(`> ${interaction.guild.emojis.cache.map((emoji) => emoji).join(" ")}`)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  return interaction.followUp({ embeds: [embed] });
 } catch (err) {
  return client.createSlashCommandError(interaction, err);
 }
};
