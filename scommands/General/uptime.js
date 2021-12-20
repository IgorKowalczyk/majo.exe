const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
 name: "uptime",
 description: "Display Majo.exe uptime",
 run: async (client, interaction, args) => {
  try {
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const date = new Date();
   const timestamp = date.getTime() - Math.floor(client.uptime);
   const embed = new MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.uptime} Uptime`,
     interaction.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .addField(`${client.bot_emojis.stopwatch} Uptime`, `\`\`\`${duration}\`\`\``)
    .addField(`${client.bot_emojis.rocket} Date Launched`, `<t:${moment(timestamp).unix()}> (<t:${moment(timestamp).unix()}:R>)`)
    .setTimestamp()
    .setFooter(
     `Requested by ${interaction.member.user.username}`,
     interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("#5865F2");
   if (client.config.status) {
    embed.addField(`${client.bot_emojis.status_online} Servers Status`, "```" + client.config.status + "```");
    const row = new MessageActionRow().addComponents(
     new MessageButton() // Prettier
      .setURL(`${client.config.status}`)
      //.setEmoji(client.bot_emojis.status_online)
      .setLabel("Status page")
      .setStyle("LINK")
    );
    interaction.followUp({ ephemeral: false, embeds: [embed], components: [row] });
   } else {
    interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
