const { Command } = require('discord.js-commando')

module.exports = class VolumeControlCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'volume',
      group: 'voice',
      memberName: 'volume',
      aliases: ['vol'],
      description: 'Adjusts the volume of the bot.',
      details: `Ranges from 0-10. Divides the input by 10, giving you granular control. Decimals are allowed. Using up or down steps the volume by 2`,
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 5
      }
    })
  }
  run (msg, args) {
    const queue = this.queue.get(msg.guild.id)
    if (!queue) return msg.reply(`I'm not playing anything, you can't just tell me to quiet down when I'm not talking!`)
    if (!args) return msg.reply(`currently, the volume is set to: ${queue.volume}`)
    if (!queue.voiceChannel.members.has(msg.author.id) && !msg.member.permissions.has('MANAGE_MESSAGES')) {
      return msg.reply(`join my channel before modifying the volume I'm playing at!`).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    }
    let volume = parseFloat(args)
    if (isNaN(volume)) {
      volume = args.toLowerCase()
      if (volume === 'up' || volume === '+') volume = queue.volume + 2
      else if (volume === 'down' || volume === '-') volume = queue.volume - 2
      else return msg.reply(`invalid input, input a number ranging from 0-10!`)
    }
    if (volume === 10.1) {
      msg.reply(`smartass, volume has been set to 10.`).then(m => {
        m.delete(2500)
        msg.delete(2500)
      })
      volume = 10
    }
    if (volume > 10) {
      return msg.reply(`max volume is 10!`).then(m => {
        m.delete(2500)
        msg.delete(2500)
      })
    }
    queue.volume = volume
    if (queue.songs[0].dispatcher) queue.songs[0].dispatcher.setVolumeLogarithmic(volume / 10)
    return msg.reply(`volume has been set to ${queue.volume}, effective ${queue.volume * 10}%!`).then(m => {
      m.delete(2500)
      msg.delete(2500)
    })
  }

  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
