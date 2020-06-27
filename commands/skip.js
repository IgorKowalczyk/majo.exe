const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const channel = message.member.voiceChannel;
  if (!channel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue)
    return message.channel.send(
      "There is nothing playing that I could skip for you."
    );
  serverQueue.connection.dispatcher.end("Skip command has been used!");
}

module.exports.help = {
    name: "skip",
    description: "Skip now playing song",
    usage: "skip",
    type: "Music",
}