const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = {
 name: "ping",
 aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  try {
   const ping = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.ping} Pong!`)
    .addField(`${client.bot_emojis.stopwatch} My ping:`, `\`\`\`${(Date.now() - message.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
    .addField(`${client.bot_emojis.stopwatch} API ping (Websocket):`, `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("RANDOM")
    .setTimestamp();
   message.reply({ embeds: [ping] });
  } catch (err) {
   console.log(err);
   message.reply({embeds: [client.command_error_embed]})
  }
 },
};
