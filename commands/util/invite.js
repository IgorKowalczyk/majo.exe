const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

module.exports = class InviteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
      group: 'util',
      memberName: 'invite',
      description: 'PMs you the set invite link.',
      examples: ['invite', 'inv'],
      throttling: {
        usages: 1,
        duration: 30
      },
      guildOnly: true
    })
  }
  async run (msg) {
    const invCode = this.client.provider.get(msg.guild.id, 'invCode')
    if (!invCode) {
      return msg.reply('whoops! An invite link has not been set. Contact an Admin for assistance.').then(m => {
        m.delete(2500)
        msg.delete(2500)
      })
    }
    msg.reply(`sending you a PM with the link!`).then(m => {
      m.delete(2500)
      msg.delete(2500)
    })
    const dmChannel = await msg.member.createDM()
    dmChannel.send(stripIndents`The invite code for **__${msg.guild.name}__** is: \`${invCode}\`
      Tell your friend to click the plus button on the left, click Join a Server, and then enter the invite code.

      If you would like a browser friendly version of the code, it is: https://discord.gg/${invCode}`)
    .catch(err => {
      console.log(`[ERROR] ${err}`)
      msg.reply(`I was unable to send you the invite code. Reenable DMs in Settings -> Privacy & Safety then try again`)
      .then(m => {
        m.delete(10000)
        msg.delete(2500)
      })
    }
    )
  }
}
