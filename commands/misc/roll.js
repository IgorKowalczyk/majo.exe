const { Command } = require('discord.js-commando')

module.exports = class RollCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'roll',
      group: 'misc',
      memberName: 'roll',
      description: 'Roll an imaginary die (d6 is the default)',
      examples: [
        'roll',
        'roll 10',
        'roll 20'
      ]
    })
  }
  async run (msg, args) {
    if (args.toLowerCase().startsWith('d')) {
      const dice = args.slice(1)
      const roll = Math.floor(Math.random() * dice + 1)
      if (isNaN(roll)) return msg.reply(`invalid input...`)
      return msg.channel.send(`${msg.member.user} rolled a ${roll}`)
    }
    if (!args) {
      const roll = Math.floor(Math.random() * 6 + 1)
      return msg.channel.send(`${msg.member.user} rolled a ${roll}`)
    }
    const roll = Math.floor(Math.random() * args + 1)
    if (isNaN(roll)) return msg.reply(`invalid input...`)
    return msg.channel.send(`${msg.member.user} rolled a ${roll}`)
  }
}
