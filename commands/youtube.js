const Discord = require('discord.js');
const { YTSearcher } = require('ytsearcher');
const cnf = require('../config.json');

const searcher = new YTSearcher(cnf.api);

module.exports.run = async (client, message, args) => {
  try {
    if (!args[0]) return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a word to search!"
        }})
    
    let msg = await message.channel.send({embed: {
            color: 16734039,
            description: "Searching on Youtube"
        }})
    
    searcher.search(args.join(' ')).then(info => {
      if (!info.first) return message.channel.send({embed: {
            color: 16734039,
            description: "I couldn't find anything on Youtube with your query!"
        }})
	 console.log(searcher.options);
      let embed = new Discord.RichEmbed()
      .setTitle("Youtube Search results:")
      .setDescription("`1. `" + info.first.url + " - " + info.first.title + "`2.`" + info.first.description + "\n" + info.first.duration)
      .setColor('RANDOM');
      msg.edit(embed);
    });

  } catch (err) {
	return message.channel.send({embed: {
            color: 16734039,
            description: "Something went wrong... :cry:"
        }})
  }
}

module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search <word>",
    type: "Fun"  
}