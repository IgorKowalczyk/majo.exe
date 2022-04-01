const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "fox",
 description: "🦊 View a random photo of a cute fox",
 category: "Fun",
 usage: "/fox",
 run: async (client, interaction, args) => {
  try {
   const response = await fetch("https://some-random-api.ml/img/fox");
   const body = await response.json();
   const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTitle("🦊 Fox")
    .setImage(body.link);
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
