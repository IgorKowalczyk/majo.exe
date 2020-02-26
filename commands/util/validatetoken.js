const { Command } = require('discord.js-commando')

module.exports = class ValidateTokenCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'validatetoken',
      group: 'util',
      memberName: 'validatetoken',
      aliases: ['valtok', 'validtok', 'validtoken'],
      description: 'Crossreferences vote tokens with users file to check if token is valid.',
      args: [
        {
          key: 'token',
          prompt: 'Enter the token(s) you would like to validate, separating each with a space.',
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
    const adminChannelID = this.client.provider.get(msg.guild.id, 'adminChannel')
    if (msg.channel.id !== adminChannelID) {
      return msg.reply(`you must be in ${msg.guild.channels.get(adminChannelID)} to use this command!`)
    }
    var tokenArray = args.token.split('\n')
    const userList = await this.client.userProvider.getAllUsers()
    var tokenResults = []
    const statusMsg = await msg.channel.send('Working...')
    for (var i in tokenArray) {
      for (var g in userList) {
        if (tokenArray[i] === userList[g].token) {
          tokenResults.push(`\`${tokenArray[i]}\`: \`valid\``)
          break
        } else if (parseInt(g) === userList.length - 1) {
          tokenResults.push(`\`${tokenArray[i]}\`: \`invalid\``)
        }
      }
    }
    statusMsg.edit({embed: {
      title: 'Results:',
      color: 3426654,
      description: tokenResults.join('\n')
    }
    })
  }
}
