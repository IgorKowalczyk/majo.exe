const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')
module.exports = class DefaultVolumeCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'defaultvolume',
      group: 'voice',
      memberName: 'defaultvolume',
      aliases: ['set-dv', 'defaultvol'],
      description: 'Sets the default volume for all created queues.',
      guildOnly: true
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel === 3 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    if (!args) {
      const defaultVolume = this.client.provider.get(msg.guild.id, 'defaultVol')
      return msg.reply(`the current default volume is set at: ${defaultVolume}.`).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    }
    if (args.toLowerCase() === 'default') {
      this.client.provider.set(msg.guild.id, 'defaultVol', 2)
      return msg.reply(`set the default volume to 2.`).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    }
    const defaultVol = parseInt(args)
    if (isNaN(defaultVol) || defaultVol <= 0 || defaultVol > 10) {
      return msg.reply(`the default volume must be a number and within 0-10 in base 10!`).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    }
    this.client.provider.set(msg.guild.id, 'defaultVol', defaultVol)
    return msg.channel.send(stripIndents`@everyone, the default volume for all queues will now be ${defaultVol}!
      May god have mercy on your ears!`)
  }
}
