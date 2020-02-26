const { Command } = require('discord.js-commando')

module.exports = class SetRestrictCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setrestrict',
      group: 'util',
      memberName: 'setrestrict',
      description: 'Sets a certain role as the restricted role',
      guildOnly: true,
      args: [
        {
          key: 'role',
          default: '',
          prompt: 'Enter the role you would like to set as the restricted role.',
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
      const currentRoleID = this.client.provider.get(msg.guild.id, 'restrictroleid')
      const currentRole = msg.guild.roles.get(currentRoleID)
      if (!currentRoleID) return msg.reply(`there is no restricted role currently set.`)
      return msg.reply(`the current restricted role is ${currentRole}`)
    }
    this.client.provider.set(msg.guild.id, 'restrictroleid', args.role.id)
    msg.reply(`${args.role} has been set as the restricted role.`)
    return console.log(`[INFO] ${args.role.name} has been set as restricted role by ${msg.author.tag}`)
  }
}
