const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could stop for you."
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
}

module.exports.help = {
    name: "stop",
    description: "Stop now playing music",
    usage: "stop",
    type: "Music",
}
