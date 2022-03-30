const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "ping",
 description: "🏓 Get the ping for Majo.exe",
 usage: "/ping",
 category: "General",
 run: async (client, interaction, args) => {
  const date_ping = moment(Date.now()).unix();
  try {
   client.database.ping(function (err) {
    let ping = moment(Date.now()).unix() - date_ping;
    const wait = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | Pong!...`);
    interaction.followUp({ embeds: [wait] }).then((msg) => {
     const ping_message = new MessageEmbed()
      .addField(`${client.bot_emojis.stopwatch} API Request Latency:`, `\`\`\`${(Date.now() - msg.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
      .addField(`${client.bot_emojis.stopwatch} API Websocket Latency:`, `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
      .addField(`${client.bot_emojis.stopwatch} Database Latency:`, `\`\`\`${ping == 0 ? 1 : ping}ms\`\`\``)
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
     if (client.config.status) {
      const row = new MessageActionRow().addComponents(
       new MessageButton() // Prettier
        .setURL(`${client.config.status}`)
        //.setEmoji(client.bot_emojis.status_online)
        .setLabel("Status page")
        .setStyle("LINK")
      );
      msg.edit({ ephemeral: false, embeds: [ping_message], components: [row] });
     } else {
      msg.edit({ ephemeral: false, embeds: [ping_message] });
     }
    });
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
