module.exports = {
 name: "volume",
 aliases: ["volume", "vol", "bass", "bassboost"],
 description: "Adjusts player volume",
 category: "Music",
 usage: "volume <number>",
 run: async (client, message, args) => {
  if (args) {
   volString = args.join('');
   var volInt = parseInt(volString, 10)
   if (!isNaN(volInt) && volInt >= 5) {
    if (volInt > 100) return message.channel.send("Volume cannot be set above 100")
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    oldVolume = serverQueue.volume
    if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = volInt;
    serverQueue.connection.dispatcher.setVolumeLogarithmic(volInt / 5);
    return message.channel.send(`Volume has been set from **${oldVolume}** to: **${volInt}**`);
   } else {
    return message.channel.send("Volume command only accepts positive/neutral Numerical input!")
   }
  }
 }
}
