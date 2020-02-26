const { Command } = require('discord.js-commando')

module.exports = class PauseCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-voice', 'pau'],
      group: 'voice',
      memberName: 'pause',
      description: 'Pauses current song',
      examples: ['pause-voice', 'pause', 'pau'],
      guildOnly: true
    })
  }
  async run (msg) {
    const queue = this.queue.get(msg.guild.id)
    var userChannel = msg.member.voiceChannel
    if (!queue) {
      msg.reply('I\'m not in a voice channel! Stop picking on me :(')
      .then(response => {
        response.delete(2000)
        msg.delete(2000)
      })
    } else {
      const song = queue.songs[0]
      if (!song.playing) {
        msg.reply('I\'m already paused, ya dingus!')
        .then(response => {
          response.delete(2000)
          msg.delete(2000)
        })
      } else if (userChannel === queue.voiceChannel || this.client.isOwner(msg.author) || msg.member.permissions.has('ADMINISTRATOR')) {
        song.dispatcher.pause()
        song.playing = false
        msg.channel.send('**Music paused**')
        console.log(`[INFO] ${msg.author.tag} has paused the current stream`)
      } else if (!userChannel) {
        msg.reply('you\'re not connected to a voice channel!')
        .then(response => {
          response.delete(2000)
          msg.delete(2000)
        })
      } else if (userChannel !== queue.voiceChannel) {
        msg.reply(`you're not in my voice channel. Join it before pausing.`)
        .then(response => {
          response.delete(2000)
          msg.delete(2000)
        })
      }
    }
  }
  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
