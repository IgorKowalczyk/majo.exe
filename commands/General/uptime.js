const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
 name: "uptime",
 aliases: ["bot", "botuptime"],
 description: "Display a bot uptime",
 category: "General",
 usage: "uptime",
 run: async (client, message, args) => {
  try {
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const date = new Date();
   const timestamp = date.getTime() - Math.floor(client.uptime);
   const embed = new MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.uptime} Uptime`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .addField(`${client.bot_emojis.stopwatch} Uptime`, `\`\`\`${duration}\`\`\``)
    .addField(`${client.bot_emojis.rocket} Date Launched`, `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``)
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM");
   if (client.config.status) {
    embed.addField(`${client.bot_emojis.status_online} Servers Status`, "```" + client.config.status + "```");
    const row = new MessageActionRow().addComponents(
     new MessageButton() // Prettier
      .setURL(`${client.config.status}`)
      .setEmoji(client.bot_emojis.status_online)
      .setLabel("Check server status")
      .setStyle("LINK")
    );
    message.reply({ embeds: [embed], components: [row] });
   } else {
    message.reply({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
