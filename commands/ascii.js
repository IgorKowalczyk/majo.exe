var figlet = require('figlet');
const Discord = require('discord.js')
const config = require("../config");
const prefix = config.prefix;
const hastebin = require("hastebin-gen");

module.exports = {
 name: "ascii",
 aliases: ["asciiart", "ascii-art"],
 category: "Fun",
 description: "Convert text to asci format",
 usage: "ascii <text>",
 run: async (client, message, args) => {
  try {
   var max = 1000;
   if(args.join(' ').length > max) return message.channel.send({embed: {
    color: 16734039,
    description: "The max length for ascii is " + `${max}` + " !"
   }})
   if(!args[0]) return message.channel.send({embed: {
    color: 16734039,
    description: "Please enter a text to convert!"
   }})
   figlet(`${args.join(' ')}`, function(err, data) {
    const final = data;
    if (err) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "Something went wrong... :cry:"
     }})
    }
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(":tada: Your ascii code is generated! You can see it below\nNote: Ascii code may look weird due to Discord chat restrictions, copy the code into some text file and see the effect!")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
    message.channel.send(embed);
    console.log(final.toString().lenght);
    console.log((final.toString()).lenght);
    if(final.length >= 2000) {
     hastebin(final, { extension: "txt" }).then(function(haste){
      return message.channel.send(haste)
     })
    } else {
     message.channel.send(`${final}`, {code: 'AsciiArt'});
    }
   });
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
