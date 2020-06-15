const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (client, message, args) => {

  try {
    if (!args[0]) return message.channel.send({embed: {
                color: 16734039,
                description: "You must give something to search!"
            }})
    
    request({url: 'https://djsdocs.sorta.moe/main/stable/embed?q=' + encodeURIComponent(args.join(' ')), json: true}, (req, res, json) => {
      message.channel.send({embed: json});
    });
  } catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
  }
}

module.exports.help = {
    name: "djs",
    description: "Searches the Discord.js docs for your search term.",
    usage: "djs <search>",
    type: "Utility"  
}