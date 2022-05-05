const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "ping",
 description: "🏓 Get the ping for Majo.exe",
 usage: "/ping",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   const date = Math.floor(Date.now() / 10);
   const websocket_ping = Math.floor(client.ws.ping);
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Pong!...`);
   interaction.followUp({ embeds: [wait] }).then(async (msg) => {
    const client_ping = Math.floor(Date.now() / 10 - date);
    await client.database.getConnection(async (err, conn) => {
     if (err) return client.createSlashCommandError(interaction, err);
     await conn.ping(() => {
      const database_ping = Math.floor(Date.now() / 10 - date);
      const ping_message = new MessageEmbed()
       .addField(`${client.bot_emojis.stopwatch} Client Latency`, `\`\`\`${Math.floor(websocket_ping + client_ping)}ms\`\`\``)
       .addField(`${client.bot_emojis.stopwatch} Host Latency`, `\`\`\`${websocket_ping}ms\`\`\``)
       .addField(`${client.bot_emojis.stopwatch} Database Latency`, `\`\`\`${database_ping}ms\`\`\``)
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
