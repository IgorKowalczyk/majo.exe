const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
 name: "bot-token",
 description: `💾 Generate (fake) random Discord Token`,
 usage: "/bot-token",
 category: "Fun",
 run: async (client, interaction, args) => {
  try {
   const response = await fetch("https://some-random-api.ml/bottoken");
   const body = await response.json();
   const embed = new MessageEmbed()
    .setColor("#4f545c")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTitle(`${client.bot_emojis.discord_logo} Discord Token`)
    .setDescription("> ```" + body.token + "```\n>>> Note: This token is automatically generated, it is not a real token for discord bot! It is only supposed to look like this!");
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
