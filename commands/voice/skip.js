const { Command } = require('discord.js-commando')

module.exports = class SkipCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'skip',
      group: 'voice',
      memberName: 'skip',
      description: 'Skips current song, if any.',
      examples: ['skip'],
      guildOnly: true
    })
  }
  async run (msg) {
    const queue = this.queue.get(msg.guild.id)
    if (!queue) {
      return msg.reply(`there's nothing for me to skip! Add a song first!`)
    }
    const song = queue.songs[0]
    song.dispatcher.end('skipped')
  }
  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
