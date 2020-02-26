#!/usr/bin/env node

const Commando = require('discord.js-commando')
const SQLizer = require('./struct/SQLizer.js')
const { stripIndents } = require('common-tags')
const path = require('path')
const os = require('os')
const sqlite = require('sqlite')
const config = require(path.join(os.homedir(), '/.config/infinity-bot/conf.json'))
const packageInfo = require('./package.json')
const client = new Commando.Client({
  owner: config.ownerID,
  unknownCommandResponse: false,
  commandPrefix: '--'
})

client.on('ready', () => {
  console.log(`[INFO] Infinity Bot v${packageInfo.version} started`)
  client.user.setGame('with Schrodinger\'s cat')
})
  .on('unknownCommand', msg => {
    console.log(`[WARN] ${msg.author.tag} has passed unknown command: ${msg.guild ? msg.content.slice(client.provider.get(msg.guild.id, 'prefix').length).split(' ') : msg.content}`)
    msg.channel.send({embed: { color: 15158332,
      description: stripIndents`**__Unknown command:__ \`${msg.guild ? msg.content.slice(client.provider.get(msg.guild.id, 'prefix').length).split(' ') : msg.content}\`**

      Message \`${msg.guild ? client.provider.get(msg.guild.id, 'prefix') : ''}help\` or \`@${client.user.tag} help\` to get a list of all available commands.`}})
  })
  // ;)
  .on('message', msg => {
    if (Math.floor(Math.random() * 1000) + 1 === 539 && msg.author.id !== client.user.id) {
      msg.reply('you sure about that?')
    }
  })
  .on('voiceStateUpdate', (oldMemb, newMemb) => {
    if (oldMemb.id === client.user.id && newMemb.voiceChannel) {
      const queue = client.registry.resolveCommand('voice:add').queue.get(oldMemb.guild.id)
      queue.voiceChannel = newMemb.voiceChannel
    }
  })
  .on('guildMemberUpdate', (oldMemb, newMemb) => {
    if (oldMemb.roles.size !== newMemb.roles.size) {
      let restctID = client.provider.get(newMemb.guild.id, 'restrictroleid')
      let membID = client.provider.get(newMemb.guild.id, 'memberroleid')
      let modID = client.provider.get(newMemb.guild.id, 'modroleid')
      let adminID = client.provider.get(newMemb.guild.id, 'adminroleid')
      if (newMemb.roles.size === 1) {
        client.userProvider.setLevel(newMemb.id, 0)
      } else if (newMemb.roles.size === oldMemb.roles.size + 1) {
        for (var [key, value] of newMemb.roles) {
          if (value.name === '@everyone') {
            continue
          }
          if (!oldMemb.roles.get(key)) {
            if (key === restctID) {
              client.userProvider.setLevel(newMemb.id, -1)
              break
            } else if (key === membID && !(newMemb.roles.has(modID) || newMemb.roles.has(adminID))) {
              client.userProvider.setLevel(newMemb.id, 1)
              break
            } else if (key === modID && !newMemb.roles.has(adminID)) {
              client.userProvider.setLevel(newMemb.id, 2)
              break
            } else if (key === adminID) {
              client.userProvider.setLevel(newMemb.id, 3)
              break
            }
          }
        }
      } else if (newMemb.roles.size === oldMemb.roles.size - 1) {
        if (newMemb.roles.get(adminID)) {
          client.userProvider.setLevel(newMemb.id, 3)
        } else if (newMemb.roles.get(modID)) {
          client.userProvider.setLevel(newMemb.id, 2)
        } else if (newMemb.roles.get(membID)) {
          client.userProvider.setLevel(newMemb.id, 1)
        }
      }
    }
  })

sqlite.open(path.join(os.homedir(), '/.config/infinity-bot/settings.sqlite3')).then((db) => {
  client.setProvider(new Commando.SQLiteProvider(db))
})
sqlite.open(path.join(os.homedir(), '/.config/infinity-bot/users.sqlite3')).then((db) => {
  client.userProvider = new SQLizer(db)
  client.userProvider.init()
})

client.registry
  .registerGroups([
    ['voice', 'Voice Commands'],
    ['misc', 'Miscellanious Commands'],
    ['util', 'Utility Commands'],
    ['moderation', 'Moderation Commands'],
    ['info', 'Lookup/Informational Commands']
  ])
  .registerDefaults()
  .registerTypesIn(path.join(__dirname, 'types'))
  .registerCommandsIn(path.join(__dirname, 'commands'))

process.on('unhandledRejection', err => {
  console.error('[ERROR] Uncaught Promise: \n' + err.stack)
})

client.login(config.token)
