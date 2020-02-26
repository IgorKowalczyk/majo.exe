const { Command } = require('discord.js-commando')

module.exports = class SetModRoleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'setmodrole',
      group: 'util',
      memberName: 'setmodrole',
      description: 'Sets a certain role as the Mod role',
      guildOnly: true,
      args: [
        {
          key: 'role',
          default: '',
          prompt: 'Enter the role you would like to set as the Mod role.',
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
      const currentRoleID = this.client.provider.get(msg.guild.id, 'modroleid')
      const currentRole = msg.guild.roles.get(currentRoleID)
      if (!currentRoleID) return msg.reply(`there is no Mod role currently set.`)
      return msg.reply(`the current Mod role is ${currentRole}`)
    }
    this.client.provider.set(msg.guild.id, 'modroleid', args.role.id)
    msg.reply(`${args.role} has been set as the Mod role.`)
    return console.log(`[INFO] ${args.role.name} has been set as Mod role by ${msg.author.tag}`)
  }
}
