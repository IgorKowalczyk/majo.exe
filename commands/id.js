const Discord = require("discord.js");

module.exports = {
 name: "id",
 aliases: ["get-id"],
 description: "Display a mentioned user ID (Yes, you can copy this directly from Discord too)",
 category: "Moderation",
 usage: "id <mention>",
 run: async (client, message, args) => {
  try {
   const mention = message.guild.member(message.mentions.users.first());
   if(!mention) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You must mention a user"
    }})
   }
   const userid = new Discord.MessageEmbed()
    .setThumbnail(mention.user.avatarURL())
    .setColor("RANDOM")
    .setDescription('Here is ' + `${mention.user.username} ID` + mention.id)
   message.channel.send(userid)  
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 