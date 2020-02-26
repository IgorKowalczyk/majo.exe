const { Command } = require('discord.js-commando')
const request = require('request')

module.exports = class XKCDRequestCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'xkcd',
      group: 'misc',
      memberName: 'xkcd',
      description: 'Looks up a comic on xkcd.com.',
      details: 'If no comic is specified, then a random one will be chosen. If `latest` is specified, the latest comic will be chosen.',
      examples: [
        `xkcd latest`,
        `xkcd 4`,
        `xkcd`
      ]
    })
  }
  run (msg, args) {
    const HOST = `http://xkcd.com/`
    if (!args) {
      request.get({
        url: HOST + 'info.0.json',
        json: true
      }, function (error, response, body) {
        if (error) return console.error('[ERROR] ' + error)
        const latest = body.num
        const randomComic = Math.floor(Math.random() * latest + 1)
        request.get({
          url: HOST + randomComic + '/info.0.json',
          json: true
        }, function (error, response, body) {
          if (error) return console.error('[ERROR] ' + error)
          msg.channel.send({embed: {
            title: `${body.num} - ${body.title}`,
            color: 3447003,
            url: HOST + randomComic,
            image: {url: body.img},
            fields: [
              {
                name: `Alt Text:`,
                value: body.alt
              }
            ]
          }})
        })
      })
      return null
    }
    const comic = args
    if (comic === 'latest') {
      request.get({
        url: HOST + 'info.0.json',
        json: true
      }, function (error, response, body) {
        if (error) return console.error('[ERROR] ' + error)
        msg.channel.send({embed: {
          title: `${body.num} - ${body.title}`,
          color: 3447003,
          url: HOST + body.num,
          image: {url: body.img},
          fields: [
            {
              name: `Alt Text:`,
              value: body.alt
            }
          ]
        }})
      })
      return null
    }
    request.get({
      url: HOST + comic + '/info.0.json',
      json: true
    }, function (error, response, body) {
      if (comic === '404') {
        return msg.reply('try again later.')
      }
      if (error) return console.error('[ERROR] ' + error)
      msg.channel.send({embed: {
        title: `${body.num} - ${body.title}`,
        color: 3447003,
        url: HOST + body.num,
        image: {url: body.img},
        fields: [
          {
            name: `Alt Text:`,
            value: body.alt
          }
        ]
      }})
    })
  }
}
