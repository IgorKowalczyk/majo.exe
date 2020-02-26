const { Command } = require('discord.js-commando')
const randomstr = require('randomstring')

module.exports = class TokenCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'token',
      group: 'util',
      memberName: 'token',
      description: `PM's the user their unique token`,
      guildOnly: true
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 1 || this.client.isOwner(msg.author)
  }

  async run (msg) {
    const userProvider = this.client.userProvider
    const dmChannel = await msg.member.createDM()
    function response (token) {
      msg.reply('sent you a DM with your token! Remember to vote your conscience!')
      dmChannel.send(`${msg.member.user}, your unique token is \`${token}\`. Don't share this with anyone!`)
    }
    if (!await userProvider.getUser(msg.author.id)) {
      userProvider.addUser(msg.author.id, msg.author.tag)
      const token = randomstr.generate(12)
      userProvider.setToken(msg.author.id, token)
      response(token)
    } else if (!await userProvider.getToken(msg.author.id)) {
      if (await userProvider.getUser(msg.author.id).name !== msg.author.tag) userProvider.setName(msg.author.id, msg.author.tag)
      const token = randomstr.generate(12)
      userProvider.setToken(msg.author.id, token)
      response(token)
    } else {
      if (await userProvider.getUser(msg.author.id).name !== msg.author.tag) userProvider.setName(msg.author.id, msg.author.tag)
      const token = await userProvider.getToken(msg.author.id)
      response(token)
    }
  }
}
