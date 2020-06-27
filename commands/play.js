const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const search = require('youtube-search');

module.exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.channel.send('You must be in voice channel!');

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('I dont have premisions to play music!');
    }
 
    
    var opts = {
      maxResults: 1,
      key: 'AIzaSyC9wP9rVzyoeAt0EFNZmYmz0jPlpaCfhtg',
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
       
       message.channel.send(`Play: **${song.title}**`);
        
       play(message.guild, queueObject.songs[0]);

      } catch (err) {

       console.log(err);
       queue.delete(message.guild.id);
       return message.channel.send(err);

      }
      
    }else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return message.channel.send(`**${song.title}** has been added to queue. Requested by: __${message.author.tag}__`);

    }
}

module.exports.help = {
    name: "play",
    description: "Play a music",
    usage: "play <search/url>",
    type: "Music",
}