const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "queue",
 aliases: ["q"],
 description: "Displays the server queue",
 category: "Music",
 usage: "queue",
 run: async (client, message, args) => {
  try {
   const channel = message.member.voice.channel;
   /*if (!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You should join a voice channel before using this command!",
    }})
   }*/
   const queue = message.client.queue.get(message.guild.id)
   let status;
   if(!queue) status = 'There is nothing in queue!'
   else status = queue.songs.map(x => '• ' + x.title + ' -Requested by ' + `<@${x.requester.id}>`).join('\n')
   if(!queue) np = status
   else np = queue.songs[0].title
   if(queue) thumbnail = queue.songs[0].thumbnail
   else thumbnail = message.guild.iconURL()
   let embed = new MessageEmbed()
    .setTitle('Queue')
    .setThumbnail(thumbnail)
    .setColor(RANDOM)
    .addField('Now Playing', np, true)
    .setDescription(status)
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
