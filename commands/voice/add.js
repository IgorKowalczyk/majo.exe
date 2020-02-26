const { Command } = require('discord.js-commando')
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')
const os = require('os')
const path = require('path')
const Song = require('../../struct/Song.js')
const {stripIndents} = require('common-tags')

const config = require(path.join(os.homedir(), '/.config/infinity-bot/conf.json'))

module.exports = class AddQueueCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'add',
      group: 'voice',
      memberName: 'add',
      aliases: ['req',
        'request',
        'rq'],
      description: 'Adds song to the queue, or plays instantly if no queue.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'userInput',
          prompt: 'Paste in the link of a YouTube URL, or enter a YouTube search query',
          type: 'string'
        }
      ]
    })
    this.queue = new Map()
    this.youtube = new YouTube(config.googleAPIKey)
  }

  async userLevel (msg) {
    return await this.client.userProvider.getLevel(msg.author.id)
  }

  async run (msg, args) {
    const userInput = args.userInput
    const queue = this.queue.get(msg.guild.id)

    let voiceChannel
    let response
    if (!queue) {
      voiceChannel = msg.member.voiceChannel
      if (!voiceChannel) {
        return msg.reply('join a voice channel first, ya dingus!')
      }
      const botPerms = await voiceChannel.permissionsFor(this.client.user)
      if (!botPerms.has('CONNECT')) {
        return msg.channel.send({embed: {
          color: 15158332,
          fields: [{
            name: `Whoops...`,
            value: `I can't connect to your channel... Ask an Admin for help.`
          }]
        }})
      }
      if (!botPerms.has('SPEAK')) {
        return msg.channel.send({embed: {
          color: 15158332,
          fields: [{
            name: `Whoops...`,
            value: `I can't speak in your channel... Ask an Admin for help.`
          }]
        }})
      }
    } else if (voiceChannel !== queue.voiceChannel && this.userLevel(msg) < 2) {
      const prefix = this.client.provider.get(msg.guild.id, 'prefix')
      response = await msg.channel.send({embed: {
        color: 10038562,
        title: `Error joining channel...`,
        description: stripIndents`You're not in my channel. Either join my channel, or move me using ${prefix}mv.
          Type \`${prefix}help move\` for more info.`
      }})
      response.delete(5000)
      msg.delete(5000)
      return
    }
    const playlistLink = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
    const plvidLink = /^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=([^&]+)(.*)&list=([^&]+)(.*)$/
    const status = await msg.reply('getting video details, one moment...')
    if (userInput.match(plvidLink)) {
      var result = plvidLink.exec(userInput)
      msg.reply(stripIndents`the link you've inputted contains both a video *and* a playlist. Choose the one you desire, and request again:
        **Video:** https://www.youtube.com/watch?v=${result[2]}
        **Playlist:** https://www.youtube.com/playlist?list=${result[4]}`)
      return status.delete()
    } else if (userInput.match(playlistLink)) {
      const playlist = await this.youtube.getPlaylist(userInput)
      return this.handlePlaylist(msg, status, queue, playlist, voiceChannel)
    } else {
      try {
        const video = await this.youtube.getVideo(userInput)
        return this.handleVideo(msg, status, queue, video, voiceChannel)
      } catch (error) {
        try {
          const searchResult = await this.youtube.searchVideos(userInput, 1)
          const searchVideo = await this.youtube.getVideoByID(searchResult[0].id)
          return this.handleVideo(msg, status, queue, searchVideo, voiceChannel)
        } catch (error) {
          console.error(`[ERROR] ${error}`)
          return status.edit('search query returned no results, sorry!')
        }
      }
    }
  }
  async handleVideo (msg, status, queue, video, voiceChannel) {
    if (video.durationSeconds === 0) {
      status.edit(`${msg.author}, livestreams aren't supported, apologies!`)
      return null
    }
    if (!queue) {
      queue = {
        voiceChannel: voiceChannel,
        textChannel: msg.channel,
        connection: null,
        songs: [],
        volume: this.client.provider.get(msg.guild.id, 'defaultVol')
      }
      this.queue.set(msg.guild.id, queue)

      const result = await this.addSong(video, msg, false, null)
      const resultMsg = {color: 3426654,
        description: stripIndents`**Joining your voice channel:** ${queue.voiceChannel.name}
          ${result}`}

      status.edit('trying to join your voice channel, hang on.')

      try {
        const connection = await queue.voiceChannel.join()
        msg.channel.send({embed: resultMsg})
        queue.connection = connection
        this.play(msg.guild, queue.songs[0])
        status.delete()
        return null
      } catch (error) {
        msg.channel.send({embed: {color: 15158332,
          description: `**Something went wrong when joining the channel**
          Send this to an Admin: ${error}`}})
        console.error(`[ERROR] ${error}`)
      }
    } else {
      const result = await this.addSong(video, msg)
      const resultMsg = {color: 3426654,
        description: result
      }
      status.edit('', {embed: resultMsg})

      return null
    }
  }
  async handlePlaylist (msg, status, queue, playlist, voiceChannel) {
    const videos = await playlist.getVideos()
    const prefix = this.client.provider.get(msg.guild.id, 'prefix')
    msg.channel.send({ embed: {
      color: 15844367,
      title: `Added Playlist to Queue!`,
      description: `${msg.author} has queued up __${playlist.title}__ by **${playlist.channel.title}**!
        **${Object.entries(videos).length}** videos will be attempted to be added to the queue.

        Use \`${prefix}queue\` to see all videos in the queue.`
    }})

    for (const video of Object.values(videos)) {
      const video2 = await this.youtube.getVideoByID(video.id)
      if (video2.durationSeconds === 0) {
        status.edit(`${msg.author}, livestreams aren't supported, apologies!`)
        return null
      }
      if (!queue) {
        queue = {
          voiceChannel: voiceChannel,
          textChannel: msg.channel,
          connection: null,
          songs: [],
          volume: this.client.provider.get(msg.guild.id, 'defaultVol')
        }
        this.queue.set(msg.guild.id, queue)
        await this.addSong(video2, msg)
        status.edit('trying to join your voice channel, hang on.')

        try {
          const connection = await queue.voiceChannel.join()
          queue.connection = connection
          this.play(msg.guild, queue.songs[0])
          status.delete()
        } catch (error) {
          msg.channel.send({embed: {color: 15158332,
            description: `**Something went wrong when joining the channel**
            Send this to an Admin: ${error}`}})
          console.error(`[ERROR] ${error}`)
        }
      } else {
        await this.addSong(video2, msg)
      }
    }
    queue.textChannel.send(`Playlist has been added to the queue!`)
    .then(response => {
      response.delete(2500)
    })
    return null
  }

  addSong (video, msg) {
    const queue = this.queue.get(msg.guild.id)
    const song = new Song(video, msg.member)
    const minLength = this.client.provider.get(msg.guild.id, 'minLength')
    if (song.length < minLength && this.userLevel(msg) < 2) {
      return `\n**${song.title} is too short to play...**`
    } else {
      queue.songs.push(song)
      return `Added ${song.title} to the queue`
    }
  }

  play (guild, song) {
    const queue = this.queue.get(guild.id)
    if (!song && queue) {
      if (queue.textChannel) {
        queue.textChannel.send({embed: {
          color: 15844367,
          description: `No more songs in queue, leaving voice!`
        }})
      }
      this.client.voiceConnections.first().channel.leave()
      this.queue.delete(guild.id)
      return
    }
    queue.textChannel.send({embed: {
      color: 3447003,
      description: `**Now playing:** __[${song.title}](${song.url})__`,
      fields: [{
        name: `Requested By:`,
        value: song.username,
        inline: true
      },
      {
        name: `Length:`,
        value: song.songLength,
        inline: true
      }
      ],
      image: {url: song.thumbnail},
      footer: {
        icon_url: 'http://therealdanvega.com/wp-content/uploads/2016/02/YouTube-logo-play-icon-e1455109429590.png',
        text: 'YouTube'
      }}
    })
    let stream = ytdl(song.url, {audioonly: true})

    const dispatcher = queue.connection.playStream(stream, {passes: 3})
      .on('end', reason => {
        if (reason === 'skipped') {
          setTimeout(() => {
            queue.songs.shift()
            this.play(guild, queue.songs[0])
          }, 5)
        } else {
          queue.songs.shift()
          this.play(guild, queue.songs[0])
        }
      })
    song.dispatcher = dispatcher
    song.dispatcher.setVolumeLogarithmic(queue.volume / 10)
    song.playing = true
  }
}
