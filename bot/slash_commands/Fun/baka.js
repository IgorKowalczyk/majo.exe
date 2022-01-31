const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 description: `😡 Baka!!`,
 usage: "/baka",
 category: "Fun",
 run: async (client, interaction, args) => {
  try {
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/baka");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `${client.bot_emojis.rage} Baka!`,
      interaction.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.url);
    interaction.followUp({ embeds: [embed] });
   })();
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
