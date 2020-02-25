const guild = async (message) => {
  message.channel.send(`Guild ID tego serwera: ${message.guild.id}`)
}
module.exports = guild
