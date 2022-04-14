const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "ping",
 description: "🏓 Get the ping for Majo.exe",
 usage: "/ping",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   const date_ping = await moment(Date.now()).unix();
   const websocket_ping = Math.round(client.ws.ping);
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Pong!...`);
   interaction.followUp({ embeds: [wait] }).then(async (msg) => {
    const api_ping = Date.now() - msg.createdTimestamp;
    await client.database.getConnection(async (err, conn) => {
     if (err) return client.createSlashCommandError(interaction, err);
     await conn.ping(function (err) {
      let ping = moment(Date.now()).unix() - date_ping;
      const ping_message = new MessageEmbed()
       .addField(`${client.bot_emojis.stopwatch} API Request Latency`, `\`\`\`${api_ping.toString().replace(/-/g, "")}ms\`\`\``)
       .addField(`${client.bot_emojis.stopwatch} API Websocket Latency`, `\`\`\`${websocket_ping}ms\`\`\``)
       .addField(`${client.bot_emojis.stopwatch} Database Latency`, `\`\`\`${ping == 0 ? 1 : ping}ms\`\`\``)
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
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
