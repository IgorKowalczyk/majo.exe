const whatsmyname = async (message) => {
  const author = message.author.username
  await message.channel.send('Twoj nick to JOHN CEEEENA')
  await message.channel.send(`oopss... znaczy ${author}`)
}

module.exports = whatsmyname
