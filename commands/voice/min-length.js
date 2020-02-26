const { Command } = require('discord.js-commando')

module.exports = class MinLengthCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'min-length',
      group: 'voice',
      memberName: 'min-length',
      aliases: ['set-ml'],
      description: 'Changes the minimum allowed length of requested songs.',
      guildOnly: true
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel === 3 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    if (!args) {
      const minLength = this.client.provider.get(msg.guild.id, 'minLength')
      return msg.reply(`the current minimum length is ${minLength} second(s)`)
    }
    const minLength = parseInt(args)
    if (isNaN(minLength) || minLength === 0) {
      return msg.reply(`invalid number, enter a valid option.`)
    }
    this.client.provider.set(msg.guild.id, 'minLength', minLength)

    return msg.reply(`the minimum length has been set to ${minLength} second(s)`)
  }
}
