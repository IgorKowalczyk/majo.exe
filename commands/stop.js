const Discord = module.require("discord.js");

module.exports.run = async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);
    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏹ stopped the music!`).catch(console.error);
  }
};

module.exports.help = {
    name: "stop",
    description: "Remove a song from queue",
    usage: "remove",
    type: "Fun"  
}