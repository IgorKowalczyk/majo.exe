const Discord = require("discord.js");

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "nowplaying",
 aliases: ["np"],
 description: "Display now playing song",
 category: "Music",
 usage: "nowplaying",
 run: async (client, message, args) => {
  try {
   const channel = message.member.voice.channel;
   /*if (!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You should join a voice channel before using this command!",
    }})
   }*/
   let queue = message.client.queue.get(message.guild.id)
   if(!queue) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | There is nothing playing right now!",
    }})
   }
   const embed = new Discord.MessageEmbed()
   .setTitle("🎶 Now Playing", message.guild.iconURL({ dynamic: true, format: 'png'}))
   .setDescription(queue.songs[0].title + ' Requested By: ' + '<@' + queue.songs[0].requester + '>')
   .setThumbnail(queue.songs[0].thumbnail)
   .setTimestamp()
   .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   .setColor("RANDOM")
  message.channel.send(embed);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}