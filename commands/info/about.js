const { Command } = require('discord.js-commando')
const packageInfo = require('../../package.json')
const { stripIndents } = require('common-tags')

module.exports = class AboutCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'about',
      group: 'info',
      memberName: 'about',
      description: 'Displays information about the bot'
    })
  }
  run (msg) {
    msg.channel.send({embed: {
      title: `Majo.exe v${packageInfo.version}`,
      description: stripIndents`
      **Created by:** Igor Kowalczyk
      `,
      color: 3447003
    }})
  }
}
