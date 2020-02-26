const { Command } = require('discord.js-commando')
const urban = require('urban')

module.exports = class UrbanDictionaryCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'urbandictionary',
      group: 'misc',
      memberName: 'urbandictionary',
      aliases: ['ud',
        'urbandict'],
      description: 'Looks a word up on Urban Dictionary, or a random word if nothing is specified.'
    })
  }
  run (msg, args) {
    if (!args) {
      urban.random().first(output => {
        msg.channel.send({embed: {
          color: 15844367,
          title: output.word.charAt(0).toUpperCase() + output.word.slice(1),
          url: output.permalink,
          description: output.definition,
          fields: [
            {
              name: `Example:`,
              value: output.example
            }
          ]
        }})
      })
      return null
    }

    const search = urban(args)
    search.first(output => {
      if (!output) {
        return msg.reply(`sorry! I've got nothing from Urban Dictionary on that.`).then(m => {
          msg.delete(2500)
          m.delete(2500)
        })
      }
      msg.channel.send({embed: {
        color: 15844367,
        title: output.word.charAt(0).toUpperCase() + output.word.slice(1),
        url: output.permalink,
        description: output.definition,
        fields: [
          {
            name: `Example:`,
            value: output.example
          }
        ]
      }})
    })
  }
}
