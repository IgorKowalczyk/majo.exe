const guild = async (message) => {
  message.channel.send(`Guild ID tego serwera: ${message.guild.id} (Dla Dev)`)
}
module.exports = guild
