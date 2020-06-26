const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  return message.channel.send(
    `🎶 Now playing: **${serverQueue.songs[0].title}**`
  );
}

module.exports.help = {
    name: "np",
    description: "Display the now-playing song",
    usage: "np",
    type: "Music",
}


