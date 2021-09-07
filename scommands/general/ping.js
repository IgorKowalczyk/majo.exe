const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
 name: "ping",
 description: "Checks Majo response time to Discord",
 run: async (client, interaction, args) => {
  try {
   const msg = new MessageEmbed()
    .addField(`${client.bot_emojis.stopwatch} API ping (Websocket):`, `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
    .setFooter(
     `Requested by ${interaction.member.user.username}`,
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle(`${client.bot_emojis.ping} Pong!`);
   interaction.followUp({ephemeral: true, embeds: [msg]});
  } catch (err) {
   console.log(err);
   interaction.followUp({ ephemeral: true, content: "An error has occured!" });
  }
 },
};
