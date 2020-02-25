const richEmbed = require('../richEmbed')

const obczajObraza = {
  title: 'ODWAL SIE DZIEWCZYNKO',
  color: '0x00AE86',
  description: 'bo zadzwonie na policje',
  image: 'http://pl.memgenerator.pl/mem-image/odwal-sie-dziewczynko-pl-ffffff',
}

const say = async (message, command) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    const commandTEMP = command.replace('say', '')
    await message.delete().then(msg => console.log(`Usunalem durna wiadomosc ${msg.author} i wyslalem to samo ( ͡° ͜ʖ ͡°) `)).catch(console.error)
    if (commandTEMP.length === 1) {
      await message.reply('event zbindowany, ale nie wysyla')
    } else {
      await message.channel.send(commandTEMP)
    }
  } else {
    await message.reply('a gdzie ty się wpartalasz, panieee')
    await message.channel.send(richEmbed.richEmbed(obczajObraza))
  }
}

module.exports = say
