const xd = require('../quotes/root.json')

const quote = async (message) => {
  const randomQt = xd[Math.floor(Math.random() * xd.length)].content
  await message.reply(randomQt)
}

module.exports = powiedz
