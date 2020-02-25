const emoji = async (message, prefix) => {
  const commandPiszemoji = 'piszemoji'
  let tresc = message.content.slice(prefix.length + commandPiszemoji.length + 1)
  if (tresc.length > 0) {
    let final = ''
    tresc = tresc.toLowerCase()
    tresc = tresc.replace('ł', 'l')
    tresc = tresc.replace('ą', 'a')
    tresc = tresc.replace('ę', 'e')
    tresc = tresc.replace('ć', 'c')
    tresc = tresc.replace('ó', 'o')
    tresc = tresc.replace('ś', 's')
    tresc = tresc.replace('ń', 'n')
    tresc = tresc.replace('ż', 'z')
    tresc = tresc.replace('ź', 'z')

    const trescLength = tresc.length
    let n = 0
    for (n; n < trescLength; n += 1) {
      if (tresc[n].match(/([A-Z])/gi)) {
        final += `:regional_indicator_${tresc[n]}:`
      } else {
        switch (tresc[n]) {
          case '0':
            final += ':zero:'
            break
          case '1':
            final += ':one:'
            break
          case '2':
            final += ':two:'
            break
          case '3':
            final += ':three:'
            break
          case '4':
            final += ':four:'
            break
          case '5':
            final += ':five:'
            break
          case '6':
            final += ':six:'
            break
          case '7':
            final += ':seven:'
            break
          case '8':
            final += ':eight:'
            break
          case '9':
            final += ':nine:'
            break
          case '#':
            final += ':hash:'
            break
          case '*':
            final += ':asterisk:'
            break
          case '+':
            final += ':heavy_plus_sign:'
            break
          case '-':
            final += ':heavy_minus_sign:'
            break
          case '$':
            final += ':heavy_dollar_sign:'
            break
          case '?':
            final += ':grey_question:'
            break
          case '!':
            final += ':grey_exclamation:'
            break
          default:
            final += '  '
            break
        }
      }
    }
    await message.delete().then(console.log(`majonezie emoji: usunięto wiadomość od ${message.author}`)).catch(console.error)
    await message.channel.send(final).then(console.log(`majonezie emoji: wysłano wiadomość przez ${message.author}`)).catch(console.error)
  } else {
    await message.reply('Ale co mam napisać jak nie wiem co!? Użyj `majonezie emoji (tekst do emoji)`')
  }
}

module.exports = pisz-emoji
