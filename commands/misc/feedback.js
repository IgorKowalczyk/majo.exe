const { Command } = require('discord.js-commando')

module.exports = class FeedbackCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'feedback',
      group: 'misc',
      memberName: 'feedback',
      description: 'Send feedback to the bot author!',
      throttling: {
        usages: 2,
        duration: 60
      },
      args: [
        {
          key: 'url',
          default: '',
          prompt: 'Where should people be directed to send feedback?',
          type: 'string'
        }
      ]
    })
  }
  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 1 || this.client.isOwner(msg.author)
  }
  async run (msg, args) {
    if (args.url && this.client.isOwner(msg.author)) {
      const url = args.url
      this.client.provider.set(msg.guild.id, 'feedbackurl', url)
      return msg.reply(`feedback link has been set to \`${url}\``)
    }
    const feedbackUrl = this.client.provider.get(msg.guild.id, 'feedbackurl')
    return msg.channel.send({embed: {
      title: 'Feedback',
      color: 15844367,
      description: `Send your feedback for Infinity Bot to ${feedbackUrl}`
    }})
  }
}
