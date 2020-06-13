var figlet = require('figlet');
const Discord = require('discord.js')

module.exports.run = (client, message, args) => {

  var maxLen = 50

  if(args.join(' ').length > maxLen) return message.channel.send({embed: {
                color: 16734039,
                description: "The max length is " + `${maxLen}` + " !"
            }})

  if(!args[0])return message.channel.send({embed: {
                color: 16734039,
                description: "Please enter a text to convert!"
            }})

  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
return message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
      }
      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}

module.exports.help = {
    name: "ascii",
    description: "Convert text to asci format",
    usage: "ascii <text>",
    type: "Fun" 
}