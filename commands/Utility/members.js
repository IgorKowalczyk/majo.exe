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
   const embed = new Discord.MessageEmbed() // Prettier()
    .setAuthor("🧑‍🍼 Total members", message.guild.iconURL)
    .setColor("RANDOM")
    .setDescription(`<:members:658538493470965787> All members: ${message.guild.memberCount}\n<:online:844882507408211988> Online: ${members.filter((member) => member.presence.status === "online").size}\n<:idle:844882507064410123> Idle: ${members.filter((member) => member.presence.status === "idle").size}\n<:dnd:844882506587176960> Do Not Disturb: ${members.filter((member) => member.presence.status === "dnd").size}\n<:offline:844882504502870048> Offline: ${members.filter((member) => member.presence.status === "offline").size}`)
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
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
