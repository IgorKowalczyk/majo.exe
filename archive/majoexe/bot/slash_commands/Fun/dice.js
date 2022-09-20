const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "dice",
 description: `🎲 Roll a virtual dice`,
 usage: "/dice",
 category: "Fun",
 run: async (client, interaction, args) => {
  try {
   const dice = Math.floor(Math.random() * (6 - 1) + 1);
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.game_dice} | The dice rolled \`${dice}\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
