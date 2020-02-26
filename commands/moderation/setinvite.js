const { Command } = require('discord.js-commando')

module.exports = class SetInviteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setinvite',
      aliases: ['setinv', 'invset'],
      group: 'moderation',
      memberName: 'setinvite',
      description: `Sets the server's invite code.`,
      examples: [`setinv asdf123`, `setinv https://discord.gg/asdf123`, `setinvite asdf123`, 'invset asdf123'],
      guildOnly: true,
      args: [
        {
          key: 'code',
          prompt: '',
          default: '',
          type: 'string'
        }
      ]
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel === 3 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    const inputCode = args.code
    const invCode = this.client.provider.get(msg.guild.id, 'invCode')
    if (!inputCode && invCode) {
      return msg.reply(`the current invite code is: \`${invCode}\``).then(m => {
        msg.delete(2500)
        m.delete(2500)
      })
    } else if (!inputCode && !invCode) {
      return msg.reply(`there is no invite code set!`).then(m => {
        msg.delete(2500)
        m.delete(2500)
      })
    }
    const linkCheck = /^(https?:\/\/)?(www.discord.gg|discord.gg)\/(.*)$/
    if (inputCode.match(linkCheck)) {
      var result = linkCheck.exec(inputCode)
      this.client.provider.set(msg.guild.id, 'invCode', result[3])
      return msg.reply(`invite code has been set to: \`${result[3]}\``).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    } else {
      this.client.provider.set(msg.guild.id, 'invCode', inputCode)
      return msg.reply(`invite code has been set to: \`${inputCode}\` `).then(m => {
        m.delete(5000)
        msg.delete(5000)
      })
    }
  }
}
