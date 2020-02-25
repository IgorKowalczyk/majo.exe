const ja = async (message) => {
  const author = message.author.username
  await message.channel.send('Twoj nick to K***A')
  await message.channel.send(`oopss... znaczy ${author}, pijany jestem`)
}

module.exports = ja
