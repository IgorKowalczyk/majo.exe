const { MessageEmbed } = require("discord.js");
const { dependencies } = require("../../../../package.json");

module.exports = async (client, interaction, args) => {
 const embed = new MessageEmbed() // Prettier
  .setTitle(`${client.bot_emojis.package} Dependencies`)
  .setDescription(`> <@${client.user.id}> runs on ${Object.keys(dependencies).length} [NPM packages](https://www.npmjs.com) (Javascript power ${client.bot_emojis.muscule}!)`)
  .setTimestamp()
  .setImage("https://i.redd.it/tfugj4n3l6ez.png")
  .setColor("#5865F2")
  .setFooter({
   text: `Requested by ${interaction.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
  });
 interaction.followUp({ embeds: [embed] });
};
