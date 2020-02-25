
const embed1 = {
  color: 3447003,
  description: 'WELCOME',
}
const embed2 = {
  color: 2061143,
  description: 'TO',
}
const embed3 = {
  color: 2041103,
  description: 'MAJONEZOWO',
}
const pacanie = (message) => {
  message.channel.send({
    embed: {
      color: 2005121,
      description: 'pacanie i tak nie rozumiesz co tu pisze, bo to po angielsku ( ͡° ͜= ͡°)_/¯',
    },
  })
}
const test = (message) => {
  message.channel.send({ embed: embed1 })
  message.channel.send({ embed: embed2 })
  message.channel.send({ embed: embed3 })
  setInterval(pacanie(message), 3000)
}

module.exports = test
