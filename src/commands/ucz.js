const natural = require('natural')

const ucz = async (message, command) => {
  await natural.BayesClassifier.load('majonezie.json', null, (err, classifier) => {
    if (err) throw err
    classifier.addDocument(command[1], `majonezie ${command[0]}`)
    classifier.train()
    classifier.save('smrootAI.json', (err1) => {
      console.log(err1)
    })
    message.reply(`teraz już wiem, że \`${command[1]}\` znaczy \`${command[0]}\`!`)
  })
}

module.exports = ucz
