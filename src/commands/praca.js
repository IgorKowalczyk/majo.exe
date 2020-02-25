const embedFramework = require('../richEmbed.js')

const pracaEmbed = {
  title: 'Praca?',
  color: '0x00AE86',
  description: 'Nie mam teraz czasu',
  image: 'https://i.imgur.com/v0z1SXH.png',
}
const praca = async (message) => {
  await message.channel.send(embedFramework.richEmbed(pracaEmbed))
}
module.exports = { praca }
