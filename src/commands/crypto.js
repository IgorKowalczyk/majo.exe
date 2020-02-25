const axios = require('axios')

const btc = async (message) => {
  const btcQuery = await axios.get('https://bitbay.net/API/Public/BTCPLN/ticker.json').catch(err => message.reply(err))
  await message.reply(`BTC: ${btcQuery.data.bid} PLN`)
}

const eth = async (message) => {
  const ethQuery = await axios.get('https://bitbay.net/API/Public/ETHPLN/ticker.json').catch(err => message.reply(err))
  await message.reply(`ETH: ${ethQuery.data.bid} PLN`)
}

module.exports = { btc, eth }
