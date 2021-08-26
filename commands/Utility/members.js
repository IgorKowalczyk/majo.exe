const Discord = require("discord.js");

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "How many members are in the current server",
 category: "Utility",
 usage: "members",
 run: async (client, message, args) => {
  try {
   const members = message.guild.members.cache;
   const embed = new Discord.MessageEmbed() // Prettier
    .setAuthor("Total members", message.guild.iconURL)
    .setColor("RANDOM")
    .setDescription(`All members: ${message.guild.memberCount}\n\n${client.bot_emojis.status_online} **Online:** \`${members.filter((member) => member.presence.status === "online").size}\`\n${client.bot_emojis.status_idle} **Idle:** \`${members.filter((member) => member.presence.status === "idle").size}\`\n${client.bot_emojis.status_dnd} **Do Not Disturb:** \`${members.filter((member) => member.presence.status === "dnd").size}\`\n${client.bot_emojis.status_offline} **Offline:** \`${members.filter((member) => member.presence.status === "offline").size}\``)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
