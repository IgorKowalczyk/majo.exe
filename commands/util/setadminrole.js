const { Command } = require('discord.js-commando')

module.exports = class SetAdminRoleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setadminrole',
      group: 'util',
      memberName: 'setadminrole',
      description: 'Sets a certain role as the Admin role',
      guildOnly: true,
      args: [
        {
          key: 'role',
          default: '',
          prompt: 'Enter the role you would like to set as the Admin role.',
          type: 'role'
        }
      ]
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 3 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    if (!args.role) {
      const currentRoleID = this.client.provider.get(msg.guild.id, 'adminroleid')
      const currentRole = msg.guild.roles.get(currentRoleID)
      if (!currentRoleID) return msg.reply(`there is no Admin role currently set.`)
      return msg.reply(`the current Admin role is ${currentRole}`)
    }
    this.client.provider.set(msg.guild.id, 'adminroleid', args.role.id)
    msg.reply(`${args.role} has been set as the Admin role.`)
    return console.log(`[INFO] ${args.role.name} has been set as Admin role by ${msg.author.tag}`)
  }
}
