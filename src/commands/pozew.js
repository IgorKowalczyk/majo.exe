const pozew = async (message) => {
  await message.reply('A cię pozwę za pisanie!')
}
const getpozew = async (message) => {
  await message.reply(' Na pewno! Podpisane - Prokurator W szafie')
}
module.exports = { pozew, getpozew }
