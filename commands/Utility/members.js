const Discord = require("discord.js");

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "How many members are in the current server",
 category: "Utility",
 usage: "members",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setAuthor("🧑‍🍼 Total members", message.guild.iconURL)
    .setColor("RANDOM")
    .setDescription("Overall Members" + message.guild.memberCount)
    .addField("<:online:844882507408211988> Online: ", members.filter(member => member.presence.status === 'online').size)
    .addField("<:idle:844882507064410123> Idle: ", members.filter(member => member.presence.status === 'idle').size)
    .addField("<:dnd:844882506587176960> Do Not Disturb: ", members.filter(member => member.presence.status === 'dnd').size)
    .addField("<:offline:844882504502870048> Offline: ", members.filter(member => member.presence.status === 'offline').size)
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
