const pozew = async (message) => {
  await message.reply('A pozwać cię?!')
}
const getpozew = async (message) => {
  await message.reply(' Pozew podpisany - Prokurator `W SZAFIE`')
}
module.exports = { pozew, getpozew }
