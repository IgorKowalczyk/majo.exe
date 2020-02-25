const help = (message) => {
  message.reply(`
    Dostępne komendy:
    - majonezie help
    - majonezie avatar
    - majonezie avatar @nick
    - majonezie anime
    - majonezie traffic
    - majonezie quote
    - majonezie pomocy
    - majonezie haxi00r
    - majonezie who
    - majonezie btc
    - majonezie eth
    - majonezie pozew
    - majonezie get.pozew
    - majonezie graj - still WIP
    - majonezie skipuj - still WIP
    - majonezie kolejka - still WIP
    - majonezie piszemoji
    - majonezie sniadanie
    - majonezie sprawdz  - najnowsze osiągnięcie AI, sprawdza czy tekst jest w stylu majoneza
    - majonezie ucz <znaczennie> : <sentencja>
    - majonezie whatsmyname
    - majonezie say
    - majonezie pracuj
    `)
  if (message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send('ty mozesz wiecej, Kmicic')
    const randomowa = Math.floor(Math.random() * 2)
    if (randomowa === 1) {
      message.channel.send('np. anonimowo przezwać założycieli `majonezie say takidelfin to debil`')
    } else {
      message.channel.send('np. anonimowo przezwać założycieli `majonezie say xdk78 to debil`')
    }
  } else {
    message.channel.send('ale ty jesteś biedny i masz usługiwać kapitanowi Majonezowi!')
  }
}

module.exports = help
