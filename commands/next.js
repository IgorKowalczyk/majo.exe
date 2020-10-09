const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const youtubeAPI = process.env.YOUTUBE;
const google = require('googleapis');
const getYoutubePlaylistId = require('get-youtube-playlist-id');
const Youtube = require('simple-youtube-api');
const youtube = new Youtube(youtubeAPI);

module.exports = {
 name: "next",
 description: "Adds a song from url or title",
 cooldown: 5,
 usage: "next (video title/url)",
 category: "Music",
 run: async (client, message, args) => {
  urlCheck = new RegExp('^https://www.youtube.com/watch')
  playlistCheck = new RegExp('^https://www.youtube.com/playlist')
  req_song = args.join(' ')
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  if (playlistCheck.test(req_song)) {
   return message.channel.send("Sorry I cannot add a playlist to next in queue")
  } else {
   if (urlCheck.test(req_song)) {
    youtube.getVideo(req_song)
    .then(video => {
     const song = {
      title: video.title,
      url: video.url,
      channel: video.channel.title,
      duration: video.duration
     };
     serverQueue.splice(1, 0, song);
    })
    .catch(err => { console.log(err) });
   } else {
   //Searches through the YouTube API for video
    youtube.searchVideos(req_song, 1)
    .then(results => {
     result = results[0];
     const song = {
      title: result.title,
      url: result.url,
     channel: result.channel.title,
     }
     try {
      serverQueue.songs.splice(1, 0, song)
      message.channel.send(`${song.title} has been added next in queue`)
     } catch {
      message.channel.send("There was an error when adding this song")
     }
    }).catch(err => {
     console.log(err)
    });
   }
  }
 }
}
