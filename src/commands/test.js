const pacanie = (message) => {
  message.channel.send({
    embed: {
      color: 2005121,
      description: 'Ty! Nie testuj mnie!',
    },
  })
}
const test = (message) => {
  setInterval(pacanie(message), 3000)
}

module.exports = test
