const { Command } = require('discord.js-commando')

module.exports = class SetMemberCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setmember',
      group: 'util',
      memberName: 'setmember',
      description: 'Sets a certain role as the standard member\'s role',
      guildOnly: true,
      args: [
        {
          key: 'role',
          default: '',
          prompt: 'Enter the role you would like to set as the standard member\'s role.',
          type: 'role'
        }
      ]
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel === 3 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    if (!args.role) {
      const currentRoleID = this.client.provider.get(msg.guild.id, 'memberroleid')
      const currentRole = msg.guild.roles.get(currentRoleID)
      if (!currentRoleID) return msg.reply(`there is no role currently set for members.`)
      return msg.reply(`the current role set for members is ${currentRole}`)
    }
    this.client.provider.set(msg.guild.id, 'memberroleid', args.role.id)
    msg.reply(`${args.role} has been set as the standard member's role.`)
    return console.log(`[INFO] ${args.role.name} has been set as member role by ${msg.author.tag}`)
  }
}
