const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cat",
 description: "🐱 Sends a random cat photo",
 category: "Image",
 usage: "/cat",
 run: async (client, interaction, args) => {
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/meow");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `${client.bot_emojis.cat} Random Cat`,
      interaction.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: "Requested by " + `${interaction.user.username}` + " • (Aww cute =＾´• ⋏ •`＾=)",
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
