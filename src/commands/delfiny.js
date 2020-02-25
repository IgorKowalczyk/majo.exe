const delfinowe = require('../quotes/delfinowe.json')

const quote = async (message) => {
  const random = delfinowe[Math.floor(Math.random() * delfinowe.length)].content
  await message.channel.send(random)
}
const emojiTester = async (message, id) => {
  const emoji = message.guild.emojis
  const ayy = emoji.find('name', 'ayy')
  await message.react(ayy.id)
  await message.channel.send(`${emoji.has(id) ? 'istnieje' : 'nie istnieje'} emoji o id \`${id}\``)
}

module.exports = { quote, emojiTester }
