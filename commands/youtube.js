const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {

let youtube = args.slice(0).join('+');

  let link = `https://www.youtube.com/results?search_query=` + youtube;
  if (!youtube) return message.channel.send({embed: {
            color: 16734039,
            title: "Please enter a word to search!"
        }})
  if (!link) return message.channel.send({embed: {
            color: 16734039,
            title: "Error!"
        }})
  let embed = new Discord.RichEmbed()
    .setTitle("Searching in youtube")
    .setColor("RANDOM")
    .setTimestamp()
    .addField("Searched word:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `${link}`)
  message.channel.send(embed);
}

module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search <word>",
    type: "Fun"  
}
