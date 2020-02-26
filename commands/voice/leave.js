const { Command } = require('discord.js-commando')

module.exports = class LeaveCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'leave',
      aliases: ['lv', 'leavevoice', 'stfu', 'leave-voice'],
      group: 'voice',
      memberName: 'leave-voice',
      description: 'Leaves the voice channel the bot is in',
      examples: ['lv', 'leavevoice', 'stfu', 'leave-voice'],
      guildOnly: true
    })
  }

  async run (msg) {
    const queue = this.queue.get(msg.guild.id)
    let response
    if (!queue) {
      response = await msg.reply('I\'m not connected to a voice channel!')
      response.delete(2000)
      msg.delete(2000)
    } else {
      console.log(`[INFO] Leaving channel: ${queue.voiceChannel.name}`)
      queue.textChannel.send({embed: {
        color: 15158332,
        description: `**${msg.author} made me leave... I'm sowwy**`,
        image: {url: `https://media1.giphy.com/media/oAW9QPkQwJqJq/giphy.gif`}
      }})
      queue.textChannel = undefined
      queue.songs = []
      queue.voiceChannel.leave()
      this.queue.delete(msg.guild.id)
      return
    }
  }

  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
