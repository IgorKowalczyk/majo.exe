const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "dog",
 description: "🐕 View a random photo of a cute dog",
 category: "Image",
 usage: "/dog",
 run: async (client, interaction, args) => {
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/woof");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      "🐕 Random dog",
      interaction.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: "Requested by " + `${interaction.user.username}` + " • (Cuteee)",
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.url);
    interaction.followUp({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createSlashCommandError(interaction, err);
   }
  })();
 },
};
