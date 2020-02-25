const ytdl = require('ytdl-core')
const ypi = require('youtube-playlist-info')
// Put your Youtube API key here!
const config = require('../config.json')

const servers = {}
let server
const play = (connection, message) => {
  server = servers[message.guild.id]
  console.log('what')
  console.log(server.queue[0])

  try {
    console.log(`Started playing some music from ${server.queue[0]}`)
    server.dispatcher = connection.playStream(ytdl(server.queue[0]))
  } catch (e) {
    console.log('Idiota wysłał jakiegoś unicorna pewnie zamiast linku.')
    return message.channel.send('Congratulacje! Twój linkacz wygrał konkurs na najmniej linkaczowy styl! :first_place: dla ciebie')
  }
  server.dispatcher.on('end', () => {
    server.queue.shift()
    if (server.queue[0]) play(connection, message)
    connection.disconnect()
    message.channel.send('Się muza skończyła :(')
  })
}
const preparePlaylist = async (url) => {
  let playlistids = url.slice(url.indexOf('list=PL'))
  playlistids = playlistids.replace('list=PL', '')
  console.log(`Playlist ID: ${playlistids}`)
  ypi(config.youtubeapikey, playlistids).then((items) => {
    for (let i = 0; i < items.length; i += 1) {
      server.queue.push(items[i].resourceId.videoId)
      console.log(`Queued some music from ${items[i].resourceId.videoId}`)
    }
  }).catch(console.error)
}
let prawda
const isPlaylist = async (url) => {
  if (url.includes('&list=') || url.includes('?list=')) {
    prawda = true
    return prawda
  }
  prawda = false
  return prawda
}
const grajte = async (message, prefix) => {
  if (!message.guild) {
    return message.reply('łeeee... na nerwach chyba... idioto, na DM\'ie mam ci grac?!')
  } // some polish words here for DM

  const channel = message.member.voiceChannel
  const args = message.content.substring(prefix.length + 1).split(' ')

  if (!channel) {
    return message.channel.send('Pierwiej się na kanał wpartol, a nie')
  } // user must be in channel and some Polish messages
  if (!args[1]) {
    return message.channel.send('Zarzuć linkacz jednorożcu :unicorn:')
  } // and no-link handling here
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] }
  }
  server = servers[message.guild.id]
  isPlaylist(args[1])
  if (prawda === true) preparePlaylist(args[1])
  else {
    server.queue.push(args[1])
    console.log(`Queued some music from ${args[1]}`)
    const randomowa = Math.random() * 2
    if (randomowa === 1) {
      message.channel.send('Dodałem do kolejki ten song! :wink:')
    } else {
      message.channel.send('To też dodałem do naszej kolejki')
    }
  }
  if (!message.guild.voiceConnection) {
    message.member.voiceChannel.join().then((connection) => {
      play(connection, message)
    })
  }
}

const skipuj = async (message) => {
  server = servers[message.guild.id]
  if (!server) return message.channel.send('Nic nie gra a ty skipujesz. :facepalm:')

  if (!server.dispatcher) {
    message.channel.send('Nic nie gra a ty skipujesz. :facepalm:#2')
    return console.log()
  }
  server.dispatcher.end()
  return message.channel.send()
}
module.exports = {
  grajte,
  skipuj,
}
