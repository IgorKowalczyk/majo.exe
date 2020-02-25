const moj-avatar = async (message) => {
  const author = message.author.avatarURL
  await message.reply(author)
}
const avatarMentioned = async (message) => {
  const avatarOfMentioned = message.mentions.users.first().avatarURL
  await message.reply(avatarOfMentioned)
}

module.exports = { moj-avatar, avatarMentioned }
