const Discord = require("discord.js");
const config = require("../config");
const { canModifyQueue } = require("../utilities/main");

module.exports = {
 name: "pause",
 aliases: [],
 description: "Pause the music",
 category: "Music",
 usage: "pause",
 run: async (client, message, args) => {
  try {
   if (!message.guild) return;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "This is nothing playing right now",
    }})
   }
   if (!canModifyQueue(message.member)) return;
   if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    const pausemebed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`${message.author.username} paused the music.`)
    message.react("⏸");
    return queue.textChannel.send(pausemebed).catch(console.error);
   }
  } catch (err) {
   console.log(err);
   return message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:",
   }})
  }
 }
}
