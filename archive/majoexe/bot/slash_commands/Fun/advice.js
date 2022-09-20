const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "advice",
 description: `🤌 Get a random helpful advice`,
 usage: "/advice",
 category: "Fun",
 run: async (client, interaction, args) => {
  try {
   const res = await fetch("https://api.adviceslip.com/advice"),
    { slip } = await res.json();
   const embed = new MessageEmbed()
    .setTitle(`${client.bot_emojis.thinking} My advice`)
    .setDescription(`>>> **${slip.advice}**`)
    .setColor("#00b0f4")
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ ephemeral: true, embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
