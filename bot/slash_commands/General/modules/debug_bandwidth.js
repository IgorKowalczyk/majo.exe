const { MessageEmbed } = require("discord.js");
const osu = require("node-os-utils");
const netstat = osu.netstat;

module.exports = async (client, interaction, args) => {
 netstat.stats().then((stats) => {
  const test = stats.pop();
  const input = Math.round(test.inputBytes / 1024 / 1024 / 1024);
  const output = Math.round(test.outputBytes / 1024 / 1024 / 1024);
  const embed = new MessageEmbed()
   .setTitle(`${client.bot_emojis.status_online} Debug bandwith`)
   .setColor("#5865F2")
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
   .setDescription(`⬇️ In: \`${input}MB/s\` | ⬆️ Out: \`${output}MB/s\`\n\n> Websocket ping: \`${client.ws.ping}ms\``)
   .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
  interaction.followUp({ embeds: [embed] });
 });
};
