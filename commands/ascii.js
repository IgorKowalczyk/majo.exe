var figlet = require('figlet');
const Discord = require('discord.js')

module.exports.run = (client, message, args, tools) => {

  var maxLen = 50

  if(args.join(' ').length > maxLen) return message.channel.send({embed: {
                color: 16734039,
                title: "The max length is" + `${maxLen}` + "!"
            }})

  if(!args[0])return message.channel.send({embed: {
                color: 16734039,
                title: "Please enter a text to convert!"
            }})

  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
return message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
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