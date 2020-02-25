const embedFramework = require('../richEmbed.js')

const sniadanieEmbed = {
  title: 'Śniadanie Roota',
  color: '0x00AE86',
  description: 'Wtranżala Clorox z tabletkami',
  image: 'https://user-images.githubusercontent.com/32518770/35701293-728d5676-078d-11e8-9a86-3523e278dd75.jpg',
}
const sniadanie = async (message) => {
  await message.channel.send(embedFramework.richEmbed(sniadanieEmbed))
}
module.exports = { sniadanie }
