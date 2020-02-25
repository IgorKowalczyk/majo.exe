const pacanie = (message) => {
  message.channel.send({
    embed: {
      color: 2005121,
      description: 'I co mnie testujesz? Przetestować ciebie?',
    },
  })
}
const test = (message) => {
  setInterval(pacanie(message), 3000)
}

module.exports = test
