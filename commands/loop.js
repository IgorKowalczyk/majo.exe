const Discord = module.require("discord.js");

module.exports.run = async (message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

    // toggle from false to true and reverse
    serverQueue.loop = !serverQueue.loop;
    return serverQueue.textChannel
      .send(`Loop is now ${serverQueue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
  }

module.exports.help = {
    name: "loop",
    description: "Loops a song",
    usage: "loop",
    type: "Fun"  
}
