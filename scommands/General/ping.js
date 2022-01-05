const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
 name: "ping",
 description: "Checks Majo.exe response time to Discord",
 run: async (client, interaction, args) => {
  try {
   const msg = new MessageEmbed()
    .addField(`${client.bot_emojis.stopwatch} API ping (Websocket):`, `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setColor("#5865F2")
    .setTimestamp()
    .setTitle(`${client.bot_emojis.ping} Pong!`);
   interaction.followUp({ ephemeral: true, embeds: [msg] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
