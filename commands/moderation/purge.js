const { Command } = require('discord.js-commando')

module.exports = class PurgeMessageCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      examples: ['purge 50'],
      description: 'Deletes a set number of messages from channel that are younger than 2 weeks old.',
      details: 'Deletes user specified number of messages younger than 2 weeks old from the channel the purge command was sent in.',
      guildOnly: true,
      args: [
        {
          key: 'input',
          prompt: 'Enter the number of messages you would like to delete (not including the command message).',
          type: 'integer'
        }
      ]
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 2 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    const input = args.input
    if (input >= 100) {
      return msg.reply(`input must be less than 100! (Discord limitation, sorry!)`)
    } else if (input <= 2) {
      return msg.reply(`input must be greater than 2!`)
    }
    msg.channel.bulkDelete(input + 1, true)
    msg.reply(`deleted ${input} message(s)!`).then(m => {
      m.delete(5000)
    })
  }
}
