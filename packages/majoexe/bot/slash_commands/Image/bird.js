const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "bird",
 description: "🐦 Display a random picture of a bird",
 usage: "/bird",
 category: "Image",
 run: async (client, interaction, args) => {
  try {
   (async () => {
    const response = await fetch(`https://some-random-api.ml/img/birb`);
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
     .setTitle(`${client.bot_emojis.bird} Bird`)
     .setImage(body.link);
    interaction.followUp({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
