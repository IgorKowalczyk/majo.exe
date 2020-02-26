const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

module.exports = class WhoIsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'whois',
      group: 'info',
      memberName: 'whois',
      description: 'Looks up info on a specified user.',
      guildOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Which user would you like to lookup?',
          type: 'member'
        }
      ]
    })
  }

  async run (msg, args) {
    const member = args.user
    const adminChannelID = this.client.provider.get(msg.guild.id, 'adminChannel')
    const response = await msg.channel.send('Working... one moment.')
    return response.edit({embed: {
      color: 3447003,
      description: `${member.user.username === member.displayName ? member.user.tag : member.user.tag + ` (${member.displayName})`}`,
      fields: [
        {
          name: '» User Details:',
          value: stripIndents`
          ‣ ID: \`${member.id}\`
          ‣ Joined Discord: \`${member.user.createdAt}\`
          ‣ Bot User: \`${member.user.bot}\`
          ‣ Status: \`${member.user.presence.status.charAt(0).toUpperCase() + member.user.presence.status.slice(1)}\`
          ‣ Currently Playing: ${member.user.presence.game ? member.user.presence.game.name : '`Nothing`'}`
        },
        {
          name: '» Server Member Details:',
          value: stripIndents`
          ‣ Role(s): ${member.roles.map(roles => `\`${roles.name}\``).join(', ')}
          ‣ Joined on:  \`${member.joinedAt}\`${member.nickname ? `\n‣ Nickname: \`${member.nickname}\`` : ''}
          ‣ Command Level: \`${await this.client.userProvider.getLevel(member.id)}\`
          ${msg.channel.id === adminChannelID ? `‣ Token: \`${await this.client.userProvider.getToken(member.id)}\`` : ''}
          `
        }
      ]
    }})
  }
}
