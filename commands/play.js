const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
   
   message.channel.send(`Soon! (Im working on windows XP because my orginal computer has been broken :/)~Majonez.exe`);
   /*
   const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.channel.send('You must be connected to voice channel!');

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('I dont have premissions to connect VC');
    }
    
    var opts = {
      maxResults: 1,
      key: 'AIzaSyC5S5zY4od9NagaN9fMReG5wJkY1IMz0rY',
      type: "video"
    };
      
    
    const songArg = await search(args.join(' '), opts);
    const songURL = songArg.results[0].link;
    const songInfo = await ytdl.getInfo(songURL);
    
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
      author: message.author.tag
    };
    
    if (!serverQueue) {
      const queueObject = {
       textChannel: message.channel,
       voiceChannel: voiceChannel,
       connection: null,
       songs: [],
       volume: 5,
       playing: true,
      };
      
      queue.set(message.guild.id, queueObject);

      queueObject.songs.push(song);
      

      try {
       var connection = await voiceChannel.join();
       queueObject.connection = connection;
       
       message.channel.send(`Im playing: **${song.title}**`);
        
       play(message.guild, queueObject.songs[0]);

      } catch (err) {
       queue.delete(message.guild.id);
       return message.channel.send(err);
      }
      
    }else {
      serverQueue.songs.push(song);
      return message.channel.send(`Song **${song.title}** been added to the queue ! Added by: __${message.author.tag}__`);

}
*/

}

module.exports.help = {
    name: "play",
    description: "Play a song",
    usage: "play <search/song-url>",
    type: "Fun",
}
