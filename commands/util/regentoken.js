const { Command } = require('discord.js-commando')
const randomstr = require('randomstring')

module.exports = class RegenTokensCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'regentoken',
      group: 'util',
      memberName: 'regentoken',
      description: 'Regenerates the user\'s token if they think it has been compromised.',
      guildOnly: true
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 1 || this.client.isOwner(msg.author)
  }

  async run (msg, args) {
    const dmChannel = await msg.member.createDM()
    var userProvider = this.client.userProvider
    var userList = await userProvider.getAllUsers()
    if (await this.client.userProvider.getLevel(msg.author.id) === 3 || this.client.isOwner(msg.author) && args.toLowerCase() === 'all') {
      const response = await msg.channel.send('Working...')
      for (var i in userList) {
        await userProvider.setToken(userList[i].userid, randomstr.generate(12))
      }
      return response.edit('All tokens have been regenerated!')
    } else {
      const token = randomstr.generate(12)
      this.client.userProvider.setToken(msg.author.id, token)
      dmChannel.send(`Your new token is \`${token}\`. Be careful next time!`)
    }
  }
}
